import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IProduct {
  data: unknown;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  publicationDate: string;
  image?: string;
}

interface IProductResponse {
  data: IProduct;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://assignment-3-gray-seven.vercel.app/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    mode: 'cors',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // GET all products
    getProducts: builder.query<IProductResponse[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),

    // GET single product
    getProduct: builder.query<IProduct, string>({
      query: (id) => `products/${id}`,
      providesTags: ['Products'],
    }),

    // POST new product
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    // PUT update product
    updateProduct: builder.mutation<IProduct, { id: string; data: Partial<IProduct> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // DELETE product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;




