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
                    const { access, refresh } = getCacheEntry().data

                    console.log(access, refresh)

                    const data = jwtDecode(access);
                    console.log(data.user_id)
                    sessionStorage.setItem('user', JSON.stringify({
                        user_id: data.user_id,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        tipo: data.tipo,
                        email: data.email
                    }));

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