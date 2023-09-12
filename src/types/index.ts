export interface Category {
  name: string;
  subcategories: {
    id: number;
    name: string;
  }[];
}
