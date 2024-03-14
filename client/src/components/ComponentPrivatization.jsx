import { useSelector } from "react-redux";
import { auth_state } from "../features/authSlice";

export function checkPerm(permitted, user) {

    if (Array.isArray(permitted)) {
        return user?.groups.some((role) => permitted.includes(role.name));
    } else if (typeof permitted === "string") {
        return user?.groups.some((role) => role.name === permitted);
    } else {
        return user?.is_staff;
    }
}

export default function ComponentsPrivatization({ permitted, redirect = false, children }) {
    const { user } = useSelector(auth_state);

    return checkPerm(permitted, user) || user.is_staff ? (
        <>{children}</>
    ) : redirect === false ? null : (
        <Navigate to={'/comerciales'} replace />
    );
};