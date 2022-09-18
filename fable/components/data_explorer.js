import { useEffect, useState } from "react";

export default function DataExplorerComponent() {

    useEffect(() => {
        // console.log(node);
    });

    return (
        <>
            <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", height: "700px" }}>
                <p className="text-xl font-bold">Data Explorer!</p>
            </div>
        </>
    )
}