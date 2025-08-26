import { create } from "zustand";
import {
  uploadPhoto,
  getPhotos,
  deletePhotoById,
  deleteAllPhotosByAlbum,
} from "@/actions/photo/photo.action";
import { PhotoResponse } from "@/interfaces/photo/photo.interface";
import { toast } from "sonner";

interface PhotoState {
  photos: PhotoResponse[];
  loading: boolean;
  error?: string;

  setPhotos: (photos: PhotoResponse[]) => void;
  fetchPhotos: () => Promise<void>;
  uploadPhotos: (files: File[], albumId: string) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  deleteAllPhotos: (albumId: string) => Promise<void>;
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
      toast.error(result.error || "Error al cargar fotos ❌");
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
        toast.error(result.error || "Error al subir foto ❌");
        return;
      }
      uploaded.push(result.data);
    }

    set((state) => ({
      photos: [...state.photos, ...uploaded],
      loading: false,
    }));

    toast.success("Fotos subidas correctamente ✅");
  },

  deletePhoto: async (id) => {
    set({ loading: true, error: undefined });
    const result = await deletePhotoById(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al eliminar foto ❌");
      return;
    }

    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id),
      loading: false,
    }));

    toast.success("Foto eliminada ✅");
  },

  deleteAllPhotos: async (albumId) => {
    const { setPhotos } = get();
    set({ loading: true, error: undefined });

    const result = await deleteAllPhotosByAlbum(albumId); // Llama al endpoint seguro
    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "Error al eliminar fotos ❌");
      return;
    }

    // Limpiar fotos del store
    setPhotos([]);
    set({ loading: false });
    toast.success("Todas las fotos fueron eliminadas ✅");
  },
}));
