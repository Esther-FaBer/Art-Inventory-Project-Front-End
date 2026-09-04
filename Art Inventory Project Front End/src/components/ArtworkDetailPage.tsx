import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtwork } from './artworks';
import type { Artwork } from '../types/artwork';
import './ArtworkDetailPage.css';

const ArtworkDetailPage = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State 

  const [artwork, setArtwork]     = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  // Effects 

  useEffect(() => {
    if (!id) return;

    getArtwork(Number(id))
      .then((response) => {
        setArtwork(response.data.artwork);
      })
      .catch(() => {
        setHasErrored(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Helpers 

  const formatPrice = (price: number, currency: string | null) => {
    if (!price) return 'Price not available';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
    }).format(price);
  };

  const formatDimensions = (artwork: Artwork) => {
    if (!artwork.height || !artwork.width) return 'Dimensions not available';
    if (artwork.depth) {
      return `${artwork.height} x ${artwork.width} x ${artwork.depth} ${artwork.unit}`;
    }
    return `${artwork.height} x ${artwork.width} ${artwork.unit}`;
  };


  const getStatusColour = (status: string) => {
    const colours: Record<string, string> = {
      available: '#34a853',
      sold:      '#ea4335',
      reserved:  '#fbbc04',
      'on-loan': '#9334e6',
    };
    return colours[status] || '#5f6368';
  };

  // Early returns

  if (isLoading) {
    return (
      <div className="artwork-detail-page">
        <div className="artwork-detail-back">
          <button onClick={() => navigate('/artworks')}>← Back to Artworks</button>
        </div>
        <div className="artwork-detail-layout">
          <div className="artwork-detail-image-col">
            <div className="skeleton artwork-detail-image-skeleton"></div>
          </div>
          <div className="artwork-detail-info-col">
            <div className="skeleton artwork-detail-title-skeleton"></div>
            <div className="skeleton artwork-detail-artist-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  if (hasErrored || !artwork) {
    return (
      <div className="artwork-detail-page">
        <div className="artwork-detail-back">
          <button onClick={() => navigate('/artworks')}>← Back to Artworks</button>
        </div>
        <p className="status-message error">Artwork not found.</p>
      </div>
    );
  }

  // Render

  return (
    <div className="artwork-detail-page">

      {/* Back button */}
      <div className="artwork-detail-back">
        <button onClick={() => navigate('/artworks')}>← Back to Artworks</button>
      </div>

      {/* Two column layout - image left, details right */}
      <div className="artwork-detail-layout">

        {/* Left column - image */}
        <div className="artwork-detail-image-col">
          {artwork.image_url ? (
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="artwork-detail-image"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="artwork-detail-image-placeholder">
              <span>No image available</span>
            </div>
          )}
        </div>

        {/* Right column - details */}
        <div className="artwork-detail-info-col">

          {/* Artist and title */}
          <p className="artwork-detail-artist">{artwork.artist_name}</p>
          <h1 className="artwork-detail-title">
            <em>{artwork.title}</em>, {artwork.year_created}
          </h1>
          <p className="artwork-detail-medium">{artwork.medium}</p>
          <p className="artwork-detail-dimensions">{formatDimensions(artwork)}</p>

          {/* Status */}
          <div className="artwork-detail-status-row">
            <span
              className="artwork-detail-status-dot"
              style={{ backgroundColor: getStatusColour(artwork.status) }}
            ></span>
            <span className="artwork-detail-status-text">{artwork.status}</span>
          </div>

          {/* Price section */}
          <div className="artwork-detail-section">
            <p className="artwork-detail-section-label">PRICE</p>
            <p className="artwork-detail-price">
              {formatPrice(Number(artwork.price), artwork.currency)}
            </p>
            <div className="artwork-detail-row">
              <span className="artwork-detail-label">VAT status</span>
              <span className="artwork-detail-value">{artwork.vat_status}</span>
            </div>
            {artwork.edition && (
              <div className="artwork-detail-row">
                <span className="artwork-detail-label">Edition</span>
                <span className="artwork-detail-value">{artwork.edition}</span>
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="artwork-detail-section">
            <p className="artwork-detail-section-label">DETAILS</p>
            <div className="artwork-detail-row">
              <span className="artwork-detail-label">Type</span>
              <span className="artwork-detail-value">{artwork.artwork_type}</span>
            </div>
            <div className="artwork-detail-row">
              <span className="artwork-detail-label">Medium</span>
              <span className="artwork-detail-value">{artwork.medium}</span>
            </div>
            <div className="artwork-detail-row">
              <span className="artwork-detail-label">Dimensions</span>
              <span className="artwork-detail-value">{formatDimensions(artwork)}</span>
            </div>
            <div className="artwork-detail-row">
              <span className="artwork-detail-label">Year</span>
              <span className="artwork-detail-value">{artwork.year_created}</span>
            </div>
          </div>

          {/* Description section - only shows if description exists */}
          {artwork.description && (
            <div className="artwork-detail-section">
              <p className="artwork-detail-section-label">DESCRIPTION</p>
              <p className="artwork-detail-description">{artwork.description}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;