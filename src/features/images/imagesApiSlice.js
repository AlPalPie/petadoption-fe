import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"


// createEntityAdapter() is a utility function to help manage "normalized" state
//   normalized meaning storing the data in a flat structure with entities indexed by their ID
//     The entities cannot be iterated over, but the IDs can
//     Normalization makes it easier to update and access specific entities, reducing redundancy and improving performance.
//   It automatically generates reducer logic for common operations such as adding, updating, and removing entities
//   It provides selectors for accessing entities and their IDs
//   Allows you to specify a sort order for entities based on a property, simplifying the process of maintaining a sorted collection.
const imagesAdapter = createEntityAdapter({})

// Initial state is typically:
// {
//     ids: [],
//     entities: {},
// }
const initialState = imagesAdapter.getInitialState()

export const imagesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getImages: builder.query({
            query: () => ({
                url: '/images',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedImages = responseData.map(image => {
                    image.id = image._id
                    return image
                });
                return imagesAdapter.setAll(initialState, loadedImages)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Image', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Image', id }))
                    ]
                } else return [{ type: 'Image', id: 'LIST' }]
            }
        }),
        addNewImage: builder.mutation({
            query: initialImage => ({
                url: '/images',
                method: 'POST',
                body: {
                    ...initialImage,
                }
            }),
            invalidatesTags: [
                { type: 'Image', id: "LIST" }
            ]
        }),
        updateImage: builder.mutation({
            query: initialImage => ({
                url: '/images',
                method: 'PATCH',
                body: {
                    ...initialImage,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Image', id: arg.id }
            ]
        }),
        deleteImage: builder.mutation({
            query: ({ id }) => ({
                url: `/images`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Image', id: arg.id }
            ]
        }),
    }),
})



// RTK Query generated hooks, each returns a "result" object containing several fields:
// data: the actual response contents from the server. This field will be undefined until the response is received.
// isLoading: a boolean indicating if this hook is currently making the first request to the server. (Note that if the parameters change to request different data, isLoading will remain false.)
// isFetching: a boolean indicating if the hook is currently making any request to the server
// isSuccess: a boolean indicating if the hook has made a successful request and has cached data available (ie, data should be defined now)
// isError: a boolean indicating if the last request had an error
// error: a serialized error object
export const {
    useGetImagesQuery,
    useAddNewImageMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
} = imagesApiSlice

// returns the query result object
export const selectImagesResult = imagesApiSlice.endpoints.getImages.select()

// creates memoized selector
const selectImagesData = createSelector(
    selectImagesResult,
    imagesResult => imagesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllImages,
    selectById: selectImageById,
    selectIds: selectImageIds
    // Pass in a selector that returns the images slice of state
} = imagesAdapter.getSelectors(state => selectImagesData(state) ?? initialState)