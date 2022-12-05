import { useEffect, useState } from "react";

export default function Footer() {

    return (
        <>
            <div className="mt-10 px-10 py-12 bg-[#113458] items-center text-center">
                {/* <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "700px" }}> */}
                <label className="text-gray-200 text-3xl font-medium ">
                    Contact Us <br /><br />
                </label>
                <label className="text-gray-200 text-xl">
                Get in touch with us at info.fable@unsdsn.org to point us to analysis from scientific papers or grey literature that could enrich our mitigation options database.
                </label>

            </div>
        </>
    )
}