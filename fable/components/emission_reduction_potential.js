import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const defaultHeight = 400;

const dataSource = {
    chart: {
        caption: "Countries With Most Oil Reserves [2017-18]",
        captionFontColor: "#ffffff",

        subcaption: "In MMbbl = One Million barrels",
        subCaptionFontColor: "#ffffff",

        xaxisname: "Country",
        yaxisname: "Reserves (MMbbl)",
        numbersuffix: "K",

        bgAlpha: "0",
        paletteColors: "#f7c549",
        baseFontColor: "#ffffff",
        theme: "fusion"
    },
    data: [
        {
            label: "Venezuela",
            value: "290",
        },
        {
            label: "Saudi",
            value: "260"
        },
        {
            label: "Canada",
            value: "180"
        },
        {
            label: "Iran",
            value: "140"
        },
        {
            label: "Russia",
            value: "115"
        },
        {
            label: "UAE",
            value: "100"
        },
        {
            label: "US",
            value: "30"
        },
        {
            label: "China",
            value: "30"
        }
    ]
};

const chartConfigs = {
    type: "column2d",
    width: "100%",
    height: "100%",
    dataFormat: "JSON",
    containerBackgroundOpacity: "0",
    dataSource: dataSource
};


export default function EmissionRedcutionPotentialComponent() {

    return (
        <>
            <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "600px" }}>
                {/* <div className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-300 p-12"> */}
                <div className="bg-gray-800 bg-opacity-40 rounded-xl p-5 m-12 grid items-center justify-center" style={{ minHeight: "500px" }}>
                    <div className="flex items-center mx-2.5">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label>
                        <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                            <option className="text-gray-900" selected>Geographical. Scope</option>
                            <option className="text-gray-900" value="US">Option 1</option>
                            <option className="text-gray-900" value="CA">Option 2</option>
                            <option className="text-gray-900" value="FR">Option 3</option>
                        </select>
                    </div>
                    <div className="grid" style={{ minHeight: `${400}px`, minWidth: "600px"}}>
                        <FC chartConfigs={chartConfigs}></FC>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center mx-2.5">
                            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label> */}
                            <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                                <option className="text-gray-900" selected>AR</option>
                                <option className="text-gray-900" value="US">Option 1</option>
                                <option className="text-gray-900" value="CA">Option 2</option>
                                <option className="text-gray-900" value="FR">Option 3</option>
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Country : </label> */}
                            <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                                <option selected className="text-gray-900">Category</option>
                                <option className="text-gray-900" value="US">Option 1</option>
                                <option className="text-gray-900" value="CA">Option 2</option>
                                <option className="text-gray-900" value="FR">Option 3</option>
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Year : </label> */}
                            <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                                <option className="text-gray-900" selected>Mitigation.Option</option>
                                <option className="text-gray-900" value="US">Option 1</option>
                                <option className="text-gray-900" value="CA">Option 2</option>
                                <option className="text-gray-900" value="FR">Option 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}