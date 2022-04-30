import React, {FC} from 'react';
import {Header} from "./Header";
import {BrowserRouter, Outlet, Route, Navigate, RouteProps, Routes} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

function DefaultPage() {
    return (
        <>
            <Header/>
            <h1>Default Page!</h1>
        </>
    );
}

function SecuredPage() {
    return (
        <>
            <Header/>
            <h1>Secured Page!</h1>
        </>
    );
}

function VendorPage() {
    return (
        <>
            <Header/>
            <h1>Vendor Page!</h1>
        </>
    );
}

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, ...props }) => {
    const { keycloak } = useKeycloak();

    if (!keycloak.authenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

const VendorRoute: FC<PrivateRouteProps> = ({ children, ...props }) => {
    const { keycloak } = useKeycloak();

    if (!keycloak.hasRealmRole('vendor')) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<DefaultPage/>} />
                    <Route path="/secured" element={<PrivateRoute><SecuredPage/></PrivateRoute>} />
                    <Route path="/vendor" element={<VendorRoute><VendorPage/></VendorRoute>} />
                </Routes>
            </BrowserRouter>
            <Outlet />
        </>
    );
}

export default App;
