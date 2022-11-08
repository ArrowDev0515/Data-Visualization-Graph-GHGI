import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const consts = require("../consts/consts");
const dataSrc = require("../consts/Data_TradeoffSynergies.json");

export default function ImpactsAndSynergiesComponent() {
    const [country, setCountry] = useState(consts.COUNTRY_CHINA);
    const [mitigationOption, setMitigationOption] = useState(consts.MITIGATION_OPTION_RICE_FALLOW);
    const [unit, setUnit] = useState(consts.UNIT_TCH4_HA);
    const [inout, setInOut] = useState(consts.IN_OUT_OPTION_INPUT);
    const [exportData, setExportData] = useState([]);

    const [chartConfigs, setChartConfigs] = useState({
        type: "scatter",
        width: "100%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",
        dataSource: {
            chart: {
                caption: consts.CAPTION_TEXT_EMISSION_REDUCTION_POTENTIAL,
                captionFontColor: "#ffffff",
                xAxisNameFontColor: "#ddd",
                // xAxisPosition : "top",
                xAxisValueFontColor: "#ddd",

                yAxisNameFontColor: "#ddd",
                yAxisValueFontColor: "#ddd",
                yAxisName : "Gradient",
                xAxisPosition : "right",
                legendItemFontColor: "#ffffff",
                // regressionLineThickness: 30,
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
                // caption: "???",
                // subcaption: "Los Angeles Topanga",
                // xaxisname: "Avg Day Temperature",
                // xaxisminvalue: "23",
                // xaxismaxvalue: "95",
                ynumberprefix: "",
                // yaxisminvalue: "1200",
                xnumbersuffix: "",
                theme: "fusion",
                legendIconSides: 5,
                
                plottooltext:
                    "Gradient Value : <b>$yDataValue</b>"
            },
            categories: [
                {
                    category: []
                }
            ],
            dataset: [
                {
                    seriesname: "",
                    anchorbgcolor: "",
                    data: []
                },
                {
                    seriesname: "",
                    anchorbgcolor: "",
                    data: []
                }
            ]
        }
    });

    useEffect(() => {
    });

    useEffect(() => {
        generateChartData();
    }, [country, unit, inout, mitigationOption]);

    const generateChartData = () => {
        //Filter Data with Select
        let data = dataSrc.filter((ele) => {
            return (ele["Country"] === country && ele["Unit"] === unit && ele["Input_Output"] === inout && ele["MitigationOption"] === mitigationOption);
        });
        setExportData(data);

        let xLabels = new Map();
        let categoryData = [];      // x Axis Label Array
        let key = 1;
        
        data.map((item) => {
            if (!xLabels.has(item["Input_OutputName"])) {
                xLabels.set(item["Input_OutputName"], key);
                categoryData.push({ x: key.toString(), label: item["Input_OutputName"] });
            }
            key++;
        });

        let dataArr = [];

        data.map((ele) => {
            let xValue = categoryData.find((e) => {
                return e["label"] == ele["Input_OutputName"];
            })["x"];
            dataArr.push({ x: xValue, y: ele["Gradient"] });
        });

        setChartConfigs({
            ...chartConfigs, dataSource: {
                ...chartConfigs.dataSource,
                categories: [{ category: categoryData }],
                dataset: [
                    { seriesname: "", anchorbgcolor: consts.colors[0], data: dataArr, anchorsides: 2, anchorradius: 5 },
                ]
            }
        });
    }

    const unitChange = (e) => {
        setUnit(e.target.value);
    }

    const mitigationOptionChange = (e) => {
        setMitigationOption(e.target.value);
    }

    const inoutChange = (e) => {
        setInOut(e.target.value);
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
            <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minheight: "600px" }}>
                <div className="grid grid-cols-6 bg-gray-800 bg-opacity-40 rounded-xl p-5 m-12 items-center justify-center">
                    <div className="col-span-6 flex justify-between">
                        <label htmlFor="countries" className="flex px-5 text-lg font-medium text-gray-200">Mitigation Name </label>
                        <div className="flex">

                            <div className="flex items-center mx-2.5">
                                {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Country : </label> */}
                                <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" onChange={countryChange} value={country}>
                                    {/* <option className="text-gray-900" value={""}>Country</option> */}
                                    {
                                            consts.COUNTRY_LIST.map((countryItem, idx) => (
                                                <option className="text-gray-900" key={"country_list" + idx} value={countryItem}>{countryItem}</option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label> */}
                                <select id="units" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" onChange={unitChange} value={unit}>
                                    {/* <option className="text-gray-900" value={""}>Unit</option> */}
                                    {
                                            consts.UNIT_LIST.map((unitItem, idx) => (
                                                <option className="text-gray-900" key={"unit_list" + idx} value={unitItem}>{unitItem}</option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label> */}
                                <select id="inouts" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" onChange={inoutChange} value={inout}>
                                    {/* <option className="text-gray-900" value={""}>Input_Output</option> */}
                                    {
                                            consts.IN_OUT_OPTION_LIST.map((item, idx) => (
                                                <option className="text-gray-900" key={"unit_list" + idx} value={item}>{item}</option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="flex items-center mx-2.5">
                                {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Year : </label> */}
                                <select id="mitigationOptions" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" onChange={mitigationOptionChange} value={mitigationOption}>
                                    {/* <option className="text-gray-900" value={""}>Mitigation.Option</option> */}
                                    {
                                            consts.MITIGATION_OPTION_LIST2.map((optionItem, idx) => (
                                                <option className="text-gray-900" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                                            ))
                                        }
                                </select>
                            </div>

                            {/* <div className="flex items-center mx-2.5">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200">Data Source : </label>
                                    <select id="countries" className="bg-gray-900 bg-opacity-20 border border-gray-200 text-gray-200 text-sm rounded-lg focus:text-gray-900 focus:border-gray-900 focus-visible:outline-none block p-2.5 ml-2.5" defaultValue="">
                                        <option className="text-gray-900" value={""}>AR</option>
                                        <option className="text-gray-900" value={"US"}>Option 1</option>
                                        <option className="text-gray-900" value={"CA"}>Option 2</option>
                                        <option className="text-gray-900" value={"FR"}>Option 3</option>
                                    </select>
                                </div> */}
                        </div>
                        <div className="flex items-center mx-2.5 float-right">
                            {/* <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300  shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 ml-2.5 text-center">Download Data</button> */}
                            {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5">Download Data</button> */}
                            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2.5" onClick={downloadData}>Download Data</button>
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