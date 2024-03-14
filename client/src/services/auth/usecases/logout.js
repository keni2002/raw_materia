import { apiAuth } from "../views/apiAuth";

export const logOut = apiAuth.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: () => ({
                url: 'logout/',
                method: 'POST',

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    sessionStorage.clear();
                    dispatch(apiAuth.util.resetApiState());
                } catch (error) {
                    console.log(error)
                }
            },
        }),

    }),
})

export const { useLogoutMutation } = logOut;