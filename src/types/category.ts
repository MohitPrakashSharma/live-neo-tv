export interface Category {
  id: number;
  insert_language: string;
  image: string;
  sort_value: number;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}