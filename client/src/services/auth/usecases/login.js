import { jwtDecode } from "jwt-decode";
import { apiAuth } from "../views/apiAuth";

export const login = apiAuth.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'login/',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { queryFulfilled, getCacheEntry }) {
                try {
                    await queryFulfilled;
                    const { access, refresh, user } = getCacheEntry().data
                    const data = await jwtDecode(access);
                    sessionStorage.setItem('user', JSON.stringify(
                        { ...user, id: data.user_id }
                    ));
                    sessionStorage.setItem('access', access);
                    sessionStorage.setItem('refresh', refresh);

                } catch (error) {
                    console.log(error)
                    sessionStorage.clear()
                }
            },
        }),
    }),
})

export const { useLoginMutation } = login;