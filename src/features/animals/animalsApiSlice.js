import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const animalsAdapter = createEntityAdapter({})

const initialState = animalsAdapter.getInitialState()

export const animalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnimals: builder.query({
            query: () => ({
                url: '/animals',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedAnimals = responseData.map(animal => {
                    animal.id = animal._id
                    return animal
                });
                return animalsAdapter.setAll(initialState, loadedAnimals)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Animal', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Animal', id }))
                    ]
                } else return [{ type: 'Animal', id: 'LIST' }]
            }
        }),
        addNewAnimal: builder.mutation({
            query: initialAnimal => ({
                url: '/animals',
                method: 'POST',
                body: initialAnimal,
                formData: true
            }),
            invalidatesTags: [
                { type: 'Animal', id: "LIST" }
            ]
        }),
        updateAnimal: builder.mutation({
            query: initialAnimal => ({
                url: '/animals',
                method: 'PATCH',
                body: initialAnimal,
                formData: true
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Animal', id: arg.id }
            ]
        }),
        deleteAnimal: builder.mutation({
            query: ({ name }) => ({
                url: `/animals`,
                method: 'DELETE',
                body: { name }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Animal', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAnimalsQuery,
    useAddNewAnimalMutation,
    useUpdateAnimalMutation,
    useDeleteAnimalMutation,
} = animalsApiSlice

// returns the query result object
export const selectAnimalsResult = animalsApiSlice.endpoints.getAnimals.select()

// creates memoized selector
const selectAnimalsData = createSelector(
    selectAnimalsResult,
    animalsResult => animalsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAnimals,
    selectById: selectAnimalById,
    selectIds: selectAnimalIds
    // Pass in a selector that returns the animals slice of state
} = animalsAdapter.getSelectors(state => selectAnimalsData(state) ?? initialState)