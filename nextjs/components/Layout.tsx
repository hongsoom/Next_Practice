import NavBar from "./NavBar";
import React from 'react';

type PropsWithChildren = {
    children: React.ReactNode;
}

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    )
}