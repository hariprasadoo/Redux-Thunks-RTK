import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Faker, faker } from '@faker-js/faker';

//dev only
const pause = (duration: any) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, duration);
    })
  }//

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
        //dev only
        fetchFn: async (...args)=>{
            await pause(1000);
            return fetch(...args)
        }//
    }),
    endpoints(builder){
        return{
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user)=>{
                    return [{type: 'Album', id: user.id}];
                },
                query:(user) =>{
                    return{
                        url:'/albums',
                        method:'POST',
                        body:{
                            userId:user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user)=>{
                    return [{type: 'Album', id: user.id}];
                },
                query: (user)=>{
                    return{
                        url: '/albums',
                        params:{
                            userId: user.id,
                        },
                        method: 'GET'
                    };
                }
            })
        }
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation} = albumsApi;
export {albumsApi};