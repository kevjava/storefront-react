import { useKeycloak } from "@react-keycloak/web";


class PrivateRouteProps {
    children: any; // FIXME
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? props.children : null;
};

export default PrivateRoute;