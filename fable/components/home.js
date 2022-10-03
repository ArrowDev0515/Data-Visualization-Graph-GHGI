import { useEffect, useState } from "react";
import { sampleData } from "../consts/consts";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import ReactFusioncharts from "react-fusioncharts";
import dynamic from "next/dynamic.js";

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const height1 = 120;
const height2 = 150;

const dataSource = {
    chart: {
        caption: "12,301MtCO2e",
        captionFontColor: "#ffffff",
        // captionFontSize: "18",

        // subCaption: "In MMbbl = One Million barrels",
        // subCaptionFontColor: "#ffffff",

        bgColor: "#000000",
        bgAlpha: "0",

        // baseFontSize: "18",
        // baseFontColor: "#ff0000",

        // defaultcenterlabelColor: "#cccccc",

        labelFontSize: "12",
        labelFontColor: "#cccccc",

        smartLineColor: "#ffffff",
        legendItemFontColor: "#ffffff",
        labelDistance: 20,
        // plotBorderColor: "#ffffff",
        // centerlabel: "# Users: $value",
        // showpercentvalues: "0",
        // useDataPlotColorForLabels: "1",
        legendCaptionFontColor: "#ff0000",
        defaultcenterlabel: "12,301MtCO2e",
        defaultcenterlabelColor: "#ffffff",
        tooltipBorderRadius: "10",
        plottooltext: `<b>$percentValue</b> of our Android users are on <b>$label</b>`,
        // toolTipColor: "#ffff00",
        // plotFillHoverColor:"ff0000",
        //   valuePosition: "inside",
        //   labelPosition: "inside",
        //   minAngleForValue: "15",
        showlabels: "1",
        link: "#ff0000",
        // labelBorderColor: "#00ffaa",
        showLegend: "0",
        // usePattern: "1",
        // radius3D: 100,
        startingAngle: "30",
        use3DLighting: "1",
        showShadow: "1",
        enableSlicing: "0",
        theme: "fusion"
    },
    data: [
        // 31b4b0 595da3 5eb5d4 af8ecd 6fb695 f7c549 da6d6b 
        // fde047 31f05f f06631 b871c2 17dfe7 d56866 dddddd 2971ff
        // { label: "Venezuela", value: "290", color: "#fde047"},
        // { label: "Saudi", value: "260", color: "#31f05f"},
        // { label: "Canada", value: "180", color: "#f06631"},
        // { label: "Iran", value: "140", color: "#b871c2"},
        // { label: "Russia", value: "115", color: "#17dfe7"},
        // { label: "UAE", value: "100", color: "#d56866"},
        // { label: "US", value: "50", color: "#dddddd"},
        // { label: "China", value: "80", color: "#2971ff"},

        { label: "AFOLU", value: "829.845", color: "#d66967", percentValue: "29.44" },
        { label: "Waste", value: "194.768", color: "#cc8f17", percentValue: "26.4" },
        { label: "IPPU", value: "1717.012", color: "#e5b149", percentValue: "18.27" },
        { label: "Energy", value: "9558.58", color: "#dada70", percentValue: "14.21" },
        // { label: "Russia", value: "115", color: "#6fb595", percentValue: "11.68" },
        // { label: "UAE", value: "100", color: "#af8ecd", percentValue: "8.23%" },
        // { label: "US", value: "50", color: "#5eb5d4", percentValue: "4.12%" },
        // { label: "China", value: "80", color: "#fde047", percentValue: "6.58%" }
    ]
};

const chartConfigs = {
    type: "doughnut3d",
    width: "100%",
    height: "100%",
    dataFormat: "JSON",
    containerBackgroundOpacity: "0",
    dataSource: dataSource
};

const colors = ["#595da3", "#17dfe7", "#d66967", "#f3c246", "#6fb595", "#af8ecd", "#5eb5d4", "#fde047"];
export default function HomeComponent() {

    const [height, setHeight] = useState(400);
    const [pData, setPData] = useState([]);


    const onClick = (eventObj) => {
        var senderChart = eventObj.sender; // chart/ map on which event triggered
        console.log(chartConfigs.dataSource);
    }


    useEffect(() => {
        let data = sampleData.filter((ele) => {
            return (ele.geoScope === "China" && ele.year === 2014 && ele.dataSource === "GHGI")
        })

        // console.log(
        //     renderToStaticMarkup(
        //         <ReactFusioncharts
        //             type="column2d"
        //             width="100%"
        //             height="500"
        //             dataFormat="JSON"
        //             dataSource={dataSource}
        //         />
        //     )
        // );
        // console.log(
        //     renderToString(
        //         <ReactFusioncharts
        //             type="column2d"
        //             width="100%"
        //             height="500"
        //             dataFormat="JSON"
        //             dataSource={dataSource}
        //         />
        //     )
        // );
        // console.log("data", data);
        let map = new Map();
        let pData = []

        for (let i = 0; i < dataSource.data.length; i++) {
            // console.log(data[i].category, data[i].value)
            if (map.has(data[i].category)) {
                if (data[i].category === "AFOLU") {
                    if (data[i].column1 === "Agriculture") {
                        let item = new Object();
                        item["label"] = data[i].category;
                        item["value"] = map.get(data[i].category)["value"] + parseFloat(data[i].value);
                        item["color"] = colors[i];
                        map.set(data[i].category, item);
                    }
                }
            } else {
                let item = new Object();
                item["label"] = data[i].category;
                item["value"] = parseFloat(data[i].value);
                item["color"] = colors[i];
                map.set(data[i].category, item);
            }
        }
        pData = Array.from(map, ([name, value]) => ({ value }));
        console.log(pData);
    });

    return (
        <>
            {/* <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "600px" }}> */}
            <div className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-300 p-12">
                <div className="bg-gray-800 bg-opacity-30 rounded-xl p-5 grid items-center" style={{ minHeight: "500px" }}>
                    <div className="flex justify-between">
                        <div className="flex">
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label>
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                                    <option selected>Choose a Data Source</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Country : </label>
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                                    <option selected className="text-gray-900">Choose a country</option>
                                    <option className="text-gray-900" value="US">United States</option>
                                    <option className="text-gray-900" value="CA">Canada</option>
                                    <option className="text-gray-900" value="FR">France</option>
                                    <option className="text-gray-900" value="DE">Germany</option>
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Year : </label>
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5">
                                    <option selected>Choose a year</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center mx-2.5 float-right">
                            {/* <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300  shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button> */}
                            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7">
                        <div className="bg-gray-900 col-span-2 bg-opacity-10 rounded-md text-gray-200 grid text-center items-center p-3 my-3">
                            <b>Some Text Here!</b>
                        </div>
                        <div className="grid col-span-3 mx-3 justify-self-stretch bg-gray-900 bg-opacity-10 rounded-md my-3">
                            <FC chartConfigs={chartConfigs}></FC>
                        </div>
                        <div className="bg-gray-900 bg-opacity-10 rounded-md text-gray-200 grid text-center items-center p-3 col-span-2 grid-cols-2 my-3">
                            <div className="text-lg mt-3 pl-3 col-span-2 font-normal"><b><span className="font-bold">AFOLU</span> Sector</b></div>
                            <div className="justify-self-stretch px-8 content-end">
                                <div className="text-sm mb-3 pl-3"><b>830 MtCO2e</b></div>
                                <div className="w-full" style={{ height: `${height1}px` }}>
                                    {
                                        dataSource.data.map((item, idx) => (
                                            <div key={idx} className="grid items-center relative" style={{ height: `${item["percentValue"]}%`, backgroundColor: `${item.color}` }}>
                                                <span>{item.value}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="text-md mt-3 pl-3"><b>Source of Emissions</b></div>
                            </div>


                            <div className="justify-self-stretch px-8">
                                <div className="text-sm mb-3 pl-3"><b>-1115 MtCO2e</b></div>
                                <div className="w-full" style={{ height: `${height2}px` }}>
                                    {
                                        dataSource.data.map((item, idx) => (
                                            <div key={idx} className="grid items-center relative" style={{ height: `${item["percentValue"]}%`, backgroundColor: `${item.color}` }}>
                                                <span>{item.value}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="text-md mt-3 pl-3"><b>Sinks for removals</b></div>
                            </div>
                            <div className="justify-self-stretch px-8">
                                <div className="grid justify-items-start my-3 px-3">
                                    {
                                        dataSource.data.map((item, idx) => (
                                            <div key={idx} className="flex mt-2 items-center">
                                                <span className="grid" style={{ width: "15px", height: "15px", backgroundColor: `${item.color}` }}>
                                                </span>
                                                <div className="text-sm pl-3">{item.label}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="justify-self-stretch px-8">
                                <div className="grid justify-items-start my-3 px-3">
                                    {
                                        dataSource.data.map((item, idx) => (
                                            <div key={idx} className="flex mt-2 items-center">
                                                <span className="grid" style={{ width: "15px", height: "15px", backgroundColor: `${item.color}` }}>
                                                </span>
                                                <div className="text-sm pl-3">{item.label}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}