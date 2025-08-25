import {
  createAlbum,
  deleteAlbumID,
  findAlbumByID,
  findAlbums,
  updateAlbum,
} from "@/actions/album/album.action";
import { AlbumData } from "@/interfaces/album/create-album.interface";
import { AlbumIDResponse } from "@/interfaces/album/get-album-by-ID.interface";
import { AlbumResponse } from "@/interfaces/album/get-all-album.interface";
import { create } from "zustand";

interface AlbumState {
  albums: AlbumResponse[];
  currentAlbum?: AlbumIDResponse;
  loading: boolean;
  error?: string;

  getAlbums: () => Promise<void>;
  getAlbumById: (id: string) => Promise<boolean>;
  addAlbum: (album: AlbumData) => Promise<boolean>;
  updateAlbum: (
    id: string,
    payload: Partial<AlbumIDResponse>
  ) => Promise<boolean>;
  removeAlbum: (id: string) => Promise<boolean>;
}

export const useAlbumStore = create<AlbumState>((set, get) => ({
  albums: [],
  currentAlbum: undefined,
  loading: true,
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

  updateAlbum: async (id, payload) => {
    set({ loading: true, error: undefined });
    const result = await updateAlbum(id, payload);

    if (!result.success) {
      set({ error: result.error, loading: false });
      return false;
    }

    // Refrescamos el álbum actualizado
    await get().getAlbumById(id);

    set({ loading: false });
    return true;
  },

  removeAlbum: async (id: string) => {
    set({ loading: true, error: undefined });
    const result = await deleteAlbumID(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      return false;
    }
    // Refrescamos los álbums
    await get().getAlbums();

    set({ loading: false });

    return true;
  },
}));
