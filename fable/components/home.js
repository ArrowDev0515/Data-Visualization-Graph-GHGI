import { useEffect, useState } from "react";

const margin = { top: 30, right: 200, bottom: 30, left: 30 };
const defaultHeight = 400;
const styles = {
    // root: {
    //     fontFamily: "consolas, sans-serif",
    //     textAlign: "center",
    //     position: "relative",
    //     width: height,
    //     height: height
    // },
    overlay: {
        position: "absolute",
        top: `${defaultHeight / 2 + 30}px`,
        left: `calc(25% - ${53}px)`,
        // right: margin.right,
        // bottom: 0,
        // left: margin.left,
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        fontSize: 16,
        color: "#FFFFFF",
        // background: "#FFFFFF33",
        // textAlign: "center",
        // This is important to preserve the chart interactivity
        pointerEvents: "none"
    },
    totalLabel: {
        fontSize: 24
    }
};


export default function HomeComponent() {

    return (
        <>
            <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", height: "600px" }}>
                <p className="text-xl font-bold">HomeComponent</p>
            </div>
        </>
    )
}