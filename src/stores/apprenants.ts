import { create } from 'zustand';
import api from '../lib/axios';

interface Apprenant {
  id: string;
  code: string;
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  entreprises: any[];
}

interface ApprenantsState {
  apprenants: Apprenant[];
  loading: boolean;
  error: string | null;
  fetchApprenants: () => Promise<void>;
}

export const useApprenantsStore = create<ApprenantsState>((set) => ({
  apprenants: [],
  loading: false,
  error: null,

  fetchApprenants: async () => {
    try {
      set({ loading: true });
      const response = await api.get('/apprenants');
      set({ apprenants: response.data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch apprenants', loading: false });
    }
  },
}));