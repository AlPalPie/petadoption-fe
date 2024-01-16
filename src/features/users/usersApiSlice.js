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
const usersAdapter = createEntityAdapter({})

// Initial state is typically:
// {
//     ids: [],
//     entities: {},
// }
const initialState = usersAdapter.getInitialState()


// The "builder" is an object provided as an argument to the "endpoints" function when you create an API using createAPI()
//   It contains methods for defining different types of endpoints, such as query, mutation, and queryMap.

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
//
// createSelector is a utility function that allows you to create a memoized selector.
// Memoization ensures that the selector only recomputes its result when the input arguments change, helping to optimize performance by preventing unnecessary recalculations.
// .data is a property of baseQuery results
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)