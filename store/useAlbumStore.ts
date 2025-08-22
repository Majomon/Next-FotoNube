import { create } from "zustand";
import { AlbumData } from "@/interfaces/album/create-album.interface";
import { AlbumResponse } from "@/interfaces/album/get-all-album.interface";
import {
  createAlbum,
  findAlbumByID,
  findAlbums,
} from "@/actions/album/album.action";

interface AlbumState {
  albums: AlbumResponse[];
  currentAlbum?: AlbumResponse;
  loading: boolean;
  error?: string;

  getAlbums: () => Promise<void>;
  getAlbumById: (id: string) => Promise<boolean>;
  addAlbum: (album: AlbumData) => Promise<boolean>;
  removeAlbum: (id: string) => void;
}

export const useAlbumStore = create<AlbumState>((set) => ({
  albums: [],
  currentAlbum: undefined,
  loading: false,
  error: undefined,

  getAlbums: async () => {
    set({ loading: true, error: undefined });
    const result = await findAlbums();

    if (!result.success) {
      set({ error: result.error, loading: false });
      return;
    }

    set({ albums: result.data, loading: false });
  },

  getAlbumById: async (id: string) => {
    set({ loading: true, error: undefined });
    const result = await findAlbumByID(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      return false;
    }

    set({ currentAlbum: result.data, loading: false });
    return true;
  },

  addAlbum: async (album: AlbumData) => {
    set({ loading: true, error: undefined });
    const result = await createAlbum(album);

    if (!result.success) {
      set({ error: result.error, loading: false });
      return false;
    }

    set((state) => ({
      albums: [...state.albums, result.data],
      loading: false,
    }));

    return true;
  },

  removeAlbum: (id: string) => {
    set((state) => ({
      albums: state.albums.filter((a) => a.id !== id),
    }));
  },
}));
