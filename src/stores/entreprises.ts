import { create } from 'zustand';
import api from '../lib/axios';

interface Entreprise {
  id: string;
  siret: string;
  nom: string;
  email: string;
  telephone: string;
  statut: string;
}

interface EntreprisesState {
  entreprises: Entreprise[];
  loading: boolean;
  error: string | null;
  fetchEntreprises: () => Promise<void>;
}

export const useEntreprisesStore = create<EntreprisesState>((set) => ({
  entreprises: [],
  loading: false,
  error: null,

  fetchEntreprises: async () => {
    try {
      set({ loading: true });
      const response = await api.get('/entreprises');
      set({ entreprises: response.data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch entreprises', loading: false });
    }
  },
}));