/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ContentItem {
  data: {};
  _id: string;
  title: string;
  details: string;
  image?: string;
  arabicText?: string;
  ref?: string;
  isShowing: boolean;
  publishDate: string;
  totalLikes: number;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface HomeContentResponse {
  data: any;
  shukrInspiration: ContentItem[];
  positiveThinking: ContentItem[];
  jazakallahulKhair: ContentItem[];
  shukrPosts: ContentItem[];
  duaOfTheDay: ContentItem[];
  whatNew: ContentItem[];
}

export const homeContentApi = createApi({
  reducerPath: 'homeContentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shukur-admin-iota.vercel.app/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    mode: 'cors',
  }),
  tagTypes: ['HomeContent'],
  endpoints: (builder) => ({
    // GET all content
    getHomeContent: builder.query<HomeContentResponse, void>({
      query: () => 'homeContent',
      providesTags: ['HomeContent'],
    }),

    // GET single content item by ID
    getContentItem: builder.query<ContentItem, {id: string }>({
      query: ({ id }) => `homeContent/${id}`,
      providesTags: ['HomeContent'],
    }),

    // POST new content item
    addContentItem: builder.mutation<ContentItem, {  data: Partial<ContentItem> }>({
      query: ({ data }) => ({
        url: `homeContent`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['HomeContent'],
    }),

    // PATCH (update) content item
    updateContentItem: builder.mutation<ContentItem, {  id: string; data: Partial<ContentItem> }>({
      query: ({id, data }) => ({
        url: `homeContent/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['HomeContent'],
    }),

    // DELETE content item
    deleteContentItem: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `homeContent/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HomeContent'],
    }),
  }),
});

export const {
  useGetHomeContentQuery,
  useGetContentItemQuery,
  useAddContentItemMutation,
  useUpdateContentItemMutation,
  useDeleteContentItemMutation,
} = homeContentApi;
