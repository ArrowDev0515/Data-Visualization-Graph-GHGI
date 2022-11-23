import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
const dataSrc = require("../consts/221122_MitigationPotential.json");
const consts = require("../consts/consts");

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const defaultHeight = 400;

const EmissionRedcutionPotentialComponent = ({ country }) => {

    // const [country, setCountry] = useState(consts.COUNTRY_CHINA);
    const [AFOLUSector, setAFOLUSector] = useState(consts.AFOLU_SECTOR_RICE_CULTIVATION);
    const [AFOLUSectorList, setAFOLUSectorList] = useState([]);
    const [unit, setUnit] = useState(consts.UNIT_CH4_HA);
    const [unitList, setUnitList] = useState([]);
    const [farmingSystem, setFarmingSystem] = useState(consts.FARMING_SYSTEM_CONVENTIONAL_RICE);
    const [farmingSystemList, setFarmingSystemList] = useState([]);

    const [exportData, setExportData] = useState([]);
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
                yaxisname: consts.UNIT_CH4_HA,
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

        // set data for MitigationOption(AFOLU Sector) SelectBox
        let afoluSectorArr = [];
        afoluSectorArr = dataSrc.map((ele) => {
            return ele["AFOLU_Sector"];
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setAFOLUSectorList(afoluSectorArr);

        // set data for Unit SelectBox
        let unitArr = [];
        unitArr = dataSrc.map((ele) => {
            return ele["Unit"];
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setUnitList(unitArr);

        // set data for Unit SelectBox
        let farmingSystemArr = [];
        farmingSystemArr = dataSrc.map((ele) => {
            return ele["FarmingSystem"];
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setFarmingSystemList(farmingSystemArr);

        // filter Data for Chart
        let data = dataSrc.filter((ele) => {
            return (ele["Party"] === country && ele["AFOLU_Sector"] === AFOLUSector && ele["FarmingSystem"] === farmingSystem && ele["Unit"] === unit);
        });
        setExportData(data);


        let xLabels1 = new Map();
        let xLabels2 = new Map();
        let categoryData1 = [];      // x Axis Label Array
        let categoryData2 = [];      // x Axis Label Array
        let key1 = 1;
        let key2 = 1;
        categoryData1.push({ x: (key1 * 20).toString(), label: "" });
        categoryData2.push({ x: (key1 * 20).toString(), label: "" });

        data.map((item) => {
            if (item["DataSource"] === consts.DATA_SOURCE_FAO || item["DataSource"] === consts.DATA_SOURCE_IPCC) {
                if (!xLabels1.has(item["DataSource"])) {
                    key1++;
                    xLabels1.set(item["DataSource"], key1);
                    categoryData1.push({ x: (key1 * 20).toString(), label: item["DataSource"] });
                }
            } else {
                // console.log(data, item, xLabels2, item["MitigationOption"]);

                if (!xLabels2.has(item["MitigationOption"])) {
                    key2++;
                    xLabels2.set(item["MitigationOption"], key2);
                    categoryData2.push({ x: (key2 * 20).toString(), label: item["MitigationOption"] });
                }
            }
        });
        key1++;
        key2++;
        categoryData1.push({ x: (key1 * 20).toString(), label: "" });
        categoryData2.push({ x: (key2 * 20).toString(), label: "" });

        let dataArrForMax = [];
        let dataArrForMin = [];
        let dataArrForMedian1 = [];
        let dataArrForMedian2 = [];
        let dataArrForAverage = [];

        let yMax1 = 0, yMax2 = 0;
        let yMin1 = 99999999, yMin2 = 99999999;
        data.map((ele) => {
            if (ele["DataSource"] === consts.DATA_SOURCE_FAO || ele["DataSource"] === consts.DATA_SOURCE_IPCC) {
                let xValue = categoryData1.find((e) => {
                    return e["label"] == ele["DataSource"];
                })["x"];
                dataArrForMedian1.push({ x: xValue, y: ele["Average"] });
                if (ele["Average"] > yMax1) {
                    yMax1 = ele["Average"];
                }
                if (ele["Average"] < yMin1) {
                    yMin1 = ele["Average"];
                }
            } else {
                let xValue = categoryData2.find((e) => {
                    return e["label"] == ele["MitigationOption"];
                })["x"];
                if (ele["Max"]) {
                    dataArrForMax.push({ x: xValue, y: ele["Max"] });
                    if (ele["Max"] > yMax2) {
                        yMax2 = ele["Max"];
                    }
                    if (ele["Max"] < yMin2) {
                        yMin2 = ele["Max"];
                    }
                }
                if (ele["Min"]) {
                    dataArrForMin.push({ x: xValue, y: ele["Min"] });
                    if (ele["Min"] > yMax2) {
                        yMax2 = ele["Min"];
                    }
                    if (ele["Min"] < yMin2) {
                        yMin2 = ele["Min"];
                    }
                }
                if (ele["Median"]) {
                    dataArrForMedian2.push({ x: xValue, y: ele["Median"] });
                    if (ele["Median"] > yMax2) {
                        yMax2 = ele["Median"];
                    }
                    if (ele["Median"] < yMin2) {
                        yMin2 = ele["Median"];
                    }
                }
                if (ele["Average"]) {
                    dataArrForAverage.push({ x: xValue, y: ele["Average"] });
                    if (ele["Average"] > yMax2) {
                        yMax2 = ele["Average"];
                    }
                    if (ele["Average"] < yMin2) {
                        yMin2 = ele["Average"];
                    }
                }
            }
        });

        // console.log("dataArrForMax", dataArrForMax);
        // console.log("dataArrForMin", dataArrForMin);
        // console.log("dataArrForMedian2", dataArrForMedian2);
        // console.log("dataArrForAverage", dataArrForAverage);

        setChartConfigs1({
            ...chartConfigs1, dataSource: {
                ...chartConfigs1.dataSource,
                chart: {
                    ...chartConfigs1.dataSource.chart,
                    yAxisMaxValue: yMax1,
                    yAxisMinValue: yMin1
                },
                categories: [{ category: categoryData1 }],
                dataset: [
                    { seriesname: "Average", anchorbgcolor: consts.colors[3], data: dataArrForMedian1, anchorsides: 2, anchorradius: 5 }
                ],
            }
        });

        setChartConfigs2({
            ...chartConfigs2, dataSource: {
                ...chartConfigs2.dataSource,
                chart: {
                    ...chartConfigs2.dataSource.chart,
                    yAxisMaxValue: yMax2,
                    yAxisMinValue: yMin2
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
    }, [country, AFOLUSector, farmingSystem, unit]);

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

    const afoluSectorOptionChange = (e) => {
        setAFOLUSector(e.target.value);
    }

    const farmingSystemChange = (e) => {
        setFarmingSystem(e.target.value);
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
            <div className="grid grid-cols-12 rounded-xl px-3 sm:px-5 justify-center">
                <div className="flex items-center col-span-12 ml-2.5 mb-2.5">
                    <label htmlFor="countries" className="text-xs sm:text-sm font-medium text-[#113458] mr-2.5">AFOLU Sector: </label>
                    <select id="mitigationOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={afoluSectorOptionChange} value={AFOLUSector}>
                        {
                            AFOLUSectorList.map((optionItem, idx) => (
                                <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="hidden xs:block col-span-12 mb-3">
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
                                <select id="farmingSystemOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={farmingSystemChange} value={farmingSystem}>
                                    {
                                        farmingSystemList.map((optionItem, idx) => (
                                            <option className="text-[#113458]" key={"fs_option" + idx} value={optionItem}>{optionItem}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex items-center ml-2.5">
                                <label htmlFor="countries" className="text-xs sm:text-sm font-medium text-[#113458] mr-2.5">Unit : </label>
                                <select id="countries" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={unitChange} value={unit}>
                                    {
                                        unitList.map((unitItem, idx) => (
                                            <option className="text-[#113458]" key={"unit_option" + idx} value={unitItem}>{unitItem}</option>
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
                <div className="grid col-span-12 xl:col-span-4 bg-gradient-to-t from-[#11345822] rounded-md text-[#113458] text-center items-center p-3 my-3" style={{ minHeight: `${400}px` }}>
                    {/* <div className="grid col-span-12 xl:col-span-4 bg-[#113458] bg-opacity-10 rounded-md text-[#113458] text-center items-center p-3 my-3" style={{ minHeight: `${400}px` }}> */}
                    <b>Some Text Here!</b>
                </div>

                {(exportData && exportData.length) ? <div className="col-span-12 xl:col-span-8 bg-gradient-to-b from-[#11345822] grid grid-cols-12 rounded-md xl:ml-3">
                    <div className="col-span-12 md:col-span-4">
                        <div className="grid" style={{ minHeight: `${400}px` }}>
                            <FC chartConfigs={chartConfigs1}></FC>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="grid" style={{ minHeight: `${400}px` }}>
                            <FC chartConfigs={chartConfigs2}></FC>
                        </div>
                    </div>
                </div> :
                    <div className="col-span-12 xl:col-span-8 grid bg-gradient-to-b from-[#11345822] rounded-md text-center content-center text-[#11345822] xl:ml-3 my-3" style={{ minHeight: `${200}px` }}>
                        <i>No Reduction Potential for <b>{country}</b></i>
                    </div>
                }
            </div>
        </>
    )
}

export default EmissionRedcutionPotentialComponent;