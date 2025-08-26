export interface PhotoResponse {
  id: string; // UUID de la foto
  url: string;
  publicId: string; // Cloudinary public_id
  sizeMb: number;
}
