import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
const dataSrc = require("../consts/Data_EmissionReductionPotential.json");
const consts = require("../consts/consts");

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const defaultHeight = 400;

export default function EmissionRedcutionPotentialComponent() {

    const [country, setCountry] = useState(consts.COUNTRY_CHINA);
    const [mitigationOption, setMitigationOption] = useState(consts.MITIGATION_OPTION_RICE_CULTIVATION);
    const [unit, setUnit] = useState(consts.UNIT_TCH4_HA);
    const [exportData, setExportData] = useState([]);

    const [chartConfigs, setChartConfigs] = useState({
        type: "scatter",
        width: "99%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",

        dataSource: {
            chart: {
                caption: consts.CAPTION_TEXT_EMISSION_REDUCTION_POTENTIAL,
                captionFontColor: "#113458",
                divLineColor: "#113458",
                xAxisNameFontColor: "#113458",
                xAxisValueFontColor: "#113458",

                yAxisNameFontColor: "#113458",
                yAxisValueFontColor: "#113458",
                legendItemFontColor: "#113458",
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
                labelFontColor: "#113458",
                // caption: "???",
                // subcaption: "Los Angeles Topanga",
                // xaxisname: "Avg Day Temperature",
                yaxisname: consts.UNIT_TCH4_HA,

                plotHighlightEffect: "fadeout|borderColor=ff0000, borderAlpha=50",
                interactiveLegend: 0,
                drawCustomLegendIcon: 1,
                legendIconSides: 3, legendIconStartAngle: 150,
                // xaxisminvalue: "23",
                // xaxismaxvalue: "95",
                ynumberprefix: "",
                // yaxisminvalue: "1200",
                xnumbersuffix: "",
                theme: "fusion",
                plottooltext:
                    "$seriesname : <b>$yDataValue</b>"
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

    const generateChartData = () => {
        let data = dataSrc.filter((ele) => {
            return (ele["Country"] === country && ele["Unit"] === unit && ele["MitigationOption"] === mitigationOption);
        });
        let xLabels = new Map();
        let categoryData = [];      // x Axis Label Array
        let key = 1;
        data.map((item) => {
            if (item["DataSource"] === consts.DATA_SOURCE_FAO || item["DataSource"] === consts.DATA_SOURCE_IPCC) {
                if (!xLabels.has(item["DataSource"])) {
                    xLabels.set(item["DataSource"], key);
                    categoryData.push({ x: (key * 20).toString(), label: item["DataSource"] });
                }
            } else {
                if (!xLabels.has(item["System"])) {
                    xLabels.set(item["System"], key);
                    categoryData.push({ x: (key * 20).toString(), label: item["System"] });
                }
            }
            key++;
        });

        let dataArrForMax = [];
        let dataArrForMin = [];
        let dataArrForMedian = [];
        let dataArrForAverage = [];

        data.map((ele) => {
            if (ele["DataSource"] === consts.DATA_SOURCE_FAO || ele["DataSource"] === consts.DATA_SOURCE_IPCC) {
                let xValue = categoryData.find((e) => {
                    return e["label"] == ele["DataSource"];
                })["x"];
                dataArrForMedian.push({ x: xValue, y: ele["Median"] });
            } else {
                let xValue = categoryData.find((e) => {
                    return e["label"] == ele["System"];
                })["x"];
                if (ele["Max"]) {
                    dataArrForMax.push({ x: xValue, y: ele["Max"] });
                }
                if (ele["Min"]) {
                    dataArrForMin.push({ x: xValue, y: ele["Min"] });
                }
                if (ele["Median"]) {
                    dataArrForMedian.push({ x: xValue, y: ele["Median"] });
                }
                if (ele["Average"]) {
                    dataArrForAverage.push({ x: xValue, y: ele["Average"] });
                }
            }
        });

        setChartConfigs({
            ...chartConfigs, dataSource: {
                ...chartConfigs.dataSource,
                categories: [{ category: categoryData }],
                dataset: [
                    { seriesname: "Max", anchorbgcolor: consts.colors[0], data: dataArrForMax, anchorstartangle: 270, anchorsides: 3, anchorradius: 8, drawcustomlegendicon: 1, legendiconsides: 3, legendiconstartangle: 15},
                    { seriesname: "Min", anchorbgcolor: consts.colors[1], data: dataArrForMin, anchorsides: 3, anchorradius: 8},
                    { seriesname: "Average", anchorbgcolor: consts.colors[3], data: dataArrForAverage, anchorsides: 2, anchorradius: 6},
                    { seriesname: "Median", anchorbgcolor: consts.colors[2], data: dataArrForMedian, anchorsides: 4, anchorradius: 5}
                ]
            }
        });

        // setChartConfigs(prev => {
        //     return {
        //         ...prev,
        //         dataSource:
        //         {
        //             ...prev.dataSource,
        //             categories: [{ category: categoryData }],
        //             dataset: [
        //                 { seriesname: "Max", anchorbgcolor: consts.colors[0], data: dataArrForMax },
        //                 { seriesname: "Min", anchorbgcolor: consts.colors[1], data: dataArrForMin },
        //                 { seriesname: "Median", anchorbgcolor: consts.colors[2], data: dataArrForMedian },
        //                 { seriesname: "Average", anchorbgcolor: consts.colors[3], data: dataArrForAverage }
        //             ]
        //         }
        //     };
        // }
        // )
    }

    useEffect(() => {
        generateChartData();
    }, []);

    useEffect(() => {
        generateChartData();
    }, [country, mitigationOption, unit]);

    useEffect(() => {
        // generateChartData();
    }, [chartConfigs]);

    useEffect(() => {
        // setChartConfigs(
        //     {
        //         ...chartConfigs, dataSource: {
        //             ...chartConfigs.dataSource,
        //             chart: {
        //                 ...chartConfigs.dataSource.chart,
        //                 yaxisname: unit
        //             }
        //         }
        //     }
        // )
        setChartConfigs(prev => {
            return {
                ...prev,
                dataSource:
                {
                    ...prev.dataSource,
                    chart: {
                        ...prev.dataSource.chart,
                        yaxisname: unit
                    }
                }
            };
        }
        )
    }, [unit]);

    const unitChange = (e) => {
        setUnit(e.target.value);
    }

    const mitigationOptionChange = (e) => {
        setMitigationOption(e.target.value);
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
            <div className="py-2 px-8">
                {/* <div className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-300 p-12"> */}
                <div className="grid grid-cols-6 bg-gray-800 bg-opacity-10 rounded-xl py-3 px-3 sm:px-5 mt-12 items-center justify-center">
                    <div className="hidden xs:block col-span-6 lg:col-span-4 lg:col-start-3">

                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="flex items-center ml-2.5 sm:mx-2.5">
                                    {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-[#113458]">Country : </label> */}
                                    <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={countryChange} value={country}>
                                        {/* <option className="text-[#113458]" value={""}>Country</option> */}
                                        {
                                            consts.COUNTRY_LIST.map((countryItem, idx) => (
                                                <option className="text-[#113458]" key={"country_list" + idx} value={countryItem}>{countryItem}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex items-center ml-2.5 sm:mx-2.5">
                                    {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-[#113458]">Year : </label> */}
                                    <select id="mitigationOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={mitigationOptionChange} value={mitigationOption}>
                                        {/* <option className="text-[#113458]" value={""}>Mitigation.Option</option> */}
                                        {
                                            consts.MITIGATION_OPTION_LIST.map((optionItem, idx) => (
                                                <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="flex items-center ml-2.5 sm:mx-2.5">
                                    {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-[#113458]">Data Source : </label> */}
                                    <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={unitChange} value={unit}>
                                        {/* <option className="text-[#113458]" value={""}>Unit</option> */}
                                        {
                                            consts.UNIT_LIST.map((unitItem, idx) => (
                                                <option className="text-[#113458]" key={"unit_list" + idx} value={unitItem}>{unitItem}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center ml-2.5 sm:mx-2.5">
                                <button type="button" className="text-[#113458] bg-[#f4cc13] hover:text-white focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center" onClick={downloadData}>
                                    <span className="hidden sm:block">Download Data</span>
                                    <span className="sm:hidden">
                                        <ArrowDownTrayIcon
                                            className="h-5 w-5 text-[#113458] hover:text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-6 md:col-span-2 bg-[#113458] bg-opacity-10 rounded-md text-[#113458] text-center items-center p-3 my-3" style={{ minHeight: `${400}px` }}>
                        <b>Some Text Here!</b>
                    </div>
                    <div className="col-span-6 md:col-span-4">
                        <div className="grid" style={{ minHeight: `${400}px` }}>
                            <FC chartConfigs={chartConfigs}></FC>
                        </div>

                    </div>

                </div>
                {/* </div> */}
            </div>
        </>
    )
}


const dataSource2 = {
    "chart": {
        "caption": "Inventory status - Bakersfield Central",
        "subCaption": "Top 5 Food items",
        "xAxisName": "Food Item",
        "yAxisName": "No. of Units",
        "theme": "fusion",
        "legendiconsides": "3",
        "legendIconstartangle": 150,
    },
    "categories": [
        {
            "category": [
                {
                    "label": "Poultry"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Available Stock",
            "allowDrag": "0",
            "data": [
                {
                    "value": "6000"
                },
            ]
        },
        {
            "seriesname": "Estimated Demand",
            "dashed": "1",
            "data": [
                {
                    "value": "19000"
                },
            ]
        }
    ]
};

const dataSource1 = {
    chart: {
        "caption": "Inventory status - Bakersfield Central",
        "subCaption": "Top 5 Food items",
        "xAxisName": "Food Item",
        "yAxisName": "No. of Units",
        "theme": "fusion",
        "legendiconsides": "3",
        "legendIconstartangle": 150,
        //   "legendIconBgColor": "#ff0000",
        //   "legendIconAlpha": "50",
        //   "legendIconBgAlpha": "30",
        //   "legendIconBorderColor": "#123456",
        //   "legendIconBorderThickness": "3",
        plottooltext:
            "<b>$yDataValue</b> worth <b>$seriesNames</b> were sold,<br>when temperature was <b>$xdataValue</b>"
    },
    categories: [
        {
            category: [
                {
                    x: "10",
                    label: "Label1"
                },
                {
                    x: "23",
                    label: "Label2"
                }
            ]
        }
    ],
    dataset: [
        {
            seriesname: "Ice Cream",
            anchorbgcolor: "#333333",
            data: [
                {
                    x: "23",
                    y: "1560",
                },
                {
                    x: "24",
                    y: "1500"
                }
            ]
        },
        {
            seriesname: "Beer",
            anchorbgcolor: "#29C3BE",
            data: [
                {
                    x: "23",
                    y: "3160"
                },
                {
                    x: "24",
                    y: "3000"
                }
            ]
        }
    ]
};

const chartConfigs1 = {
    type: "scatter",
    width: "90%",
    height: "90%",
    dataFormat: "JSON",
    containerBackgroundOpacity: "80",
    dataSource: dataSource1
};

const chartConfigs2 = {
    type: "mscolumn2d",
    width: "100%",
    height: "100%",
    dataFormat: "JSON",
    containerBackgroundOpacity: "0",
    dataSource: dataSource2
};