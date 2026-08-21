import axiosInstance from './axiosInstance';
import type { Contact } from '../types/contacts';

// Get a list of all contacts
export const getContacts = () =>
  axiosInstance.get<{ contacts: Contact[] }>('/contacts');

// Get a single contact by their ID
export const getContact = (id: number) =>
  axiosInstance.get<{ contact: Contact }>(`/contacts/${id}`);

// Create a new contact
export const createContact = (data: Omit<Contact, 'contact_id' | 'notes'>) =>
  axiosInstance.post<{ contact: Contact }>('/contacts', data);

// Update an existing contact by their ID
export const updateContact = (id: number, data: Partial<Omit<Contact, 'contact_id'>>) =>
  axiosInstance.put<{ contact: Contact }>(`/contacts/${id}`, data);