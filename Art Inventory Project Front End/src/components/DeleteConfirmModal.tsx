import { useState } from 'react';
import './DeleteConfirmModal.css';

type Props = {
  // The name of the contact being deleted — shown in the message
  contactName: string;
  // Called when the user cancels
  onClose: () => void;
  // Called when the user confirms the delete
  onConfirm: () => void;
};

const DeleteConfirmModal = ({ contactName, onClose, onConfirm }: Props) => {

  // Tracks whether the delete is in progress
  const [isDeleting, setIsDeleting] = useState(false);

  // Called when the user clicks Delete
  const handleConfirm = () => {
    setIsDeleting(true);
    onConfirm();
  };

  // Close when clicking the overlay behind the modal
  const handleOverlayClick = () => {
    if (!isDeleting) onClose();
  };

  // Stop clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="delete-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal" onClick={handleModalClick}>

        {/* Warning icon */}
        <div className="delete-icon">⚠️</div>

        {/* Message */}
        <h2 className="delete-title">Delete Contact</h2>
        <p className="delete-message">
          Are you sure you want to delete <strong>{contactName}</strong>?
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="delete-actions">
          <button
            className="delete-cancel"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="delete-confirm"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;