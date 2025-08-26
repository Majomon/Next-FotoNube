export interface AlbumResponse {
  id: string;
  name: string;
  clientEmail: string;
  clientPhoneNumber: string;
  createdAt: Date;
  isActiveFolder: boolean;
  description: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  publicId: string;
  sizeMb: number;
}
