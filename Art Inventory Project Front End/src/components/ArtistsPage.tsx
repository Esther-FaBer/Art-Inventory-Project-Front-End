import { useState, useEffect } from 'react';
import { getArtists, getArtistArtworks } from './artists';
import type { Artist } from '../types/artist';
import type { Artwork } from '../types/artwork';
import './ArtistsPage.css';

const ArtistsPage = () => {

  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  // The artist currently shown in the detail panel
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Artworks for the selected artist
  const [artistArtworks, setArtistArtworks] = useState<Artwork[]>([]);
  const [loadingArtworks, setLoadingArtworks] = useState(false);

  // Filter artists by search query across name and nationality
  const filteredArtists = artists.filter((artist) => {
    if (searchQuery === '') return true;
    return (
      artist.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Fetch all artists when the page first loads
  useEffect(() => {
    getArtists()
      .then((response) => {
        setArtists(response.data.artists);
      })
      .catch(() => {
        setHasErrored(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Called when the user clicks an artist row
  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setArtistArtworks([]);
    setLoadingArtworks(true);

    // Fetch this artist's artworks
    getArtistArtworks(artist.artist_id)
      .then((response) => {
        setArtistArtworks(response.data.artworks);
      })
      .catch(() => {
        setArtistArtworks([]);
      })
      .finally(() => {
        setLoadingArtworks(false);
      });
  };

  // Called when the user closes the detail panel
  const handleClosePanel = () => {
    setSelectedArtist(null);
    setArtistArtworks([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Format birth and death years into a readable string
  const formatDates = (artist: Artist) => {
    if (artist.death_year) {
      return `${artist.birth_year} – ${artist.death_year}`;
    }
    return `b. ${artist.birth_year}`;
  };

  if (isLoading) {
    return (
      <div className="artists-page">
        <div className="artists-header">
          <h1>ARTISTS</h1>
        </div>
        <div className="artists-list">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="artist-row skeleton-row">
              <div className="skeleton skeleton-name"></div>
              <div className="skeleton skeleton-nationality"></div>
              <div className="skeleton skeleton-dates"></div>
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
    <div className="artists-page">

      {/* Page header */}
      <div className="artists-header">
        <h1>ARTISTS</h1>
        <p className="artists-count">{filteredArtists.length} artists</p>
      </div>

      {/* Search control */}
      <div className="artists-controls">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by name or nationality..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Main content - list + detail panel */}
      <div className="artists-content">

        {/* Artists list */}
        <div className={`artists-list ${selectedArtist ? 'list-with-panel' : ''}`}>

          {/* Column headers */}
          <div className="artist-list-header">
            <span className="col-name">Name</span>
            <span className="col-nationality">Nationality</span>
            <span className="col-dates">Dates</span>
          </div>

          {filteredArtists.length === 0 && (
            <p className="status-message">No artists match your search.</p>
          )}

          {filteredArtists.map((artist) => (
            <div
              key={artist.artist_id}
              className={`artist-row ${selectedArtist?.artist_id === artist.artist_id ? 'artist-row-active' : ''}`}
              onClick={() => handleArtistClick(artist)}
            >
              <span className="col-name">{artist.artist_name}</span>
              <span className="col-nationality">{artist.nationality}</span>
              <span className="col-dates">{formatDates(artist)}</span>
            </div>
          ))}

        </div>

        {/* Detail panel - slides in when an artist is selected */}
        {selectedArtist && (
          <div className="artist-detail-panel">

            <button className="detail-panel-close" onClick={handleClosePanel}>✕</button>

            {/* Artist info */}
            <div className="artist-detail-info">
              <h2 className="artist-detail-name">{selectedArtist.artist_name}</h2>
              <p className="artist-detail-meta">
                {selectedArtist.nationality} · {formatDates(selectedArtist)}
              </p>
              <p className="artist-detail-biography">{selectedArtist.biography}</p>
            </div>

            {/* Works in inventory */}
            <div className="artist-detail-section">
              <p className="artist-detail-section-label">WORKS IN INVENTORY</p>

              {loadingArtworks && (
                <p className="artist-detail-loading">Loading works...</p>
              )}

              {!loadingArtworks && artistArtworks.length === 0 && (
                <p className="artist-detail-empty">No works in inventory</p>
              )}

              {!loadingArtworks && artistArtworks.map((artwork) => (
                <div key={artwork.artwork_id} className="artist-artwork-row">
                  {/* Artwork thumbnail */}
                  <div className="artist-artwork-thumb">
                    {artwork.image_url ? (
                      <img
                        src={artwork.image_url}
                        alt={artwork.title}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="artist-artwork-thumb-placeholder"></div>
                    )}
                  </div>
                  <div className="artist-artwork-info">
                    <p className="artist-artwork-title">
                      <em>{artwork.title}</em>, {artwork.year_created}
                    </p>
                    <p className="artist-artwork-medium">{artwork.medium}</p>
                    <span className={`status-dot status-${artwork.status}`}></span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ArtistsPage;