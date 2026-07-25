import { useState, useEffect } from 'react';
import { getArtworks } from './artworks';
import type { Artwork } from '../types/artwork';
import './ArtworksPage.css';

const ArtworksPage = () => {

  // All artworks fetched from the API
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  // What the user has typed in the search box
  const [searchQuery, setSearchQuery] = useState('');

  // The artwork type selected in the filter dropdown
  const [selectedType, setSelectedType] = useState('all');

  // Loading and error states for the fetch
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);



// The artwork currently shown in the detail panel (null = panel closed)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesType =
      selectedType === 'all' || artwork.artwork_type === selectedType;
    const matchesSearch =
      searchQuery === '' ||
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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

  // Called every time the user types in the search box
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Called every time the user picks a type from the dropdown
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  // Opens the detail panel with the clicked artwork
  const handleCardClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

    // Closes the detail panel
  const handleClosePanel = () => {
    setSelectedArtwork(null);
  };

  // Format the price with currency symbol
  const formatPrice = (price: number, currency: string) => {
    if (!price) return 'Price not available';
    return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

  // Format the dimensions into a readable string
  const formatDimensions = (artwork: Artwork) => {
    if (!artwork.height || !artwork.width) return 'Dimensions not available';
    if (artwork.depth) {
      return `${artwork.height} x ${artwork.width} x ${artwork.depth} ${artwork.unit}`;
    }
    return `${artwork.height} x ${artwork.width} ${artwork.unit}`;
  };

  if (isLoading) {
   return (
    <div className="artworks-page">
      <div className="artworks-header">
        <h1>Artworks</h1>
      </div>
      <div className="artworks-grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="artwork-card skeleton-card">
            <div className="artwork-card-body">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-artist"></div>
              <div className="skeleton skeleton-details"></div>
              <div className="skeleton skeleton-medium"></div>
            </div>
            <div className="artwork-card-footer">
              <div className="skeleton skeleton-price"></div>
            </div>
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
    <div className="artworks-page">

      {/* Page header */}
      <div className="artworks-header">
        <h1>ARTWORKS</h1>
        <p className="artworks-count">{filteredArtworks.length} works</p>
      </div>

      {/* Search and filter controls */}
      <div className="artworks-controls">
        <div className="input-group">
          <input
            type="text"
            id="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="input-group">
          <select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="all">All types</option>
            <option value="painting">Painting</option>
            <option value="sculpture">Sculpture</option>
            <option value="photograph">Photograph</option>
            <option value="print">Print</option>
            <option value="installation">Installation</option>
          </select>
        </div>
      </div>

      {/* Main content area - grid + detail panel side by side */}
      <div className="artworks-content">

        {/* Artworks grid */}
        <div className={`artworks-grid ${selectedArtwork ? 'grid-with-panel' : ''}`}>

          {filteredArtworks.length === 0 && (
            <p className="status-message">No artworks match your search.</p>
          )}

          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.artwork_id}
              className={`artwork-card ${selectedArtwork?.artwork_id === artwork.artwork_id ? 'artwork-card-active' : ''}`}
              onClick={() => handleCardClick(artwork)}
            >
              {/* Artwork image */}
              <div className="artwork-image-wrapper">
                {artwork.image_url ? (
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="artwork-image"
                  />
                ) : (
                  <div className="artwork-image-placeholder">
                    <span>No image</span>
                  </div>
                )}
              </div>

              {/* Card details below image */}
              <div className="artwork-card-body">
                <p className="artwork-artist">{artwork.artist_name}</p>
                <p className="artwork-title"><em>{artwork.title}</em>, {artwork.year_created}</p>
                <p className="artwork-dimensions">{formatDimensions(artwork)}</p>
                <p className="artwork-medium">{artwork.medium}</p>
              </div>

              {/* Status dot and price at the bottom */}
              <div className="artwork-card-footer">
                <span className={`status-dot status-${artwork.status}`}></span>
              </div>

            </div>
          ))}
        </div>

        {/* Detail panel - slides in when an artwork is selected */}
        {selectedArtwork && (
          <div className="detail-panel">

            <button className="detail-panel-close" onClick={handleClosePanel}>✕</button>

            {/* Artwork image */}
            <div className="detail-image-wrapper">
              {selectedArtwork.image_url ? (
                <img
                  src={selectedArtwork.image_url}
                  alt={selectedArtwork.title}
                  className="detail-image"
                />
              ) : (
                <div className="detail-image-placeholder">
                  <span>No image available</span>
                </div>
              )}
            </div>

            {/* Artwork info */}
            <div className="detail-info">
              <p className="detail-artist">{selectedArtwork.artist_name}</p>
              <p className="detail-title"><em>{selectedArtwork.title}</em>, {selectedArtwork.year_created}</p>
              <p className="detail-medium">{selectedArtwork.medium}</p>
              <p className="detail-dimensions">{formatDimensions(selectedArtwork)}</p>
            </div>

            {/* Status section */}
            <div className="detail-section">
              <p className="detail-section-label">STATUS</p>
              <div className="detail-status-row">
                <span className={`status-dot status-${selectedArtwork.status}`}></span>
                <span className="detail-status-text">{selectedArtwork.status}</span>
              </div>
            </div>

            {/* Prices section */}
            <div className="detail-section">
              <p className="detail-section-label">PRICES</p>
              <div className="detail-price-row">
                <span className="detail-price-label">Price</span>
                <span className="detail-price-value">
                  {formatPrice(selectedArtwork.price, selectedArtwork.currency ?? 'GBP')}
                </span>
              </div>
              <div className="detail-price-row">
                <span className="detail-price-label">VAT status</span>
                <span className="detail-price-value">{selectedArtwork.vat_status}</span>
              </div>
            </div>

            {/* Edit button */}
            <button className="detail-edit-button">EDIT</button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ArtworksPage;