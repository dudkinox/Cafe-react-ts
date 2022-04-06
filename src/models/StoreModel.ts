export default interface StoreModel {
  id: string;
  address: string;
  idstore: string;
  image: string;
  latitude: string;
  longitude: string;
  name: string;
  open: string;
  tel: string;
  total_review: number;
  website: string;
  status: boolean;
}

export interface ImageStore {
  image: string;
}

export interface StoreImgViewModel {
  id: string;
  idstore: string;
  image: any[];
}

export interface CommentModel {
  data: CommentDatum[];
  idstore: string;
}

export interface CommentDatum {
  comment: string;
  star: number;
  id: string;
  img?: string[];
  image?: string[];
}
