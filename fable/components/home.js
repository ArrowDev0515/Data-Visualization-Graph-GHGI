import { useEffect, useState } from "react";
import { sampleData } from "../consts/consts";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import ReactFusioncharts from "react-fusioncharts";
import dynamic from "next/dynamic.js";
import { data } from "autoprefixer";
import { exportToCSV } from "../utils/exportCSV";
const dataSrc = require("../consts/Data_Home.json");
const consts = require("../consts/consts");

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
let height1 = 120;
let height2 = 150;

export default function HomeComponent() {

    const [AFOLUData, setAFOLUData] = useState([]);
    const [exportData, setExportData] = useState([]);

    const [dataSource, setDataSource] = useState("UNFCCC");
    const [country, setCountry] = useState("China");
    const [year, setYear] = useState(1994);

    // const [chartConfigs, setChartConfigs] = useState([]);
    const [chartConfigs, setChartConfigs] = useState({
        type: "doughnut3d",
        width: "100%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",
        dataSource: {
            chart: {
                caption: "12,301MtCO2e",
                captionFontColor: "#ffffff",

                dataEmptyMessage: "AAAAAAAAAAAAAAAAAAAAAA",
                loadMessageColor: "#ff0000",
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
                labelDistance: 10,
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
                // { label: "AFOLU", value: "829.845", color: "#d66967", percentValue: "29.44" },
                // { label: "Waste", value: "194.768", color: "#cc8f17", percentValue: "26.4" },
                // { label: "IPPU", value: "1717.012", color: "#e5b149", percentValue: "18.27" },
                // { label: "Energy", value: "9558.58", color: "#dada70", percentValue: "14.21" },
            ]
        }
    });


    const onClick = (eventObj) => {
        var senderChart = eventObj.sender; // chart/ map on which event triggered
        console.log(chartConfigs.dataSource);
    }


    useEffect(() => {
        // filterData();
    });

    useEffect(() => {
        filterData();
    }, [dataSource, country, year]);

    const filterData = () => {
        // console.log(dataSource, country, year,);

        let data = dataSrc.filter((ele) => {
            return (ele["Country"] === country && ele["Year"] === parseInt(year) && ele["Data Source"] === dataSource);
        });
        setExportData(data);
        let afoluData = data.filter((ele) => {
            return (ele["Category"] === consts.CATEGORY_AFOLU);
        })
        setAFOLUData(afoluData);

        let set = new Set();
        let arr = [];
        let i = 0;
        let captionStr = "No Data to Display";
        data.forEach((item) => {
            let tmpItem = new Object();
            tmpItem["label"] = item["Category"];
            tmpItem["value"] = parseFloat(item["EmissionCategoryMtCO2e"]);
            tmpItem["percentValue"] = (parseFloat(item["EmissionCategoryMtCO2e"]) / parseFloat(item["TotalEmissionsMtCO2e"]) * 100).toFixed(2);
            tmpItem["color"] = consts.colors[i];
            if (!set.has(item["Category"])) {
                set.add(item["Category"]);
                arr.push(tmpItem);
            }
            i++;
        })
        if (data.length > 0) {
            captionStr = data[0]["TotalEmissionsMtCO2e"].toString() + "MtCO2e";
        }
        // console.log(captionStr);
        // setChartConfigs(...arr);
        // setChartConfigs({...chartConfigs, dataSource: {...chartConfigs.dataSource}})
        setChartConfigs({
            ...chartConfigs, dataSource: {
                ...chartConfigs.dataSource,
                data: arr,
                chart: { ...chartConfigs.dataSource.chart, caption: captionStr }
            }
        });
        // console.log(arr);
    }

    useEffect(() => {
        if (AFOLUData.length) {
            height2 = height1 / parseFloat(AFOLUData[0]["TotalAFOLUEmissionsMtCO2e"]) *
                Math.abs(parseFloat(AFOLUData[0]["TotalAFOLURemovalsMtCO2e2"]));
        }
    }, [AFOLUData]);

    const dataSourceChange = (e) => {
        setDataSource(e.target.value);
    }

    const yearChange = (e) => {
        setYear(e.target.value);
    }

    const countryChange = (e) => {
        setCountry(e.target.value);
    }

    const downloadData = () => {
        // exportToCSV();
        let fileName = new Date();
        fileName = fileName.getFullYear() + "-" + (fileName.getMonth() + 1) + "-" + fileName.getDate() + " " +
            fileName.getHours() + ":" + fileName.getMinutes() + ":" + fileName.getSeconds();
        exportToCSV(exportData, fileName);
    }

    return (
        <>
            {/* <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "600px" }}> */}
            <div className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-300 p-12">
                <div className="bg-gray-800 bg-opacity-30 rounded-xl p-5 grid items-center" style={{ minHeight: "600px" }}>
                    <div className="flex justify-between">
                        <div className="flex">
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label>
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" value={dataSource} onChange={dataSourceChange}>
                                    <option value={""}>Choose a Data Source</option>
                                    <option value={"US"}>United States</option>
                                    <option value={"CA"}>Canada</option>
                                    <option value={"FR"}>France</option>
                                    <option value={"DE"}>Germany</option>
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Country : </label>
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" value={country} onChange={countryChange}>
                                    <option className="text-gray-900" value={""}>Choose a country</option>
                                    <option className="text-gray-900" value={"China"}>China</option>
                                    <option className="text-gray-900" value={"United States"}>United States</option>
                                    <option className="text-gray-900" value={"Canada"}>Canada</option>
                                    <option className="text-gray-900" value={"France"}>France</option>
                                    <option className="text-gray-900" value={"Germany"}>Germany</option>
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Year : </label>
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" value={year} onChange={yearChange}>
                                    <option value={0}>Choose a year</option>
                                    <option value={1994}>1994</option>
                                    <option value={1998}>1998</option>
                                    <option value={2010}>2010</option>
                                    <option value={2012}>2012</option>
                                    <option value={2022}>2022</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center mx-2.5 float-right">
                            {/* <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300  shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button> */}
                            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5" onClick={downloadData}>Download Data</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-12" style={{ minHeight: "450px" }}>
                        <div className="bg-gray-900 col-span-4 bg-opacity-10 rounded-md text-gray-200 grid text-center items-center p-3 my-3">
                            <b>Some Text Here!</b>
                        </div>
                        <div className="grid col-span-5 mx-3 justify-self-stretch bg-gray-900 bg-opacity-10 rounded-md my-3">
                            {exportData.length ? <FC chartConfigs={chartConfigs}></FC> :
                                <>
                                    <div className="text-gray-200 grid text-center items-center p-3 my-3">
                                        <b>No Data to Display!</b>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="bg-gray-900 bg-opacity-10 rounded-md text-gray-200 grid text-center items-center p-3 col-span-3 grid-cols-2 my-3">
                            {AFOLUData.length ?
                                <>
                                    <div className="text-lg mt-3 pl-3 col-span-2 font-normal"><b><span className="font-bold">AFOLU</span> Sector</b></div>
                                    <div className="justify-self-stretch px-3 content-end" style={{ height: "200px" }}>
                                        <div className="text-sm mb-3 text-stone-700"><b>
                                            {AFOLUData[0]["TotalAFOLUEmissionsMtCO2e"]} MtCO2e
                                        </b></div>
                                        <div className="w-full" style={{ height: `${height1}px` }}>
                                            {
                                                AFOLUData.map((item, idx) => (
                                                    <>
                                                        {(parseFloat(item["AFOLUEmissionsMtCO2e"]) > 0) ?
                                                            <div key={"SourceOfEmissions1" + idx} className="grid items-center relative" style={{ height: `${parseFloat(item["AFOLUEmissionsMtCO2e"]) / parseFloat(item["TotalAFOLUEmissionsMtCO2e"]) * 100}%`, backgroundColor: `${consts.colors[idx]}` }}>
                                                                {(height1 * parseFloat(item["AFOLUEmissionsMtCO2e"]) / parseFloat(item["TotalAFOLUEmissionsMtCO2e"])).toFixed(2) > 20 ? <span className="text-stone-600">{parseFloat(item["AFOLUEmissionsMtCO2e"])}</span> : ""}
                                                            </div>
                                                            : <div key={"SourceOfEmissions2" + idx}></div>
                                                        }
                                                    </>
                                                ))
                                            }
                                        </div>
                                        <div className="text-md mt-3"><b>Source of Emissions</b></div>
                                    </div>


                                    <div className="justify-self-stretch px-3" style={{ height: "200px" }}>
                                        <div className="text-sm mb-3 text-stone-700"><b>
                                            {AFOLUData[0]["TotalAFOLURemovalsMtCO2e2"]} MtCO2e
                                        </b></div>

                                        <div className="w-full" style={{ height: `${height2}px` }}>
                                            {
                                                AFOLUData.map((item, idx) => (
                                                    <>
                                                        {(parseFloat(Math.abs(item["AFOLURemovalsMtCO2e"])) > 0) ?
                                                            <div key={"SinksForRemovals1" + idx} className="grid items-center relative" style={{ height: `${Math.abs(parseFloat(item["AFOLURemovalsMtCO2e"]) / parseFloat(item["TotalAFOLURemovalsMtCO2e2"]) * 100)}%`, backgroundColor: `${consts.colors[idx]}` }}>
                                                                {Math.abs((height1 * parseFloat(item["AFOLURemovalsMtCO2e"]) / parseFloat(item["TotalAFOLURemovalsMtCO2e2"])).toFixed(2)) > 20 ? <span className="text-stone-600">{parseFloat(item["AFOLURemovalsMtCO2e"])}</span> : ""}
                                                            </div>
                                                            : <div key={"SinksForRemovals2" + idx}></div>
                                                        }
                                                    </>
                                                ))
                                                // chartConfigs.dataSource.data.map((item, idx) => (
                                                //     <>
                                                //         <div key={idx} className="grid items-center relative" style={{ height: `${item["percentValue"]}%`, backgroundColor: `${item.color}` }}>
                                                //             {(height2 / 100 * parseFloat(item["percentValue"])).toFixed(2) > 20 ? <span>{(item.value).toFixed(2)}</span> : ""}
                                                //         </div>
                                                //     </>
                                                // ))
                                            }
                                        </div>
                                        <div className="text-md mt-3"><b>Sinks for removals</b></div>
                                    </div>
                                    <div className="text-left my-3 px-3">
                                        {
                                            AFOLUData.map((item, idx) => (
                                                <>
                                                    {(parseFloat(item["AFOLUEmissionsMtCO2e"]) > 0) ?
                                                        <div key={"right1" + idx} className="flex mt-2 items-center">
                                                            <div className="rounded-lg" style={{ minWidth: "15px", width: "15px", height: "15px", backgroundColor: `${consts.colors[idx]}` }}>
                                                            </div>
                                                            <p className="text-xs pl-2">{item["SubCategory"]}</p>
                                                        </div>
                                                        : <div key={"right2" + idx}></div>
                                                    }
                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="text-left my-3 px-3">
                                        {
                                            AFOLUData.map((item, idx) => (
                                                <>
                                                    {(parseFloat(item["AFOLURemovalsMtCO2e"]) != 0) ?
                                                        <div key={"left1" + idx} className="flex mt-2 items-center">
                                                            <div className="rounded-lg" style={{ minWidth: "15px", width: "15px", height: "15px", backgroundColor: `${consts.colors[idx]}` }}>
                                                            </div>
                                                            <p className="text-xs pl-2">{item["SubCategory"]}</p>
                                                        </div>
                                                        : <div key={"left2" + idx}></div>
                                                    }
                                                </>
                                            ))

                                            // chartConfigs.dataSource.data.map((item, idx) => (
                                            //     <div key={idx} className="flex mt-2 items-center">
                                            //         <div className="rounded-lg" style={{ minWidth: "15px", width: "15px", height: "15px", backgroundColor: `${item.color}` }}>
                                            //         </div>
                                            //         <div className="text-xs pl-2">{item.label}</div>
                                            //     </div>
                                            // ))
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <div className="text-gray-200 grid text-center items-center col-span-2 p-3 my-3">
                                        <b>No Data to Display!</b>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}