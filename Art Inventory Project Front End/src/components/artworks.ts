import axiosInstance from './axiosInstance';
import type { Artwork } from '../types/artwork';

export const getArtworks = () =>
  axiosInstance.get<Artwork[]>('/artworks');

export const getArtwork = (id: number) =>
  axiosInstance.get<Artwork>(`/artworks/${id}`);

export const createArtwork = (data: Omit<Artwork, 'id'>) =>
  axiosInstance.post<Artwork>('/artworks', data);

export const updateArtwork = (id: number, data: Partial<Artwork>) =>
  axiosInstance.put<Artwork>(`/artworks/${id}`, data);

export const deleteArtwork = (id: number) =>
  axiosInstance.delete(`/artworks/${id}`);