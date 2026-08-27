import { useState, useEffect } from 'react';
import { getArtworks } from './artworks';
import type { Artwork } from '../types/artwork';
import './SalesPage.css';

// The four pipeline columns in order
const COLUMNS = [
  { key: 'available',  label: 'Available',     color: '#34a853' },
  { key: 'reserved',   label: 'In Negotiation', color: '#fbbc04' },
  { key: 'on-loan',    label: 'On Loan',        color: '#9334e6' },
  { key: 'sold',       label: 'Sold',           color: '#ea4335' },
];

const SalesPage = () => {

  const [artworks, setArtworks]         = useState<Artwork[]>([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [hasErrored, setHasErrored]     = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Fetch all artworks when the page first loads
  useEffect(() => {
    getArtworks()
      .then((response) => {
        setArtworks(response.data.artworks);
      })
      .catch(() => {
        setHasErrored(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Get artworks for a specific column
  const getArtworksByStatus = (status: string) => {
    return artworks.filter((artwork) => artwork.status === status);
  };

  // Get the total value of artworks in a column
  const getColumnValue = (status: string) => {
    return getArtworksByStatus(status).reduce((total, artwork) => {
      return total + (artwork.price || 0);
    }, 0);
  };

  // Format price with currency symbol
  const formatPrice = (price: number, currency: string | null) => {
    if (!price) return '—';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="sales-page">
        <div className="sales-header">
          <h1>SALES PIPELINE</h1>
        </div>
        <div className="kanban-board">
          {COLUMNS.map((col) => (
            <div key={col.key} className="kanban-column">
              <div className="kanban-column-header">
                <div className="skeleton skeleton-col-title"></div>
              </div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="kanban-card skeleton-card">
                  <div className="skeleton skeleton-card-image"></div>
                  <div className="skeleton skeleton-card-title"></div>
                  <div className="skeleton skeleton-card-artist"></div>
                </div>
              ))}
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
    <div className="sales-page">

      {/* Page header */}
      <div className="sales-header">
        <h1>SALES PIPELINE</h1>
        <p className="sales-count">{artworks.length} works</p>
      </div>

      {/* Kanban board */}
      <div className="kanban-board">
        {COLUMNS.map((col) => {
          const columnArtworks = getArtworksByStatus(col.key);
          const columnValue = getColumnValue(col.key);

          return (
            <div key={col.key} className="kanban-column">

              {/* Column header */}
              <div className="kanban-column-header">
                <div className="kanban-column-title-row">
                  <span
                    className="kanban-column-dot"
                    style={{ backgroundColor: col.color }}
                  ></span>
                  <span className="kanban-column-title">{col.label}</span>
                  <span className="kanban-column-count">{columnArtworks.length}</span>
                </div>
                <p className="kanban-column-value">
                  {formatPrice(columnValue, 'GBP')}
                </p>
              </div>

              {/* Cards */}
              <div className="kanban-cards">
                {columnArtworks.length === 0 && (
                  <p className="kanban-empty">No works in this stage</p>
                )}

                {columnArtworks.map((artwork) => (
                  <div
                    key={artwork.artwork_id}
                    className={`kanban-card ${selectedArtwork?.artwork_id === artwork.artwork_id ? 'kanban-card-active' : ''}`}
                    onClick={() => setSelectedArtwork(
                      selectedArtwork?.artwork_id === artwork.artwork_id ? null : artwork
                    )}
                  >
                    {/* Artwork image */}
                    <div className="kanban-card-image">
                      {artwork.image_url ? (
                        <img
                          src={artwork.image_url}
                          alt={artwork.title}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="kanban-card-image-placeholder">
                          <span>No image</span>
                        </div>
                      )}
                    </div>

                    {/* Card details */}
                    <div className="kanban-card-body">
                      <p className="kanban-card-artist">{artwork.artist_name}</p>
                      <p className="kanban-card-title">
                        <em>{artwork.title}</em>, {artwork.year_created}
                      </p>
                      <p className="kanban-card-price">
                        {formatPrice(artwork.price, artwork.currency)}
                      </p>
                    </div>

                    {/* Status dot */}
                    <div className="kanban-card-footer">
                      <span
                        className="kanban-status-dot"
                        style={{ backgroundColor: col.color }}
                      ></span>
                      <span className="kanban-card-medium">{artwork.medium}</span>
                    </div>

                  </div>
                ))}

              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel - slides in when a card is clicked */}
      {selectedArtwork && (
        <div className="sales-detail-panel">

          <button
            className="detail-panel-close"
            onClick={() => setSelectedArtwork(null)}
          >✕</button>

          {/* Image */}
          <div className="sales-detail-image">
            {selectedArtwork.image_url ? (
              <img
                src={selectedArtwork.image_url}
                alt={selectedArtwork.title}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="sales-detail-image-placeholder">No image</div>
            )}
          </div>

          {/* Info */}
          <div className="sales-detail-info">
            <p className="sales-detail-artist">{selectedArtwork.artist_name}</p>
            <p className="sales-detail-title">
              <em>{selectedArtwork.title}</em>, {selectedArtwork.year_created}
            </p>
            <p className="sales-detail-medium">{selectedArtwork.medium}</p>
          </div>

          {/* Price section */}
          <div className="sales-detail-section">
            <p className="sales-detail-section-label">PRICE</p>
            <p className="sales-detail-price">
              {formatPrice(selectedArtwork.price, selectedArtwork.currency)}
            </p>
            <p className="sales-detail-vat">VAT: {selectedArtwork.vat_status}</p>
          </div>

          {/* Status section */}
          <div className="sales-detail-section">
            <p className="sales-detail-section-label">STATUS</p>
            <div className="sales-detail-status-row">
              <span
                className="kanban-status-dot"
                style={{
                  backgroundColor: COLUMNS.find(
                    (c) => c.key === selectedArtwork.status
                  )?.color || '#5f6368'
                }}
              ></span>
              <span className="sales-detail-status-text">
                {COLUMNS.find((c) => c.key === selectedArtwork.status)?.label || selectedArtwork.status}
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default SalesPage;