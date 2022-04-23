import React from 'react';
import {Header} from "./Header";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import PrivateRoute from './util/private-route';

function DefaultPage() {
    return (
        <>
            <Header />
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

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<DefaultPage/>} />
                    <Route path="/secured" element={<PrivateRoute><SecuredPage/></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
            <Outlet />
        </>
    );
}

export default App;
