import { AlbumData } from "@/interfaces/album/create-album.interface";
import { AlbumIDResponse } from "@/interfaces/album/get-album-by-ID.interface";
import { AlbumResponse } from "@/interfaces/album/get-all-album.interface";
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

export const findAlbums = async (): Promise<AlbumResult> => {
  try {
    const { data } = await claraApi.get<AlbumResponse[]>("/album");

    return { success: true, data: data };
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Error al obtener los álbumes."
    );
  }
};

export const findAlbumByID = async (id: string): Promise<AlbumResult> => {
  try {
    const { data } = await claraApi.get<AlbumIDResponse>(`/album/${id}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener el álbum.";
    return { success: false, error: message };
  }
};
