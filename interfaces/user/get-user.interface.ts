export interface GetUserResponse {
  id: string;
  email: string;
  role: string;
  name: null;
  image: null;
  phone: string;
  storageUsedMb: number;
  albums: any[];
  accessibleAlbums: any[];
  orders: any[];
}
