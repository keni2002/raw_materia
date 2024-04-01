import { useSelector } from "react-redux";
import { auth_state } from "../features/authSlice";
import { Navigate } from "react-router-dom";

export function checkPerm(permitted, user) {
    const grupo = user?.grupo
    if (Array.isArray(permitted)) {
        for (const i of permitted) {
            return i == grupo
        }
    } else if (typeof permitted === "string") {
        return user?.grupo.some((role) => role.name === permitted);
    } else {
        return user?.is_staff;
    }
}

export default function ComponentsPrivatization({ permitted, redirect = false, children }) {
    const { user } = useSelector(auth_state);

    return checkPerm(permitted, user) || user.is_staff ? (
        <>{children}</>
    ) : redirect === false ? null : (
        <Navigate to={'/forbidden'} replace />
    );
};


// if (Array.isArray(permitted)) {
//     // groups son grupos solo que lo puse en singular para no sobresscribir el original

//     return user?.grupo.some((role) => permitted.includes(role.name));
// } else if (typeof permitted === "string") {
//     return user?.grupo.some((role) => role.name === permitted);
// } else {
//     return user?.is_staff;
// }