import axiosInstance from './axiosInstance';

export type Exhibition = {
  exhibition_id: number;
  gallery_id: number;
  exhibition_name: string;
  start_date: string;
  end_date: string;
  description: string;
};

// Get a list of all exhibitions
export const getExhibitions = () =>
  axiosInstance.get<{ exhibitions: Exhibition[] }>('/exhibitions');

// Get a single exhibition by its ID
export const getExhibition = (id: number) =>
  axiosInstance.get<{ exhibition: Exhibition }>(`/exhibitions/${id}`);