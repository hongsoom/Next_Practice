import NavBar from "./NavBar";
import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    )
}