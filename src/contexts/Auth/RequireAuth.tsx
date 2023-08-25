import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Home from "../../pages/Home";

export const RequireAuth = ({ children, typeAccess }: { children: JSX.Element, typeAccess: string }) => {

    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Home />;
    }
    else if (auth.user.type !== typeAccess) {
        return <Home />;
    }
    return children;
}