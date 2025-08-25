// src/store/usePhotoStore.ts
import { create } from "zustand";
import {
  uploadPhoto,
  getPhotos,
  deletePhotoById,
} from "@/actions/photo/photo.action";
import { PhotoResponse } from "@/interfaces/photo/photo.interface";

interface UploadPhotosResult {
  success: boolean;
  error?: string;
}

interface PhotoState {
  photos: PhotoResponse[];
  loading: boolean;
  error?: string;

  setPhotos: (photos: PhotoResponse[]) => void;
  fetchPhotos: () => Promise<void>;
  uploadPhotos: (files: File[], albumId: string) => Promise<UploadPhotosResult>;
  deletePhoto: (id: string) => Promise<boolean>;
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
  photos: [],
  loading: false,
  error: undefined,

  setPhotos: (photos) => set({ photos }),

  fetchPhotos: async () => {
    set({ loading: true, error: undefined });
    const result = await getPhotos();

    if (!result.success) {
      set({ error: result.error, loading: false });
      return;
    }

    set({ photos: result.data, loading: false });
  },

  uploadPhotos: async (files, albumId) => {
    set({ loading: true, error: undefined });

    const uploaded: PhotoResponse[] = [];

    for (const file of files) {
      const result = await uploadPhoto(file, albumId);

      if (!result.success) {
        set({ error: result.error, loading: false });
        return { success: false, error: result.error }; // <-- retornar error
      }
      uploaded.push(result.data);
    }

    set((state) => ({
      photos: [...state.photos, ...uploaded],
      loading: false,
    }));

    return { success: true };
  },

  deletePhoto: async (id) => {
    set({ loading: true, error: undefined });
    const result = await deletePhotoById(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      return false;
    }

    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id),
      loading: false,
    }));

    return true;
  },
}));
