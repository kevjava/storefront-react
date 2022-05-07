import {Header} from "../Header";
import React from "react";
import Storefronts from "../storefronts/Storefronts";


export function DefaultPage() {
    return (
        <>
            <Header/>
            <h1>Default Page!</h1>
            <Storefronts />
        </>
    );
}