export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface Data {
  food: string;
  photo: string;
  price: string;
}
