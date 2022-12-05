import { useEffect, useState } from "react";

export default function DataExplorerComponent() {

    useEffect(() => {
    });

    return (
        <>
            <div className="my-2 mx-8 bg-[#113458] bg-opacity-10 rounded-xl items-center justify-center">
                {/* <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "700px" }}> */}
                <div className="grid col-span-6 md:col-span-3 mx-5 my-3 py-5">
                    <div className="">
                        <label htmlFor="countries" className="text-lg font-medium text-[#113458]">
                            Source Data
                        </label>
                    </div>
                    {
                        <>
                            <div className="relative rounded-t-xl mt-5">
                                <table className="w-full text-sm text-center text-[#113458] rounded-t-sm">
                                    <thead className="text-xs text-white uppercase bg-[#11345877] ">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Author
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Title
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Year
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Journal
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                DOI
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gradient-to-b bg-[#11345822] rounded-b-sm">
                                        <tr className="border-t border-gray-400">
                                            <th scope="row" className="py-3 px-6 font-medium whitespace-nowrap">
                                                Some Text Here.
                                            </th>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                        </tr>
                                        <tr className="border-t border-gray-400">
                                            <th scope="row" className="py-3 px-6 font-medium whitespace-nowrap">
                                                Some Text Here.
                                            </th>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                        </tr>
                                        <tr className="border-t border-gray-400">
                                            <th scope="row" className="py-3 px-6 font-medium whitespace-nowrap">
                                                Some Text Here.
                                            </th>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                            <td className="py-3 px-6">
                                                Some Text Here.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}