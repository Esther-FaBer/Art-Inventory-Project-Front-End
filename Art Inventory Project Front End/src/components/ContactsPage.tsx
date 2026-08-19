import { useState, useEffect } from 'react';
import { getContacts } from './contacts';
import type { Contact } from '../types/contacts';
import AddContactModal from './AddContactModal';
import './ContactsPage.css';


// Colour coded badge for each contact type
const TYPE_COLOURS: Record<string, string> = {
  collector:    '#1a73e8',
  dealer:       '#34a853',
  institution:  '#9334e6',
  auction_house: '#ea4335',
};

const ContactsPage = () => {

  const [contacts, setContacts]       = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading]     = useState(true);
  const [hasErrored, setHasErrored]   = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // The contact currently shown in the detail panel
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Filter contacts by search query and type
  const filteredContacts = contacts.filter((contact) => {
    const matchesType =
      selectedType === 'all' || contact.contact_type === selectedType;
    const matchesSearch =
      searchQuery === '' ||
      contact.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Fetch all contacts when the page first loads
  useEffect(() => {
    getContacts()
      .then((response) => {
        setContacts(response.data.contacts);
      })
      .catch(() => {
        setHasErrored(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setSelectedContact(null);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleClosePanel = () => {
    setSelectedContact(null);
  };

  // Called by AddContactModal when a contact is saved successfully
  const handleContactAdded = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
    setShowAddForm(false);
  };

  // Format contact type for display — replaces underscores with spaces
  const formatType = (type: string) => {
    return type.replace('_', ' ');
  };

  // Returns the first letter of each word for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="contacts-page">
        <div className="contacts-header">
          <h1>CONTACTS</h1>
        </div>
        <div className="contacts-list">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="contact-row skeleton-row">
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton skeleton-name"></div>
              <div className="skeleton skeleton-type"></div>
              <div className="skeleton skeleton-email"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasErrored) {
    return <p className="status-message error">Something went wrong. Please try again.</p>;
  }

  return (
    <div className="contacts-page">

      {/* Page header */}
      <div className="contacts-header">
        <h1>CONTACTS</h1>
        <p className="contacts-count">{filteredContacts.length} contacts</p>
      </div>

      {/* Search and filter controls */}
      <div className="contacts-controls">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="input-group">
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All types</option>
            <option value="collector">Collector</option>
            <option value="dealer">Dealer</option>
            <option value="institution">Institution</option>
            <option value="auction_house">Auction house</option>
          </select>
        </div>
      </div>

      {/* Main content - list + detail panel */}
      <div className="contacts-content">

        {/* Contacts list */}
        <div className={`contacts-list ${selectedContact ? 'list-with-panel' : ''}`}>

          {/* Column headers */}
          <div className="contact-list-header">
            <span className="col-avatar"></span>
            <span className="col-name">Name</span>
            <span className="col-type">Type</span>
            <span className="col-email">Email</span>
            <span className="col-phone">Phone</span>
          </div>

          {filteredContacts.length === 0 && (
            <p className="status-message">No contacts match your search.</p>
          )}

          {filteredContacts.map((contact) => (
            <div
              key={contact.contact_id}
              className={`contact-row ${selectedContact?.contact_id === contact.contact_id ? 'contact-row-active' : ''}`}
              onClick={() => handleContactClick(contact)}
            >
              {/* Avatar with initials */}
              <div
                className="contact-avatar"
                style={{ backgroundColor: TYPE_COLOURS[contact.contact_type] || '#5f6368' }}
              >
                {getInitials(contact.contact_name)}
              </div>

              <span className="col-name">{contact.contact_name}</span>

              {/* Type badge */}
              <span className="col-type">
                <span
                  className="contact-type-badge"
                  style={{ color: TYPE_COLOURS[contact.contact_type] || '#5f6368' }}
                >
                  {formatType(contact.contact_type)}
                </span>
              </span>

              <span className="col-email">{contact.email}</span>
              <span className="col-phone">{contact.phone_number}</span>
            </div>
          ))}

        </div>

        {/* Detail panel */}
        {selectedContact && (
          <div className="contact-detail-panel">

            <button className="detail-panel-close" onClick={handleClosePanel}>✕</button>

            {/* Avatar */}
            <div className="contact-detail-avatar-wrapper">
              <div
                className="contact-detail-avatar"
                style={{ backgroundColor: TYPE_COLOURS[selectedContact.contact_type] || '#5f6368' }}
              >
                {getInitials(selectedContact.contact_name)}
              </div>
            </div>

            {/* Contact info */}
            <div className="contact-detail-info">
              <h2 className="contact-detail-name">{selectedContact.contact_name}</h2>
              <span
                className="contact-detail-type"
                style={{ color: TYPE_COLOURS[selectedContact.contact_type] || '#5f6368' }}
              >
                {formatType(selectedContact.contact_type)}
              </span>
            </div>

            {/* Contact details */}
            <div className="contact-detail-section">
              <p className="contact-detail-section-label">CONTACT DETAILS</p>

              <div className="contact-detail-row">
                <span className="contact-detail-label">Email</span>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="contact-detail-value contact-detail-link"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div className="contact-detail-row">
                <span className="contact-detail-label">Phone</span>
                <span className="contact-detail-value">{selectedContact.phone_number}</span>
              </div>

            </div>

            {/* Notes section */}
            <div className="contact-detail-section">
              <p className="contact-detail-section-label">NOTES</p>
              <p className="contact-detail-notes">
                {selectedContact.notes || 'No notes added yet.'}
              </p>
            </div>

            {/* Edit button */}
            <button className="contact-edit-button">EDIT</button>

          </div>
        )}

        </div>

         {showAddForm && (
            <AddContactModal
              onClose={() => setShowAddForm(false)}
              onSave={handleContactAdded}
            />
        )}
      </div>
  );
};

export default ContactsPage;