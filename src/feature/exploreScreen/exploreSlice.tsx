import { Template } from '@/type/templateContent.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

  export const templateApi = createApi({
    reducerPath: "templateApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.theshukrapp.com/api/",
      prepareHeaders: (headers) => {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (token) {
          headers.set("Authorization", `Bearer ${token}`); // Include the token in the headers
        }
        headers.set("Content-Type", "application/json");
        return headers;
      },
    }),
    tagTypes: ['Template'],
    endpoints: (builder) => ({
      // GET all templates
      getTemplates: builder.query<Template[], void>({
        query: () => 'template',
        providesTags: ['Template'],
      }),
  
      // GET single template by ID
      getTemplateById: builder.query<Template, { id: string }>({
        query: ({ id }) => `template/${id}`,
        providesTags: ['Template'],
      }),
  
      // POST new template
      addTemplate: builder.mutation<Template, { data: Partial<Template> }>({
        query: ({ data }) => ({
          url: 'template',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Template'],
      }),
  
      // PATCH (update) template
      updateTemplate: builder.mutation<Template, { id: string; data: Partial<Template> }>({
        query: ({ id, data }) => ({
          url: `template/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Template'],
      }),
  
      // DELETE template
      deleteTemplate: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `template/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Template'],
      }),
    }),
  });
  
  // Export hooks for usage in components
  export const {
    useGetTemplatesQuery,
    useGetTemplateByIdQuery,
    useAddTemplateMutation,
    useUpdateTemplateMutation,
    useDeleteTemplateMutation,
  } = templateApi;