export interface Category {
  name: string;
  subcategories: {
    id: number;
    name: string;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface City {
  city: string;
  admin_name: string;
}
