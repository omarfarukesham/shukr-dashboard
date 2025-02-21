 export type TProduct = {
  id?: number;
  _id?: string | undefined;
  title: string;
  image?: string;
  category: string;
  author: string;
  description: string;
  price: number;
  quantity: number;
  inStock: boolean;

 }

 export interface ProductResponse {
    success: boolean;
    data: TProduct;
    message: string;
  }