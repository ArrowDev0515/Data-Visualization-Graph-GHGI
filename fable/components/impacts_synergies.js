import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });

const dataSource = {
    chart: {
        caption: "Percentage Change on Criteria other than GHG Reductions",
        // caption: "12,301MtCO2e",
        captionFontColor: "#ffffff",

        yaxisname: "Percentage. Change",
        // subcaption: "Last week",
        numdivlines: "3",
        showvalues: "0",
        legenditemfontsize: "15",
        legenditemfontbold: "1",
        plottooltext: "<b>$dataValue</b> Tickets $seriesName on $label",

        bgColor: "#000000",
        bgAlpha: "0",

        labelFontSize: "12",
        labelFontColor: "#cccccc",
        
        captionFontColor: "#ffffff",

        bgColor: "#000000",
        bgAlpha: "0",
        // baseFontSize: "18",
        baseFontColor: "#ffffff",

        showLegend: "0",
        showShadow: "1",

        theme: "fusion"
    },
    categories: [
        {
            category: [
                {
                    label: "Jan 1"
                },
                {
                    label: "Jan 2"
                },
                {
                    label: "Jan 3"
                },
                {
                    label: "Jan 4"
                },
                {
                    label: "Jan 5"
                },
                {
                    label: "Jan 6"
                },
                {
                    label: "Jan 7"
                }
            ]
        }
    ],
    dataset: [
        {
            seriesname: "Received",
            data: [
                {
                    value: "55"
                },
                {
                    value: "45"
                },
                {
                    value: "52"
                },
                {
                    value: "29"
                },
                {
                    value: "48"
                },
                {
                    value: "28"
                },
                {
                    value: "32"
                }
            ]
        },
        {
            seriesname: "Resolved",
            data: [
                {
                    value: "50"
                },
                {
                    value: "30"
                },
                {
                    value: "49"
                },
                {
                    value: "22"
                },
                {
                    value: "43"
                },
                {
                    value: "14"
                },
                {
                    value: "31"
                }
            ]
        }
    ]
};

const chartConfigs = {
    type: "msspline",
    width: "100%",
    height: "100%",
    dataFormat: "JSON",
    containerBackgroundOpacity: "0",
    dataSource: dataSource
};

export default function ImpactsAndSynergiesComponent() {

    useEffect(() => {
    });

    return (
        <>
            <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minheight: "600px" }}>
                <div className="grid grid-cols-6 bg-gray-800 bg-opacity-40 rounded-xl p-5 m-12 items-center justify-center">
                    <div className="col-span-6 flex justify-between">
                        <label htmlFor="countries" className="flex px-5 text-lg font-medium text-gray-200">Mitigation Name </label>
                        {/* <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                            <option className="text-gray-900" selected>Geographical. Scope</option>
                            <option className="text-gray-900" value="US">Option 1</option>
                            <option className="text-gray-900" value="CA">Option 2</option>
                            <option className="text-gray-900" value="FR">Option 3</option>
                        </select> */}
                        <div className="flex items-center mx-2.5 float-right">
                            {/* <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300  shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button> */}
                            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button>
                        </div>
                    </div>
                    {/* <p className="text-xl font-bold">Impacts & Synergies</p> */}
                    <div className="col-span-3 m-3 bg-gray-900 bg-opacity-20 rounded-md text-gray-200 flex text-center p-3 " style={{ minHeight: "500px" }}>
                        <img src="avatar2.png" className="h-40 bg-white bg-opacity-20 rounded-md m-3" />
                        <div className="my-3 text-3xl">Some Text Here!</div>
                    </div>
                    <div className="grid" style={{ minHeight: `${400}px`, minWidth: "600px" }}>
                        <FC chartConfigs={chartConfigs}></FC>
                    </div>
                </div>
            </div>
        </>
    )
}