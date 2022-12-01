import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import ImpactsAndSynergiesComponent from '../components/impacts_synergies';

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

import { exportToCSV } from "../utils/exportCSV";
import ModalComponent from "./modal_component";
const dataSrc = require("../consts/221201_MitigationPotential.json");
const consts = require("../consts/consts");

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const defaultHeight = 400;

const EmissionRedcutionPotentialComponent = ({ country }) => {
    const [AFOLUSector, setAFOLUSector] = useState(consts.AFOLU_SECTOR_RICE_CULTIVATION);
    const [AFOLUSectorList, setAFOLUSectorList] = useState([]);
    const [unit, setUnit] = useState(consts.UNIT_CH4_HA);
    const [unitList, setUnitList] = useState([]);
    const [farmingSystem, setFarmingSystem] = useState(consts.FARMING_SYSTEM_CONVENTIONAL_RICE);
    const [farmingSystemList, setFarmingSystemList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exportData, setExportData] = useState([]);
    const [chartConfigs1, setChartConfigs1] = useState({
        type: "scatter",
        width: "99%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",

        dataSource: {
            chart: {
                caption: `Current Emission Factor for ${country}`,
                captionFontColor: "#113458",
                divLineColor: "#113458",
                xAxisNameFontColor: "#113458",
                xAxisValueFontColor: "#113458",
                yAxisNameFontColor: "#113458",
                yAxisValueFontColor: "#113458",
                legendItemFontColor: "#113458",
                yAxisMaxValue: "6000",
                yAxisMinValue: "0",
                bgColor: "#000000",
                bgAlpha: "0",
                labelFontSize: "12",
                labelFontColor: "#113458",
                yaxisname: consts.UNIT_CH4_HA,
                plotHighlightEffect: "fadeout|borderColor=ff0000, borderAlpha=50",
                interactiveLegend: 0,
                numberScaleUnit: ",M,B",
                showLegend: "0",
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
                caption: `${consts.CAPTION_TEXT_EMISSION_REDUCTION_POTENTIAL}{br} {br}`,
                captionFontColor: "#113458",
                divLineColor: "#113458",
                xAxisNameFontColor: "#ff0000",
                xAxisValueFontColor: "#113458",
                xAxisNameFontSize: 8,
                xAxisValueFontSize: 8,
                yAxisNameFontColor: "#113458",
                yAxisValueFontColor: "#113458",
                legendItemFontColor: "#113458",

                "legendIconBgColor": "#ff0000",
                "legendIconAlpha": "50",
                "legendIconBgAlpha": "30",
                "legendIconBorderColor": "#123456",
                "legendIconBorderThickness": "3",


                yAxisMaxValue: "6000",
                yAxisMinValue: "0",
                bgColor: "#000000",
                bgAlpha: "0",
                labelFontSize: "12",
                labelFontColor: "#113458",
                yaxisname: consts.UNIT_CH4_HA,
                plotHighlightEffect: "fadeout|borderColor=ff0000, borderAlpha=50",
                interactiveLegend: 0,
                numberScaleUnit: ",M,B",
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

    const getAFOLUSectorOptionsList = () => {
        // set data for MitigationOption(AFOLU Sector) SelectBox
        let afoluSectorArr = [];
        afoluSectorArr = dataSrc.map((ele) => {
            return ele["AFOLU_Sector"];
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setAFOLUSectorList(afoluSectorArr);
    }

    const getFarmingSystemOptionsList = () => {
        // set data for Unit SelectBox
        let farmingSystemArr = [];
        farmingSystemArr = dataSrc.filter((ele) => {
            return (ele["AFOLU_Sector"] === AFOLUSector)
        }).map((ele) => {
            return ele["FarmingSystem"];
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setFarmingSystem(farmingSystemArr[0]);
        setFarmingSystemList(farmingSystemArr);
    }

    const getUnitOptionsList = () => {
        // set data for Unit SelectBox
        let unitArr = [];
        unitArr = dataSrc.filter((ele) => {
            return (ele["AFOLU_Sector"] === AFOLUSector && ele["FarmingSystem"] === farmingSystem)
        }).map((ele) => {
            if (ele["AFOLU_Sector"] === AFOLUSector) {
                return ele["Unit"];
            }
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setUnit(unitArr[0]);
        setUnitList(unitArr);
    }

    useEffect(() => {
        getFarmingSystemOptionsList();
    }, [AFOLUSector]);

    useEffect(() => {
        getUnitOptionsList();
    }, [AFOLUSector, farmingSystem]);

    const generateChartData = () => {
        getAFOLUSectorOptionsList();
        // filter Data for Chart
        let data = dataSrc.filter((ele) => {
            return (ele["Party"] === country && ele["AFOLU_Sector"] === AFOLUSector && ele["FarmingSystem"] === farmingSystem && ele["Unit"] === unit);
        });
        setExportData(data);

        // let xLabels1 = new Map();
        let xLabels2 = new Map();
        // let categoryData1 = [];      // x Axis Label Array
        let categoryData2 = [];      // x Axis Label Array
        // let key1 = 1;
        let key2 = 1;
        // categoryData1.push({ x: (key1 * 20).toString(), label: "" });
        categoryData2.push({ x: (key2 * 20).toString(), label: "" });

        data.map((item) => {
            if (item["DataSource"] === consts.DATA_SOURCE_FAO || item["DataSource"] === consts.DATA_SOURCE_IPCC) {
                if (!xLabels2.has(item["DataSource"])) {
                    key2++;
                    xLabels2.set(item["DataSource"], key2);
                    categoryData2.push({ x: (key2 * 20).toString(), label: item["DataSource"] });
                }
            } else {
                if (!xLabels2.has(item["MitigationOption"])) {
                    key2++;
                    xLabels2.set(item["MitigationOption"], key2);
                    categoryData2.push({ x: (key2 * 20).toString(), label: item["MitigationOption"] });
                }
            }
        });
        // key1++;
        key2++;
        // categoryData1.push({ x: (key1 * 20).toString(), label: "" });
        categoryData2.push({ x: (key2 * 20).toString(), label: "" });

        let dataArrForMax = [];
        let dataArrForMin = [];
        // let dataArrForMedian1 = [];
        let dataArrForMedian2 = [];
        let dataArrForAverage = [];
        let dataArrForHistorical = [];

        let yMax = 0;
        if (data.length > 0) {
            yMax = data[0]["Max_y"];
        }
        data.map((ele) => {
            if (ele["DataSource"] === consts.DATA_SOURCE_FAO || ele["DataSource"] === consts.DATA_SOURCE_IPCC) {
                let xValue = categoryData2.find((e) => {
                    return e["label"] == ele["DataSource"];
                })["x"];
                dataArrForHistorical.push({ x: xValue, y: ele["Historical"] });
            } else {
                let xValue = categoryData2.find((e) => {
                    return e["label"] == ele["MitigationOption"];
                })["x"];
                if (ele["Max"]) {
                    dataArrForMax.push({ x: xValue, y: ele["Max"] });
                }
                if (ele["Min"]) {
                    dataArrForMin.push({ x: xValue, y: ele["Min"] });
                }
                if (ele["Median"]) {
                    dataArrForMedian2.push({ x: xValue, y: ele["Median"] });
                }
                if (ele["Average"]) {
                    dataArrForAverage.push({ x: xValue, y: ele["Average"] });

                }
            }
        });
        // setChartConfigs1({
        //     ...chartConfigs1, dataSource: {
        //         ...chartConfigs1.dataSource,
        //         chart: {
        //             ...chartConfigs1.dataSource.chart,
        //             yAxisMaxValue: yMax,
        //         },
        //         categories: [{ category: categoryData1 }],
        //         dataset: [
        //             { seriesname: "Average", anchorbgcolor: "#666666", data: dataArrForMedian1, anchorsides: 4, anchorstartangle: 45, anchorradius: 5 }
        //         ],
        //     }
        // });

        setChartConfigs2({
            ...chartConfigs2, dataSource: {
                ...chartConfigs2.dataSource,
                chart: {
                    ...chartConfigs2.dataSource.chart,
                    yAxisMaxValue: yMax,
                },
                categories: [{ category: categoryData2 }],
                dataset: [
                    { seriesname: "Max", anchorbgcolor: consts.colors[0], data: dataArrForMax, anchorstartangle: 270, anchorsides: 3, anchorradius: 8, legendIconAlpha: 100 },
                    { seriesname: "Min", anchorbgcolor: consts.colors[1], data: dataArrForMin, anchorsides: 3, anchorradius: 8, legendIconAlpha: 100 },
                    { seriesname: "Average", anchorbgcolor: consts.colors[3], data: dataArrForAverage, anchorsides: 2, anchorradius: 6, legendIconAlpha: 100 },
                    { seriesname: "Median", anchorbgcolor: consts.colors[2], data: dataArrForMedian2, anchorsides: 4, anchorradius: 5, legendIconAlpha: 100 },
                    { seriesname: "Historical", anchorbgcolor: consts.colors[4], data: dataArrForHistorical, anchorsides: 5, anchorradius: 5, legendIconAlpha: 100 }
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

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

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

    const modalContent = <>
        <div className="mt-5 text-[#113458]">
            <b>Country :</b> {country}<br />
            <b>Farming System :</b> {farmingSystem}<br />
            <b>Unit :</b> {unit}<br />
        </div>
    </>

    return (
        <>
            <section id="emission_reduction_potential">
                <div className="mt-10 px-5 py-3">
                    <label htmlFor="countries" className="text-lg font-medium text-[#113458]">
                        Mitigation potential per AFOLU sector
                    </label>
                </div>
                <div className="grid grid-cols-12 rounded-xl px-3 sm:px-5 justify-center">
                    <div className="flex col-span-12 mb-2.5 justify-between">
                        <div className="flex items-center ">
                            <label htmlFor="countries" className="hidden sm:block text-xs md:text-sm font-medium text-[#113458] mr-2.5">AFOLU Sector: </label>
                            <select id="mitigationOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={afoluSectorOptionChange} value={AFOLUSector}>
                                {
                                    AFOLUSectorList.map((optionItem, idx) => (
                                        <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                                    ))
                                }
                            </select>
                            <div className="flex items-center ml-2.5">
                                <label htmlFor="countries" className="hidden sm:block text-xs md:text-sm font-medium text-[#113458] mr-2.5">Farming System: </label>
                                <select id="farmingSystemOptions" className="bg-[#113458] bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-1.5" onChange={farmingSystemChange} value={farmingSystem}>
                                    {
                                        farmingSystemList.map((optionItem, idx) => (
                                            <option className="text-[#113458]" key={"fs_option" + idx} value={optionItem}>{optionItem}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>


                    </div>
                    <div className="hidden xs:block col-span-12 mb-3">
                        <div className="flex justify-between">
                            <div className="flex">

                                <div className="flex items-center">
                                    <label htmlFor="countries" className="hidden sm:block text-xs md:text-sm font-medium text-[#113458] mr-2.5">Unit : </label>
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
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="text-[#113458] hover:text-white focus:bg-gray-300 font-medium rounded-lg text-xs sm:text-sm px-1.5 py-1.5 text-center mr-2"
                                >
                                    <span className="">
                                        <InformationCircleIcon
                                            className="h-5 w-5 text-[#113458] hover:text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </button>

                                <ModalComponent title={consts.MODAL_TITLE_MITIGATION_POTENTIAL} content={modalContent} isModalOpen={isModalOpen} closeModal={closeModal} />

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
                    <div className="grid col-span-12 xl:col-span-5 bg-gradient-to-b from-[#11345822] rounded-md text-[#113458] p-3 mb-3" style={{ minHeight: `${400}px` }}>
                        {exportData.length ?
                            exportData[0]["DescriptionText"] :
                            <div className="text-[#11345822] text-center grid items-center">
                                <span><i><b>No Data to Display</b></i></span>
                            </div>}
                    </div>

                    {(exportData && exportData.length) ? <div className="col-span-12 xl:col-span-7 xl:ml-3">
                        {/* <div className="bg-gradient-to-b from-[#11345822] rounded-md col-span-12 md:col-span-4">
                            {
                                chartConfigs1.dataSource.dataset[0].data.length > 0 ?
                                    <div className="grid" style={{ minHeight: `${400}px` }}>
                                        <FC chartConfigs={chartConfigs1}></FC>
                                    </div> :
                                    <div className="text-[#11345822] text-center grid items-center" style={{ minHeight: `${400}px` }}><span>
                                        <i><b>No Data to Display</b></i></span>
                                    </div>
                            }
                        </div> */}
                        <div className="grid" style={{ minHeight: `${400}px` }}>
                            <FC chartConfigs={chartConfigs2}></FC>
                        </div>
                    </div> :
                        <div className="col-span-12 xl:col-span-7 grid bg-gradient-to-b from-[#11345822] rounded-md text-center content-center text-[#11345822] xl:ml-3 mb-3" style={{ minHeight: `${200}px` }}>
                            <i>No Reduction Potential for <b>{country}</b></i>
                        </div>
                    }
                </div>
            </section>
            <section id="impacts_synergies"><ImpactsAndSynergiesComponent country={country} AFOLUSector={AFOLUSector} farmingSystem={farmingSystem} /></section>
        </>
    )
}

export default EmissionRedcutionPotentialComponent;