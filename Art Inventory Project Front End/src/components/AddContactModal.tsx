import { useState } from 'react';
import { createContact } from './contacts';
import type { Contact } from '../types/contacts';
import './AddContactModal.css';

type Props = {
  // Called when the user cancels or closes the modal
  onClose: () => void;
  // Called with the new contact when save is successful
  onSave: (newContact: Contact) => void;
};

const AddContactModal = ({ onClose, onSave }: Props) => {

  // Form field values
  const [contactName, setContactName]   = useState('');
  const [email, setEmail]               = useState('');
  const [phoneNumber, setPhoneNumber]   = useState('');
  const [contactType, setContactType]   = useState('collector');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]               = useState('');

  // Called when the user clicks Save
  const handleSave = () => {
    setError('');

    // Basic validation - name and email are required
    if (!contactName.trim()) {
      setError('Name is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setIsSubmitting(true);

    createContact({
      contact_name: contactName,
      email,
      phone_number: phoneNumber,
      contact_type: contactType,
    })
      .then((response) => {
        // Tell the parent the save was successful
        onSave(response.data.contact);
      })
      .catch(() => {
        setError('Could not save contact. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Close the modal when clicking the dark overlay behind it
  const handleOverlayClick = () => {
    onClose();
  };

  // Stop clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Called by EditContactModal when a contact is updated successfully
const handleContactUpdated = (updatedContact: Contact) => {
  setContacts(contacts.map((c) =>
    c.contact_id === updatedContact.contact_id ? updatedContact : c
  ));
  setSelectedContact(updatedContact);
  setShowEditForm(false);
};

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={handleModalClick}>

        {/* Modal header */}
        <div className="modal-header">
          <h2 className="modal-title">New Contact</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Name field */}
        <div className="modal-field">
          <label className="modal-label">Name *</label>
          <input
            className="modal-input"
            type="text"
            placeholder="Full name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        {/* Email field */}
        <div className="modal-field">
          <label className="modal-label">Email *</label>
          <input
            className="modal-input"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone field */}
        <div className="modal-field">
          <label className="modal-label">Phone</label>
          <input
            className="modal-input"
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Type field */}
        <div className="modal-field">
          <label className="modal-label">Type</label>
          <select
            className="modal-input"
            value={contactType}
            onChange={(e) => setContactType(e.target.value)}
          >
            <option value="collector">Collector</option>
            <option value="dealer">Dealer</option>
            <option value="institution">Institution</option>
            <option value="auction_house">Auction house</option>
          </select>
        </div>

        {/* Error message */}
        {error && <p className="modal-error">{error}</p>}

        {/* Action buttons */}
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-submit"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Contact'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddContactModal;