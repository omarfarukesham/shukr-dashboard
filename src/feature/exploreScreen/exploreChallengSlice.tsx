import { IChallenge } from '@/type/challengeContent.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const challengeApi = createApi({
  reducerPath: "challengeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shukur-admin-iota.vercel.app/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Challenge'],
  endpoints: (builder) => ({
    // GET all challenges
    getChallenges: builder.query<IChallenge[], void>({
      query: () => 'challenge',
      providesTags: ['Challenge'],
    }),

    // GET single challenge by ID
    getChallengeById: builder.query<IChallenge, { id: string }>({
      query: ({ id }) => `challenge/${id}`,
      providesTags: ['Challenge'],
    }),

    // POST new challenge
    addChallenge: builder.mutation<IChallenge, { data: Partial<IChallenge> }>({
      
      query: ({ data }) => ({
        url: 'challenge',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Challenge'],
    }),

    // PATCH (update) challenge
    updateChallenge: builder.mutation<IChallenge, { id: string; data: Partial<IChallenge> }>({
      query: ({ id, data }) => ({
        url: `challenge/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Challenge'],
    }),

    // DELETE challenge
    deleteChallenge: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `challenge/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Challenge'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetChallengesQuery,
  useGetChallengeByIdQuery,
  useAddChallengeMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} = challengeApi;
