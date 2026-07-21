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
    if (!artwork.dimensions) return 'Dimensions not available';
    const { height, width, depth, unit } = artwork.dimensions;
    return `${height} x ${width} x ${depth} ${unit}`;
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

      <div className="artworks-header">
        <h1>Artworks</h1>
        <p className="artworks-count">{filteredArtworks.length} works</p>
      </div>

      {/* Search and filter controls */}
      <div className="artworks-controls">

        <div className="input-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or artist..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="all">All types</option>
            <option value="painting">Painting</option>
            <option value="sculpture">Sculpture</option>
            <option value="drawing">Drawing</option>
            <option value="photography">Photography</option>
            <option value="print">Print</option>
          </select>
        </div>

      </div>

      {/* No results message */}
      {filteredArtworks.length === 0 && (
        <p className="status-message">No artworks match your search.</p>
      )}

      {/* Artworks grid */}
      <div className="artworks-grid">
        {filteredArtworks.map((artwork) => (
          <div key={artwork.artwork_id} className="artwork-card">

            <div className="artwork-card-body">
              <h2 className="artwork-title">{artwork.title}</h2>
              <p className="artwork-artist">{artwork.artist_name}</p>

              <div className="artwork-details">
                <span className="artwork-type">{artwork.artwork_type}</span>
                <span className="artwork-year">{artwork.year_created}</span>
              </div>

              <p className="artwork-medium">{artwork.medium}</p>
              <p className="artwork-dimensions">{formatDimensions(artwork)}</p>
            </div>

            <div className="artwork-card-footer">
              <span className="artwork-price">
                {formatPrice(artwork.price, artwork.currency ?? 'GBP')}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ArtworksPage;