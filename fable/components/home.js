import { useEffect, useState } from "react";
import { sampleData } from "../consts/consts";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import ReactFusioncharts from "react-fusioncharts";
import dynamic from "next/dynamic.js";
import { data } from "autoprefixer";
import { exportToCSV } from "../utils/exportCSV";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
const dataSrc = require("../consts/Data_Home.json");
const consts = require("../consts/consts");

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });


export default function HomeComponent() {

    const [AFOLUData, setAFOLUData] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [height1, setHeight1] = useState(120);
    const [height2, setHeight2] = useState(150);

    const [dataSource, setDataSource] = useState(consts.DATA_SOURCE_UNFCCC);
    const [country, setCountry] = useState(consts.COUNTRY_CHINA);
    const [year, setYear] = useState(1994);

    // const [chartConfigs, setChartConfigs] = useState([]);
    const [chartConfigs, setChartConfigs] = useState({
        type: "doughnut2d",
        width: "99%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",
        dataSource: {
            chart: {
                caption: "",
                captionFontColor: "#113458",
                loadMessageColor: "#ff0000",
                divLineColor: "#113458",
                chartTopMargin: "30",
                // captionFontSize: "18",

                // subCaption: "In MMbbl = One Million barrels",
                subCaptionFontColor: "113458",
                subCaptionFontSize: "20",

                bgColor: "#000000",
                bgAlpha: "0",

                // baseFontSize: "18",
                // baseFontColor: "#ff0000",

                // defaultcenterlabelColor: "113458",

                labelFontSize: "12",
                labelFontColor: "113458",

                smartLineColor: "#113458",
                legendItemFontColor: "#113458",
                labelDistance: 10,
                // plotBorderColor: "#113458",
                // centerlabel: "# Users: $value",
                // showpercentvalues: "0",
                // useDataPlotColorForLabels: "1",
                legendCaptionFontColor: "#ff0000",
                defaultcenterlabel: "",
                defaultcenterlabelColor: "#113458",
                tooltipBorderRadius: "10",
                plottooltext: `<b>$percentValue</b> is for <b>$label</b>`,
                // toolTipColor: "#ffff00",
                // plotFillHoverColor:"ff0000",
                //   valuePosition: "inside",
                //   labelPosition: "inside",
                //   minAngleForValue: "15",
                link: "#ff0000",
                // labelBorderColor: "#00ffaa",
                showLegend: "0",
                // usePattern: "1",
                // radius3D: 100,
                startingAngle: "30",
                // use3DLighting: "1",
                // showShadow: "1",
                enableSlicing: "0",
                "styleDefinition": {
                    "txt-red": {
                        "fill": "red"
                    }
                },
                "caption": {
                    "text": "Online Sales",
                    "style": {
                        "text": "txt-red"
                    }
                },
                theme: "fusion"
            },
            data: []
        }
    });

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
        let subCaptionStr = "No Data to Display";
        data.forEach((item) => {
            let tmpItem = new Object();
            tmpItem["label"] = item["Category"];
            tmpItem["value"] = parseFloat(item["EmissionCategoryMtCO2e"]);
            tmpItem["percentValue"] = (parseFloat(item["EmissionCategoryMtCO2e"]) / parseFloat(item["TotalEmissionsMtCO2e"]) * 100).toFixed(2);
            // tmpItem["color"] = consts.colors[i];
            if (!set.has(item["Category"])) {
                set.add(item["Category"]);
                arr.push(tmpItem);
            }
            i++;
        })
        let captionStr = `${country}'s Total GHG emissions in ${year}`
        if (data.length > 0) {
            subCaptionStr = data[0]["TotalEmissionsMtCO2e"].toString() + `Mt CO<sub>2</sub>e`;
        }
        setChartConfigs({
            ...chartConfigs, dataSource: {
                ...chartConfigs.dataSource,
                data: arr,
                chart: { ...chartConfigs.dataSource.chart, caption: captionStr, subCaption: subCaptionStr }
            }
        });
    }

    useEffect(() => {
        if (AFOLUData.length) {
            setHeight2(height1 / parseFloat(AFOLUData[0]["TotalAFOLUEmissionsMtCO2e"]) *
                Math.abs(parseFloat(AFOLUData[0]["TotalAFOLURemovalsMtCO2e2"])));
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
            {/* <div className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-300 p-12"> */}
            <div className="py-2 px-8">
                <div className="bg-[#113458] bg-opacity-10 rounded-xl py-3 px-5 grid items-center" >
                    <div className="flex justify-between">
                        <div className="flex">
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="hidden md:block text-sm font-medium text-[#113458] mr-2.5">Data Source : </label>
                                <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" value={dataSource} onChange={dataSourceChange}>
                                    {/* <option value={""}>Choose a Data Source</option> */}
                                    {
                                        consts.DATA_SOURCE_LIST.map((dataSrcItem, idx) => (
                                            <option className="text-[#113458]" key={"dataSrc_option" + idx} value={dataSrcItem}>{dataSrcItem}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="hidden md:block text-sm font-medium text-[#113458] mr-2.5">Country : </label>
                                <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" value={country} onChange={countryChange}>
                                    {/* <option className="text-[#113458]" value={""}>Choose a country</option> */}
                                    {
                                        consts.COUNTRY_LIST.map((countryItem, idx) => (
                                            <option className="text-[#113458]" key={"country_option" + idx} value={countryItem}>{countryItem}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                <label htmlFor="countries" className="hidden md:block text-sm font-medium text-[#113458] mr-2.5">Year : </label>
                                <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" value={year} onChange={yearChange}>
                                    {/* <option value={0}>Choose a year</option> */}
                                    {
                                        consts.YEAR_LIST.map((item, idx) => (
                                            <option className="text-[#113458]" key={"year_option" + idx} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center mx-2.5">
                            <button type="button" className="text-[#113458] bg-[#f4cc13] hover:text-white focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center" onClick={downloadData}>
                                <span className="hidden sm:block">Download Data</span>
                                <span className="sm:hidden">
                                    <ArrowDownTrayIcon
                                        className="h-5 w-5 text-[#113458] hover:text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </button>
                            {/* <button type="button" className="text-[#113458] bg-gradient-to-r from-[#fffe25] to-[#f4cc13] hover:bg-gradient-to-l shadow-lg shadow-yellow-500/50 focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5" onClick={downloadData}>Download Data</button> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-12" style={{ minHeight: "400px" }}>
                        <div className="grid col-span-12 lg:col-span-4 bg-[#113458] bg-opacity-10 rounded-md text-[#113458] text-center items-center p-3 my-3">
                            <b>Some Text Here!</b>
                        </div>
                        <div className="grid col-span-12 md:col-span-6 lg:col-span-5 md:mr-3 lg:mx-3 bg-[#113458] bg-opacity-10 rounded-md my-3" style={{ minHeight: "400px" }}>
                            {exportData.length ? <FC chartConfigs={chartConfigs}></FC> :
                                <>
                                    <div className="text-[#113458] grid text-center items-center p-3 my-3">
                                        <b>No Data to Display!</b>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-3 grid grid-cols-2 bg-[#113458] bg-opacity-10 rounded-md text-[#113458] text-center p-3 my-3">
                            {AFOLUData.length ?
                                <>
                                    {AFOLUData[0]["TotalAFOLUEmissionsMtCO2e"] > 0 ?
                                        <>
                                            <div className="text-lg mt-3 pl-3 col-span-2 font-normal"><b><span className="font-bold">AFOLU</span> Sector</b></div>
                                            <div className="px-3 col-span-2 xs:col-span-1" style={{ minHeight: "200px" }}>
                                                <div className="text-xs mb-3 text-[#113458]"><b>
                                                    {AFOLUData[0]["TotalAFOLUEmissionsMtCO2e"]} Mt CO<sub>2</sub>e
                                                </b></div>
                                                <div className="w-auto" style={{ height: `${height1}px` }}>
                                                    {
                                                        AFOLUData.map((item, idx) => (
                                                            <span key={"SourceOfEmissions" + idx}>
                                                                {(parseFloat(item["AFOLUEmissionsMtCO2e"]) > 0) ?
                                                                    <div className="grid items-center relative" style={{ height: `${parseFloat(item["AFOLUEmissionsMtCO2e"]) / parseFloat(item["TotalAFOLUEmissionsMtCO2e"]) * 100}%`, backgroundColor: `${consts.colors[idx]}` }}>
                                                                        {(height1 * parseFloat(item["AFOLUEmissionsMtCO2e"]) / parseFloat(item["TotalAFOLUEmissionsMtCO2e"])).toFixed(2) > 20 ? <span className="text-[#113458]">{parseFloat(item["AFOLUEmissionsMtCO2e"])}</span> : ""}
                                                                    </div>
                                                                    : ""
                                                                }
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                                <div className="text-md mt-3"><b>Source of Emissions</b></div>
                                            </div>

                                            <div className="px-3 col-span-2 xs:col-span-1" style={{ minHeight: "200px" }}>
                                                <div className="text-xs mb-3 text-[#113458]"><b>
                                                    {AFOLUData[0]["TotalAFOLURemovalsMtCO2e2"]} Mt CO<sub>2</sub>e
                                                </b></div>
                                                <div className="w-full" style={{ height: `${height2}px` }}>
                                                    {
                                                        AFOLUData.map((item, idx) => (
                                                            <span key={"SinksForRemovals" + idx}>
                                                                {(parseFloat(Math.abs(item["AFOLURemovalsMtCO2e"])) > 0) ?
                                                                    <div className="grid items-center relative" style={{ height: `${parseFloat(item["TotalAFOLURemovalsMtCO2e2"]) ? Math.abs(parseFloat(item["AFOLURemovalsMtCO2e"]) / parseFloat(item["TotalAFOLURemovalsMtCO2e2"]) * 100) : 0}%`, backgroundColor: `${consts.colors[idx]}` }}>
                                                                        {Math.abs((height1 * parseFloat(item["AFOLURemovalsMtCO2e"]) / parseFloat(item["TotalAFOLURemovalsMtCO2e2"])).toFixed(2)) > 20 ? <span className="text-[#113458]">{parseFloat(item["AFOLURemovalsMtCO2e"])}</span> : "No Data"}
                                                                    </div>
                                                                    : ""
                                                                }
                                                            </span>
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
                                                <div className="w-full bg-opacity-10" style={{ backgroundImage: "url(../)", height: `${height1 - height2}px` }}></div>
                                                <div className="text-md mt-3"><b>Sinks for removals</b></div>
                                            </div>
                                            <div className="text-left my-3 px-3">
                                                {
                                                    AFOLUData.map((item, idx) => (
                                                        <div key={"right_" + idx}>
                                                            {(parseFloat(item["AFOLUEmissionsMtCO2e"]) > 0) ?
                                                                <div key={"right1" + idx} className="flex mt-2 items-center">
                                                                    <div className="rounded-lg" style={{ minWidth: "15px", width: "15px", height: "15px", backgroundColor: `${consts.colors[idx]}` }}>
                                                                    </div>
                                                                    <p className="text-xs pl-2">{item["SubCategory"]}</p>
                                                                </div>
                                                                : ""
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="text-left my-3 px-3">
                                                {
                                                    AFOLUData.map((item, idx) => (
                                                        <div key={"left" + idx}>
                                                            {(parseFloat(item["AFOLURemovalsMtCO2e"]) != 0) ?
                                                                <div className="flex mt-2 items-center">
                                                                    <div className="rounded-lg" style={{ minWidth: "15px", width: "15px", height: "15px", backgroundColor: `${consts.colors[idx]}` }}>
                                                                    </div>
                                                                    <p className="text-xs pl-2">{item["SubCategory"]}</p>
                                                                </div>
                                                                : ""
                                                            }
                                                        </div>
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
                                        </> :
                                        <>
                                            <div className="text-lg mt-3 pl-3 col-span-2 font-normal"><b>No AFOLU Data</b></div>
                                        </>
                                    }
                                </>
                                :
                                <>
                                    <div className="text-[#113458] grid text-center items-center col-span-2 p-3 my-3">
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