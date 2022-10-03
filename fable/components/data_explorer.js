import { useEffect, useState } from "react";

export default function DataExplorerComponent() {

    useEffect(() => {
        // console.log(node);
    });

    return (
        <>
            <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "700px" }}>
                <div className="bg-white bg-opacity-20 rounded-xl p-5 m-12 " style={{ minHeight: "500px" }}>
                    <div className="flex justify-end mb-3">
                        {/* <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                        {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300  shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                        {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button> */}
                        <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button>
                    </div>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="bg-gray-900 bg-opacity-30 text-xs text-gray-300 uppercase h-14">
                                <tr>
                                    <th scope="col" className="py-3 px-6">Mitigation Option</th>
                                    <th scope="col" className="py-3 px-6">Geographical Scope</th>
                                    <th scope="col" className="py-3 px-6">GHG gases</th>
                                    <th scope="col" className="py-3 px-6">Potential Reduction Emission</th>
                                    <th scope="col" className="py-3 px-6">Impact on Biodiversity</th>
                                    <th scope="col" className="py-3 px-6">Impact on Water Use</th>
                                    <th scope="col" className="py-3 px-6">...</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gradient-to-br from-[#72e48d8a] bg-opacity-20">
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        Mitigation Option Value 1
                                    </th>
                                    <td className="py-4 px-6">Geographical Scope Vaule 1</td>
                                    <td className="py-4 px-6">GHG gases Value 1</td>
                                    <td className="py-4 px-6">Potential Reduction Emission</td>
                                    <td className="py-4 px-6">Impact on Biodiversity</td>
                                    <td className="py-4 px-6">Impact on Water Use</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}