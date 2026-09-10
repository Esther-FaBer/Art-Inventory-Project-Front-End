import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtworks } from './artworks';
import type { Artwork } from '../types/artwork';
import StatCard from './StatCard';
import './HomePage.css';

const HomePage = () => {

  // State

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [exhibitionCount, setExhibitionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  const navigate = useNavigate();


  // Derived values 

  const newStock = artworks
    .filter((artwork) => artwork.status === 'available')
    .slice(0, 10);

  const recentlySold = artworks
    .filter((artwork) => artwork.status === 'sold')
    .slice(0, 10);

  const totalWorks = artworks.length;

  const totalSold = artworks.filter((a) => a.status === 'sold').length;

  const totalValue = artworks
    .filter((a) => a.status === 'available')
    .reduce((sum, a) => sum + Number(a.price || 0), 0);

  const formatTotalValue = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}K`;
    }
    return `£${value}`;
  };

  // Effects

 useEffect(() => {
  getArtworks()
    .then((response) => {
      setArtworks(response.data.artworks);
      setExhibitionCount(0); 
    })
    .catch(() => {
      setHasErrored(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Helpers

  const formatPrice = (price: number, currency: string | null) => {
    if (!price) return '—';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDimensions = (artwork: Artwork) => {
    if (!artwork.height || !artwork.width) return null;
    return `${artwork.height} x ${artwork.width} ${artwork.unit}`;
  };

  // Early returns

  if (isLoading) {
    return (
      <div className="home-page">
        <div className="home-hero">
          <h1 className="home-title">ArtDB</h1>
          <p className="home-subtitle">Art inventory management</p>
        </div>
        <div className="home-stats">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="stat-card skeleton-stat">
              <div className="skeleton skeleton-stat-value"></div>
              <div className="skeleton skeleton-stat-label"></div>
            </div>
          ))}
        </div>
        <div className="home-section">
          <div className="skeleton skeleton-section-title"></div>
          <div className="home-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="home-artwork-card">
                <div className="skeleton home-card-image-skeleton"></div>
                <div className="skeleton home-card-title-skeleton"></div>
                <div className="skeleton home-card-artist-skeleton"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasErrored) {
    return <p className="status-message error">Something went wrong. Please try again.</p>;
  }

  // Render

  return (
    <div className="home-page">

      {/* Hero section */}
      <div className="home-hero">
        <h1 className="home-title">ArtDB</h1>
        <p className="home-subtitle">Art inventory management</p>
      </div>

      {/* Stats row */}
      <div className="home-stats">
        <StatCard
          icon="🎨"
          value={String(totalWorks)}
          label="Total works"
        />
        <StatCard
          icon="✓"
          value={String(totalSold)}
          label="Sold"
        />
        <StatCard
          icon="£"
          value={formatTotalValue(totalValue)}
          label="Available value"
        />
        <StatCard
          icon="🏛"
          value={String(exhibitionCount)}
          label="Exhibitions"
        />
      </div>

      {/* New stock section */}
      {newStock.length > 0 && (
        <div className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">NEW STOCK</h2>
            <button
              className="home-section-link"
              onClick={() => navigate('/artworks')}
            >
              View all →
            </button>
          </div>

          <div className="home-grid">
            {newStock.map((artwork) => (
              <div
                key={artwork.artwork_id}
                className="home-artwork-card"
                onClick={() => navigate(`/artworks/${artwork.artwork_id}`)}
              >
                {/* Image */}
                <div className="home-card-image">
                  {artwork.image_url ? (
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="home-card-image-placeholder">
                      <span>No image</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="home-card-body">
                  <p className="home-card-artist">{artwork.artist_name}</p>
                  <p className="home-card-title">
                    <em>{artwork.title}</em>, {artwork.year_created}
                  </p>
                  {formatDimensions(artwork) && (
                    <p className="home-card-dimensions">{formatDimensions(artwork)}</p>
                  )}
                  <p className="home-card-price">
                    {formatPrice(Number(artwork.price), artwork.currency)}
                  </p>
                </div>

                {/* Status dot */}
                <div className="home-card-footer">
                  <span className="status-dot status-available"></span>
                  <span className="home-card-status">Available</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently sold section */}
      {recentlySold.length > 0 && (
        <div className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">RECENTLY SOLD</h2>
            <button
              className="home-section-link"
              onClick={() => navigate('/artworks')}
            >
              View all →
            </button>
          </div>

          <div className="home-grid">
            {recentlySold.map((artwork) => (
              <div
                key={artwork.artwork_id}
                className="home-artwork-card"
                onClick={() => navigate(`/artworks/${artwork.artwork_id}`)}
              >
                {/* Image */}
                <div className="home-card-image">
                  {artwork.image_url ? (
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="home-card-image-placeholder">
                      <span>No image</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="home-card-body">
                  <p className="home-card-artist">{artwork.artist_name}</p>
                  <p className="home-card-title">
                    <em>{artwork.title}</em>, {artwork.year_created}
                  </p>
                  {formatDimensions(artwork) && (
                    <p className="home-card-dimensions">{formatDimensions(artwork)}</p>
                  )}
                  <p className="home-card-price">
                    {formatPrice(Number(artwork.price), artwork.currency)}
                  </p>
                </div>

                {/* Status dot */}
                <div className="home-card-footer">
                  <span className="status-dot status-sold"></span>
                  <span className="home-card-status">Sold</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;