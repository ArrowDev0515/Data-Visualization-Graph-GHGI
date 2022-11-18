import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

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
        width: "99%",
        height: "100%",
        dataFormat: "JSON",
        containerBackgroundOpacity: "0",
        dataSource: {
            chart: {
                caption: inout == consts.IN_OUT_OPTION_OUTPUT ? consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_OUTPUT :
                    consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_INPUT,
                captionFontColor: "#113458",
                xAxisNameFontColor: "#113458",
                yAxisMaxValue: 5,
                divLineColor: "#113458",
                xAxisValueFontColor: "#113458",
                yAxisNameFontColor: "#113458",
                yAxisValueFontColor: "#113458",
                yAxisName: "Gradient",
                xAxisPosition: "right",
                legendItemFontColor: "#113458",
                bgColor: "#000000",
                bgAlpha: "0",
                labelFontSize: "12",
                labelFontColor: "#113458",
                ynumberprefix: "",
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
        categoryData.push({ x: key.toString(), label: "" });
        data.map((item) => {
            key++;
            if (!xLabels.has(item["Input_OutputName"])) {
                xLabels.set(item["Input_OutputName"], key);
                categoryData.push({ x: key.toString(), label: item["Input_OutputName"] });
            }
        });
        key++;
        categoryData.push({ x: key.toString(), label: "" });
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
                chart: {
                    ...chartConfigs.dataSource.chart,
                    caption: inout == consts.IN_OUT_OPTION_OUTPUT ? consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_OUTPUT :
                        consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_INPUT,
                },
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
            <div className="mt-10 px-5 py-3">
                <label htmlFor="countries" className="hidden md:block text-lg font-medium text-[#113458]">
                    Trade - offs and synergies for specific mitigation option
                </label>
            </div>
            {/* <div className="grid grid-cols-6 bg-[#113458] bg-opacity-10 rounded-xl py-3 px-3 sm:px-5 mt-12 items-center justify-center"> */}
            <div className="grid grid-cols-6 rounded-xl px-3 sm:px-5 items-center justify-center">
                <div className="col-span-6 flex items-center justify-between">
                    <label htmlFor="countries" className="flex hidden md:block px-5 text-sm font-medium text-[#113458]">{mitigationOption}</label>
                    <div className="flex">
                        <div className="flex items-center mx-2.5">
                            <select id="mitigationOptions" className="bg-gray-900 bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-gray-900 focus-visible:outline-none block p-1.5" onChange={mitigationOptionChange} value={mitigationOption}>
                                {
                                    consts.MITIGATION_OPTION_LIST2.map((optionItem, idx) => (
                                        <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            <select id="countries" className="bg-gray-900 bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-gray-900 focus-visible:outline-none block p-1.5" onChange={countryChange} value={country}>
                                {
                                    consts.COUNTRY_LIST.map((countryItem, idx) => (
                                        <option className="text-[#113458]" key={"country_list" + idx} value={countryItem}>{countryItem}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            <select id="units" className="bg-gray-900 bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-gray-900 focus-visible:outline-none block p-1.5" onChange={unitChange} value={unit}>
                                {
                                    consts.UNIT_LIST.map((unitItem, idx) => (
                                        <option className="text-[#113458]" key={"unit_list" + idx} value={unitItem}>{unitItem}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex items-center mx-2.5">
                            <select id="inouts" className="bg-gray-900 bg-opacity-10 border border-[#113458] text-[#113458] text-sm rounded-lg focus:text-[#113458] focus:border-gray-900 focus-visible:outline-none block p-1.5" onChange={inoutChange} value={inout}>
                                {
                                    consts.IN_OUT_OPTION_LIST.map((item, idx) => (
                                        <option className="text-[#113458]" key={"unit_list" + idx} value={item}>{item}</option>
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
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-3 bg-gray-900 bg-opacity-10 rounded-md text-[#113458] justify-items-center grid p-3 my-3" style={{ minHeight: "500px" }}>
                    <img src="avatar2.png" className="h-40 bg-gray-900 bg-opacity-10 rounded-md m-3" />
                    <div className="my-3 text-3xl">Some Text Here!</div>
                </div>
                <div className="grid col-span-6 sm:col-span-3" style={{ minHeight: `${400}px` }}>
                    <FC chartConfigs={chartConfigs}></FC>
                </div>
            </div>
        </>
    )
}