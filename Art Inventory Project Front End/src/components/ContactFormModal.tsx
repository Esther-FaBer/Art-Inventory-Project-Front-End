import { useState } from 'react';
import { createContact, updateContact } from './contacts';
import type { Contact } from '../types/contacts';
import './ContactFormModal.css';

type Props = {
  // Whether we are adding a new contact or editing an existing one
  mode: 'add' | 'edit';
  // Only required when mode is "edit" — the contact to pre-fill the form with
  contact?: Contact;
  // Called when the user cancels or closes the modal
  onClose: () => void;
  // Called with the saved contact when the operation is successful
  onSave: (contact: Contact) => void;
};

const ContactFormModal = ({ mode, contact, onClose, onSave }: Props) => {

  // Pre-fill with existing values when editing, start empty when adding
  const [contactName, setContactName] = useState(contact?.contact_name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(contact?.phone_number || '');
  const [contactType, setContactType] = useState(contact?.contact_type || 'collector');
  const [notes, setNotes] = useState(contact?.notes || '');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Called when the user clicks Save or Update
  const handleSave = () => {
    setError('');

    // Validation — name and email are always required
    if (!contactName.trim()) {
      setError('Name is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setIsSubmitting(true);

    // Build the data object to send to the API
    const contactData = {
      contact_name: contactName,
      email,
      phone_number: phoneNumber,
      contact_type: contactType,
      notes,
    };

    // Choose the right API call based on the mode
    const apiCall = mode === 'add'
      ? createContact(contactData)
      : updateContact(contact!.contact_id, contactData);

    apiCall
      .then((response) => {
        onSave(response.data.contact);
      })
      .catch(() => {
        setError('Could not save contact. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Close when clicking the dark overlay behind the modal
  const handleOverlayClick = () => {
    onClose();
  };

  // Stop clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={handleModalClick}>

        {/* Modal header - title changes based on mode */}
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'add' ? 'New Contact' : 'Edit Contact'}
          </h2>
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

        {/* Notes field - shown in both modes */}
        <div className="modal-field">
          <label className="modal-label">Notes</label>
          <textarea
            className="modal-input modal-textarea"
            placeholder="Add notes about this contact..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
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
            {isSubmitting
              ? 'Saving...'
              : mode === 'add' ? 'Save Contact' : 'Update Contact'
            }
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactFormModal;