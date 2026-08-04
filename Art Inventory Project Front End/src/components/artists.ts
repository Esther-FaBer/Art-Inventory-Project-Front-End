import axiosInstance from './axiosInstance';
import type { Artist } from '../types/artist';

// Get a list of all artists
export const getArtists = () =>
  axiosInstance.get<{ artists: Artist[] }>('/artists');

// Get a single artist by their ID
export const getArtist = (id: number) =>
  axiosInstance.get<{ artist: Artist }>(`/artists/${id}`);

// Get all artworks by a specific artist
export const getArtistArtworks = (id: number) =>
  axiosInstance.get(`/artists/${id}/artworks`);