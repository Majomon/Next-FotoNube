export interface AlbumIDResponse {
  id: string;
  title: string;
  userEvent: string;
  passwordEventHash: string;
  prices: Price[];
  priceDigital: number;
  priceSchoolSports: number;
  eventDate: Date;
  clientEmail: string;
  clientPhoneNumber: string;
  description: string;
  isActiveFolder: boolean;
  photographerId: string;
  photos: Photo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  url: string;
  publicId: string;
  sizeMb: number;
}

export interface Price {
  size: string;
  price: number;
}
