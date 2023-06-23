import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration: number | undefined) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
        // REMOVE FOR PRODUCTION
        fetchFn: async (...args) => {
          await pause(1000);
          return fetch(...args);
        },//
  }),
  tagTypes: ['Photo', 'AlbumPhoto'],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) =>{
          const tags = result.map((photo:any)=>{
            return{ type:'Photo', id: photo.id};
          });
          tags.push({type:'AlbumPhoto', id:album.id});
          return tags;
        },
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) =>{
          return [{type:'AlbumPhoto', id:album.id}];
        },
        query: (album) => {
          return {
            method: 'POST',
            url: '/photos',
            body: {
              albumId: album.id,
              // url: faker.image.abstract(150, 150, true),
              url: faker.image.nature(150, 150, true),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) =>{
          return [{type:'Photo', id:photo.id}];
        },
        query: (photo) => {
          return {
            method: 'DELETE',
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi;
export { photosApi };
