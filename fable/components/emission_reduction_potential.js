import { useEffect, useState } from "react";
import { sampleData } from "../consts/consts";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import ReactFusioncharts from "react-fusioncharts";
import dynamic from "next/dynamic.js";

const FC = dynamic(() => import("./next-fusioncharts.js"), { ssr: false });


const dataSource = {
    chart: {
        caption: "12,301MtCO2e",
        // subCaption: "In MMbbl = One Million barrels",

        bgColor: "#000000",
        bgAlpha: "0",


        // captionFontSize: "18",
        // captionFontColor: "#ffffff",
        // baseFontColor: "#ff0000",
        labelFontSize: "12",
        labelFontColor: "#cccccc",

        // defaultcenterlabelColor: "#cccccc",

        smartLineColor: "#ffffff",
        legendItemFontColor: "#ffffff",
        labelDistance: 0,
        // plotBorderColor: "#ffffff",
        // centerlabel: "# Users: $value",
        //   showpercentvalues: "0",
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
        showlabels: "0",
        link: "#ff0000",
        // labelBorderColor: "#00ffaa",

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

        { label: "Venezuela", value: "290", color: "#595da3", percentValue: "23.87%" },
        { label: "Saudi", value: "260", color: "#17dfe7", percentValue: "21.4%" },
        { label: "Canada", value: "180", color: "#d66967", percentValue: "14.81%" },
        { label: "Iran", value: "140", color: "#f3c246", percentValue: "11.52%" },
        { label: "Russia", value: "115", color: "#6fb595", percentValue: "9.47%" },
        { label: "UAE", value: "100", color: "#af8ecd", percentValue: "8.23%" },
        { label: "US", value: "50", color: "#5eb5d4", percentValue: "4.12%" },
        { label: "China", value: "80", color: "#fde047", percentValue: "6.58%" }
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


export default function EmissionRedcutionPotentialComponent() {

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

        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].category, data[i].value)
            if (map.has(data[i].category)) {
                if (data[i].category === "AFOLU") {
                    if (data[i].column1 === "Agriculture") {
                        let item = new Object();
                        item["label"] = data[i].category;
                        item["value"] = map.get(data[i].category)["value"] + parseFloat(data[i].value);
                        item["id"] = data[i].category;
                        item["color"] = "rgb(100, 23, 43)";
                        map.set(data[i].category, item);
                    }
                }
            } else {
                let item = new Object();
                item["label"] = data[i].category;
                item["value"] = parseFloat(data[i].value);
                item["id"] = data[i].category;
                item["color"] = "rgb(100, 23, 43)";
                map.set(data[i].category, item);
            }
        }
    });

    return (
        <>
            <div className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-300 p-12">
                <div className="bg-gray-800 bg-opacity-20 rounded-xl p-5 grid items-center" style={{ height: "500px" }}>
                    <div className="flex">
                        <div className="flex items-center mx-2.5">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Data Source : </label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2.5">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Country : </label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2.5">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Year : </label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ml-2.5">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 pt-3" style={{ minHeight: `${400}px` }}>
                        <div className="bg-white rounded-md bg-opacity-10 text-white grid text-center items-center p-3" style={{ minWidth: "200px" }}>
                            <b>Some Text Here!</b>
                        </div>
                        <FC chartConfigs={chartConfigs}></FC>
                        <div className="col-span-2 bg-white rounded-md bg-opacity-10 text-white grid text-center items-center p-3 grid-cols-2">
                            <div className="justify-self-center">
                                <div className="" style={{ width: "100px", height: "200px"}}>
                                    {
                                        dataSource.data.map((item, idx) => (
                                            <div key={idx} className="relative" style={{width:"100px", height: `${item["percentValue"]}`, backgroundColor: `${item.color}` }}>
                                                <span>{item.value}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>Text2</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}