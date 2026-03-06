import React from "react";

export default function Titulo(props: any) {
    return (
        <div className="text-center">
            <h1 className="px-5 py-2 text-2xl font-bold">{props.children}</h1>
            <hr className="border-2 border-purple-600" />
        </div>
    );
}
