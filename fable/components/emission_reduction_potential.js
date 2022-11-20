import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
const dataSrc = require("../consts/Data_EmissionReductionPotential.json");
const consts = require("../consts/consts");

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const defaultHeight = 400;

const EmissionRedcutionPotentialComponent = ({ country }) => {

    // const [country, setCountry] = useState(consts.COUNTRY_CHINA);
    const [mitigationOption, setMitigationOption] = useState(consts.MITIGATION_OPTION_RICE_CULTIVATION);
    const [unit, setUnit] = useState(consts.UNIT_TCH4_HA);
    const [exportData, setExportData] = useState([]);

    const [yMax, setYMax] = useState(0);
    const [chartConfigs1, setChartConfigs1] = useState({
        type: "scatter",
        width: "99%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",

        dataSource: {
            chart: {
                caption: " ",
                captionFontColor: "#113458",
                divLineColor: "#113458",
                xAxisNameFontColor: "#113458",
                xAxisValueFontColor: "#113458",
                yAxisNameFontColor: "#113458",
                yAxisValueFontColor: "#113458",
                legendItemFontColor: "#113458",
                bgColor: "#000000",
                bgAlpha: "0",
                labelFontSize: "12",
                labelFontColor: "#113458",
                yaxisname: consts.UNIT_TCH4_HA,
                plotHighlightEffect: "fadeout|borderColor=ff0000, borderAlpha=50",
                interactiveLegend: 0,
                ynumberprefix: "",
                xnumbersuffix: "",
                theme: "fusion",
                drawCustomLegend: "1",
                // yAxisMinValue: "0",
                numDivLines: "4",
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

    const [chartConfigs2, setChartConfigs2] = useState({
        type: "scatter",
        width: "99%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",

        dataSource: {
            numDivLines: "4",
            chart: {
                caption: consts.CAPTION_TEXT_EMISSION_REDUCTION_POTENTIAL,
                captionFontColor: "#113458",
                divLineColor: "#113458",
                xAxisNameFontColor: "#ff0000",
                xAxisValueFontColor: "#113458",
                xAxisNameFontSize: 8,
                xAxisValueFontSize: 8,
                yAxisNameFontColor: "#113458",
                yAxisValueFontColor: "#113458",
                legendItemFontColor: "#113458",
                bgColor: "#000000",
                bgAlpha: "0",
                labelFontSize: "12",
                labelFontColor: "#113458",
                yaxisname: consts.UNIT_TCH4_HA,
                plotHighlightEffect: "fadeout|borderColor=ff0000, borderAlpha=50",
                interactiveLegend: 0,
                ynumberprefix: "",
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
        setExportData(data);

        let xLabels1 = new Map();
        let xLabels2 = new Map();
        let categoryData1 = [];      // x Axis Label Array
        let categoryData2 = [];      // x Axis Label Array
        let key1 = 1;
        let key2 = 1;
        categoryData1.push({ x: (key1 * 20).toString(), label: "" });
        data.map((item) => {
            if (item["DataSource"] === consts.DATA_SOURCE_FAO || item["DataSource"] === consts.DATA_SOURCE_IPCC) {
                if (!xLabels1.has(item["DataSource"])) {
                    key1++;
                    xLabels1.set(item["DataSource"], key1);
                    categoryData1.push({ x: (key1 * 20).toString(), label: item["DataSource"] });
                }
            } else {
                if (!xLabels2.has(item["System"])) {
                    xLabels2.set(item["System"], key2);
                    categoryData2.push({ x: (key2 * 20).toString(), label: item["System"] });
                    key2++;
                }
            }
        });
        key1++;
        categoryData1.push({ x: (key1 * 20).toString(), label: "" });

        let dataArrForMax = [];
        let dataArrForMin = [];
        let dataArrForMedian1 = [];
        let dataArrForMedian2 = [];
        let dataArrForAverage = [];

        data.map((ele) => {
            if (ele["DataSource"] === consts.DATA_SOURCE_FAO || ele["DataSource"] === consts.DATA_SOURCE_IPCC) {
                let xValue = categoryData1.find((e) => {
                    return e["label"] == ele["DataSource"];
                })["x"];
                dataArrForMedian1.push({ x: xValue, y: ele["Median"] });
                if (ele["Median"] > yMax) {
                    yMax = ele["Median"];
                }
            } else {
                let xValue = categoryData2.find((e) => {
                    return e["label"] == ele["System"];
                })["x"];
                if (ele["Max"]) {
                    dataArrForMax.push({ x: xValue, y: ele["Max"] });
                    if (ele["Max"] > yMax) {
                        yMax = ele["Max"];
                    }
                }
                if (ele["Min"]) {
                    dataArrForMin.push({ x: xValue, y: ele["Min"] });
                    if (ele["Min"] > yMax) {
                        yMax = ele["Min"];
                    }
                }
                if (ele["Median"]) {
                    dataArrForMedian2.push({ x: xValue, y: ele["Median"] });
                    if (ele["Median"] > yMax) {
                        yMax = ele["Median"];
                    }
                }
                if (ele["Average"]) {
                    dataArrForAverage.push({ x: xValue, y: ele["Average"] });
                    if (ele["Average"] > yMax) {
                        yMax = ele["Average"];
                    }
                }
            }
        });

        setChartConfigs1({
            ...chartConfigs1, dataSource: {
                ...chartConfigs1.dataSource,
                chart: {
                    ...chartConfigs1.dataSource.chart,
                    yAxisMaxValue: yMax
                },
                categories: [{ category: categoryData1 }],
                dataset: [
                    { seriesname: "Median", anchorbgcolor: consts.colors[2], data: dataArrForMedian1, anchorsides: 4, anchorradius: 5 }
                ],
            }
        });

        setChartConfigs2({
            ...chartConfigs2, dataSource: {
                ...chartConfigs2.dataSource,
                chart: {
                    ...chartConfigs2.dataSource.chart,
                    yAxisMaxValue: yMax
                },
                categories: [{ category: categoryData2 }],
                dataset: [
                    { seriesname: "Max", anchorbgcolor: consts.colors[0], data: dataArrForMax, anchorstartangle: 270, anchorsides: 3, anchorradius: 8 },
                    { seriesname: "Min", anchorbgcolor: consts.colors[1], data: dataArrForMin, anchorsides: 3, anchorradius: 8 },
                    { seriesname: "Average", anchorbgcolor: consts.colors[3], data: dataArrForAverage, anchorsides: 2, anchorradius: 6 },
                    { seriesname: "Median", anchorbgcolor: consts.colors[2], data: dataArrForMedian2, anchorsides: 4, anchorradius: 5 }
                ],
            }
        });
    }

    useEffect(() => {
        generateChartData();
    }, []);

    useEffect(() => {
        generateChartData();
    }, [country, mitigationOption, unit]);

    useEffect(() => {
        setChartConfigs1(prev => {
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
        });

        setChartConfigs2(prev => {
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
        })
    }, [unit]);

    const unitChange = (e) => {
        setUnit(e.target.value);
    }

    const mitigationOptionChange = (e) => {
        setMitigationOption(e.target.value);
    }

    const downloadData = () => {
        let fileName = new Date();
        fileName = fileName.getFullYear() + "-" + (fileName.getMonth() + 1) + "-" + fileName.getDate() + " " +
            fileName.getHours() + ":" + fileName.getMinutes() + ":" + fileName.getSeconds();
        exportToCSV(exportData, fileName);
    }

    return (
        <>
            <div className="mt-10 px-5 py-3">
                <label htmlFor="countries" className="text-lg font-medium text-[#113458]">
                    Mitigation potential per AFOLU sector
                </label>
            </div>
            {/* <div className="grid grid-cols-6 bg-gray-800 bg-opacity-10 rounded-xl py-3 px-3 sm:px-5 mt-12 items-center justify-center"> */}
            <div className="grid grid-cols-12 rounded-xl px-3 sm:px-5 items-center justify-center">
                <div className="flex items-center col-span-12 ml-2.5 mb-2.5">
                    <label htmlFor="countries" className="text-xs sm:text-sm font-medium text-[#113458] mr-2.5">AFOLU Sector: </label>
                    <select id="mitigationOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={mitigationOptionChange} value={mitigationOption}>
                        {
                            consts.MITIGATION_OPTION_LIST.map((optionItem, idx) => (
                                <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="hidden xs:block col-span-12">
                    <div className="flex justify-between">
                        <div className="flex">
                            {/* <div className="flex items-center ml-2.5 sm:mx-2.5">
                                <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={countryChange} value={country}>
                                    {
                                        consts.COUNTRY_LIST.map((countryItem, idx) => (
                                            <option className="text-[#113458]" key={"country_list" + idx} value={countryItem}>{countryItem}</option>
                                        ))
                                    }
                                </select>
                            </div> */}
                            <div className="flex items-center ml-2.5">
                                <label htmlFor="countries" className="text-xs sm:text-sm font-medium text-[#113458] mr-2.5">Farming System: </label>
                                <select id="mitigationOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={mitigationOptionChange} value={mitigationOption}>
                                    {
                                        consts.MITIGATION_OPTION_LIST.map((optionItem, idx) => (
                                            <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex items-center ml-2.5">
                                <label htmlFor="countries" className="text-xs sm:text-sm font-medium text-[#113458] mr-2.5">Unit : </label>
                                <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={unitChange} value={unit}>
                                    {
                                        consts.UNIT_LIST.map((unitItem, idx) => (
                                            <option className="text-[#113458]" key={"unit_list" + idx} value={unitItem}>{unitItem}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center ml-2.5">
                            <button type="button" className="text-[#113458] bg-[#f4cc13] hover:text-white focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-xs sm:text-sm px-4 py-1.5 text-center" onClick={downloadData}>
                                <span className="hidden xl:block">Download Data</span>
                                <span className="xl:hidden">
                                    <ArrowDownTrayIcon
                                        className="h-5 w-5 text-[#113458] hover:text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid col-span-12 xl:col-span-4 bg-[#113458] bg-opacity-10 rounded-md text-[#113458] text-center items-center p-3 my-3" style={{ minHeight: `${400}px` }}>
                    <b>Some Text Here!</b>
                </div>

                {(exportData && exportData.length) ? <>
                    <div className="col-span-12 md:col-span-4 xl:col-span-2">
                        <div className="grid" style={{ minHeight: `${400}px` }}>
                            <FC chartConfigs={chartConfigs1}></FC>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8 xl:col-span-6">
                        <div className="grid" style={{ minHeight: `${400}px` }}>
                            <FC chartConfigs={chartConfigs2}></FC>
                        </div>
                    </div>
                </> :
                    <div className="col-span-12 xl:col-span-8 grid text-center content-center text-[#11345844]" style={{ minHeight: `${200}px` }}>
                        <i>No Reduction Potential for <b>{country}</b></i>
                    </div>
                }
            </div>
        </>
    )
}

export default EmissionRedcutionPotentialComponent;