import axiosInstance from './axiosInstance';
import type { Contact } from '../types/contacts';

// Get a list of all contacts
export const getContacts = () =>
  axiosInstance.get<{ contacts: Contact[] }>('/contacts');

// Get a single contact by their ID
export const getContact = (id: number) =>
  axiosInstance.get<{ contact: Contact }>(`/contacts/${id}`);