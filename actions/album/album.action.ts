import { AlbumData } from "@/interfaces/album/create-album.interface";
import claraApi from "@/lib/axios";

export type AlbumResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const createAlbum = async (album: AlbumData): Promise<AlbumResult> => {
  try {
    const { data } = await claraApi.post("/album", album);
    return { success: true, data: data.response };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al crear el álbum.";
    return { success: false, error: message };
  }
};
