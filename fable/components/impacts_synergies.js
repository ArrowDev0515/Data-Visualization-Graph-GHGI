import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { ArrowDownTrayIcon, ArrowDownIcon, ArrowUpIcon, MinusIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ModalComponent from "./modal_component";
import SourceDataComponent from '../components/source_data';

import { exportToCSV } from "../utils/exportCSV";

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const consts = require("../consts/consts");
const dataSrc = require("../consts/221130_TradeOffs.json");


const ImpactsAndSynergiesComponent = ({ country, AFOLUSector, farmingSystem }) => {
    const [mitigationOption, setMitigationOption] = useState(consts.MITIGATION_OPTION_TSWD);
    const [mitigationOptionList, setMitigationOptionList] = useState([]);
    // const [inout, setInOut] = useState(consts.IN_OUT_OPTION_INPUT);
    const [exportData, setExportData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [chartConfigs, setChartConfigs] = useState({
    //     type: "scatter",
    //     width: "99%",
    //     height: "100%",
    //     dataFormat: "JSON",
    //     containerBackgroundOpacity: "0",
    //     dataSource: {
    //         chart: {
    //             caption: inout == consts.IN_OUT_OPTION_OUTPUT ? consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_OUTPUT :
    //                 consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_INPUT,
    //             captionFontColor: "#113458",
    //             xAxisNameFontColor: "#113458",
    //             yAxisMaxValue: 5,
    //             divLineColor: "#113458",
    //             xAxisValueFontColor: "#113458",
    //             yAxisNameFontColor: "#113458",
    //             yAxisValueFontColor: "#113458",
    //             yAxisName: "Gradient",
    //             xAxisPosition: "right",
    //             legendItemFontColor: "#113458",
    //             bgColor: "#000000",
    //             bgAlpha: "0",
    //             labelFontSize: "12",
    //             labelFontColor: "#113458",
    //             ynumberprefix: "",
    //             xnumbersuffix: "",
    //             theme: "fusion",
    //             legendIconSides: 5,
    //             plottooltext:
    //                 "Gradient Value : <b>$yDataValue</b>"
    //         },
    //         categories: [
    //             {
    //                 category: []
    //             }
    //         ],
    //         dataset: [
    //             {
    //                 seriesname: "",
    //                 anchorbgcolor: "",
    //                 data: []
    //             },
    //             {
    //                 seriesname: "",
    //                 anchorbgcolor: "",
    //                 data: []
    //             }
    //         ]
    //     }
    // });

    useEffect(() => {
        getMitigationOptionsList();
        generateChartData();
    }, [country, AFOLUSector, farmingSystem,]);

    useEffect(() => {
        generateChartData();
    }, [mitigationOption]);

    const getMitigationOptionsList = () => {
        // set data for Unit SelectBox
        let mitigationOptionArr = [];
        mitigationOptionArr = dataSrc.filter((ele) => {
            return (ele["AFOLU_Sector"] === AFOLUSector && ele["FarmingSystem"] === farmingSystem)
        }).map((ele) => {
            if (ele["AFOLU_Sector"] === AFOLUSector) {
                return ele["Mitig_Option"];
            }
        }).reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            [],
        );
        setMitigationOption(mitigationOptionArr[0]);
        setMitigationOptionList(mitigationOptionArr);
    }

    const generateChartData = async () => {

        //Filter Data with Select
        let data = dataSrc.filter((ele) => {
            return (ele["Country"] === country && ele["Mitig_Option"] === mitigationOption && ele["AFOLU_Sector"] === AFOLUSector && ele["FarmingSystem"] === farmingSystem);
            // return (ele["Country"] === country && ele["Unit"] === unit && ele["Input_Output"] === inout && ele["MitigationOption"] === mitigationOption);
        });
        setExportData(data);
        // let xLabels = new Map();
        // let categoryData = [];      // x Axis Label Array
        // let key = 1;
        // categoryData.push({ x: key.toString(), label: "" });
        // data.map((item) => {
        //     key++;
        //     if (!xLabels.has(item["NonGHGIndicator"])) {
        //         xLabels.set(item["NonGHGIndicator"], key);
        //         categoryData.push({ x: key.toString(), label: item["NonGHGIndicator"] });
        //     }
        // });
        // key++;
        // categoryData.push({ x: key.toString(), label: "" });
        // let dataArr = [];

        // data.map((ele) => {
        //     let xValue = categoryData.find((e) => {
        //         return e["label"] == ele["NonGHGIndicator"];
        //     })["x"];
        //     dataArr.push({ x: xValue, y: ele["Magnitude"] });
        // });

        // setChartConfigs({
        //     ...chartConfigs, dataSource: {
        //         ...chartConfigs.dataSource,
        //         categories: [{ category: categoryData }],
        //         chart: {
        //             ...chartConfigs.dataSource.chart,
        //             caption: inout == consts.IN_OUT_OPTION_OUTPUT ? consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_OUTPUT :
        //                 consts.CAPTION_TEXT_TRADE_OFF_SYNERGIES_INPUT,
        //         },
        //         dataset: [
        //             { seriesname: "", anchorbgcolor: consts.colors[0], data: dataArr, anchorsides: 2, anchorradius: 5 },
        //         ]
        //     }
        // });
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    // const unitChange = (e) => {
    //     setUnit(e.target.value);
    // }

    const mitigationOptionChange = (e) => {
        setMitigationOption(e.target.value);
    }

    // const inoutChange = (e) => {
    //     setInOut(e.target.value);
    // }

    const downloadData = () => {
        let fileName = new Date();
        let data = exportData.map((ele) => {
            return {
                Country: ele["Country"],
                AFOLU_Sector: ele["AFOLU_Sector"],
                FarmingSystem: ele["FarmingSystem"],
                Mitig_Option: ele["Mitig_Option"],
                Mitig_Option_FullName: ele["Mitig_Option_FullName"],
                NonGHGIndicator: ele["NonGHGIndicator"],
                Magnitude: ele["Magnitude"],
            };
        })
        fileName = fileName.getFullYear() + "-" + (fileName.getMonth() + 1) + "-" + fileName.getDate() + " " +
            fileName.getHours() + ":" + fileName.getMinutes() + ":" + fileName.getSeconds();
        exportToCSV(data, fileName);
    }

    const bulkDownload = () => {
        let fileName = new Date();
        fileName = fileName.getFullYear() + "-" + (fileName.getMonth() + 1) + "-" + fileName.getDate() + " " +
            fileName.getHours() + ":" + fileName.getMinutes() + ":" + fileName.getSeconds();
        exportToCSV(exportData, fileName);
    }

    const getIcon = (value) => {
        switch (value) {
            case 1:
                return (
                    <div className="flex justify-center">
                        <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                    </div>
                );
            case 2:
                return (
                    <div className="flex justify-center">
                        <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                    </div>
                );
            case 3:
                return (
                    <div className="flex justify-center">
                        <MinusIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                    </div>);
            case 4:
                return (
                    <div className="flex justify-center">
                        <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                    </div>
                );
            case 5:
                return (
                    <div className="flex justify-center">
                        <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                    </div>
                );
            case undefined:
                return (<div>
                    No Information
                </div>
                );
        }
    }

    const modalContent = <>
        <div className="mt-5 text-[#113458]">
            <b>Mitigation Option :</b> {mitigationOption}<br />
        </div>
    </>

    return (
        <>
            <div className="mt-10 px-5 py-3">
                <label htmlFor="countries" className="text-lg font-medium text-[#113458]">
                    Trade-offs and synergies for specific mitigation option
                </label>
            </div>
            {/* <div className="grid grid-cols-6 bg-[#113458] bg-opacity-10 rounded-xl py-3 px-3 sm:px-5 mt-12 items-center justify-center"> */}
            <div className="grid grid-cols-6 rounded-xl px-3 sm:px-5 justify-center">
                <div className="col-span-6 flex justify-between">
                    <div className="flex items-center">
                        <label htmlFor="countries" className="flex hidden md:block mr-2.5 text-sm font-medium text-[#113458]">Mitigation Option: </label>
                        <select id="mitigationOptions" className="bg-gray-900 bg-opacity-10 border border-[#113458] text-[#113458] text-xs sm:text-sm rounded-lg focus:text-[#113458] focus:border-gray-900 focus-visible:outline-none block p-1.5" onChange={mitigationOptionChange} value={mitigationOption}>
                            {
                                mitigationOptionList.length === 0 ?
                                    <option value={"No Option Data"}>No Option Data</option> : ""
                            }
                            {
                                mitigationOptionList.map((optionItem, idx) => (
                                    <option className="text-[#113458]" key={"mi_option" + idx} value={optionItem}>{optionItem}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* <div className="flex items-center mx-2.5">
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
                        </div> */}
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

                        <ModalComponent title={consts.MODAL_TITLE_IMPACTS_SYNERGIES} content={modalContent} isModalOpen={isModalOpen} closeModal={closeModal} />

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
                <div className="col-span-6 md:col-span-3 bg-gradient-to-t from-[#11345822] rounded-md text-[#113458] justify-items-center grid p-3 my-3" style={{ minHeight: "400px" }}>
                    <img src="avatar2.png" className="h-40 bg-gray-900 bg-opacity-10 rounded-md m-3" />
                    <div className="my-3 text-3xl">Some Text Here!</div>
                </div>
                <div className="grid col-span-6 md:col-span-3 md:ml-5 my-3" style={{ minHeight: `${400}px` }}>
                    {/* <FC chartConfigs={chartConfigs}></FC> */}
                    {(exportData && exportData.length) ?
                        <>
                            <div className="relative rounded-t-xl">
                                <table className="w-full text-sm text-center text-[#113458] rounded-t-sm">
                                    <thead className="text-xs text-white uppercase bg-[#11345877] ">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">Non GHG Indicator</th>
                                            <th scope="col" className="py-3 px-6">Magnitude</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gradient-to-b bg-[#ffffff82] rounded-b-sm">
                                        {exportData.map((element, idx) => (
                                            <tr key={idx} className="border-t border-gray-400">
                                                <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">{element["NonGHGIndicator"]}</th>
                                                <td className="py-4 px-6">{getIcon(element["Magnitude"])}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center text-gray-600 mt-2">
                                <i>
                                    {/* <div><b>Note</b></div> */}
                                    <div className="flex text-center items-center justify-center mt-2">
                                        <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        strongly decrease,
                                        <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        decrease
                                    </div>
                                    <div className="flex text-center items-center justify-center mt-2">
                                        <MinusIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        neutral
                                    </div>
                                    <div className="flex text-center items-center justify-center mt-2">
                                        <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        strongly increase,
                                        <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                                        increase
                                    </div>
                                </i>
                            </div>
                        </> :
                        <div className="grid text-center content-center text-[#11345822] bg-gradient-to-b from-[#11345822] rounded-md">
                            <i>No Impacts & Synergies for <b>{country}</b></i>
                        </div>
                    }
                </div>
                <div className="col-span-6 text-center my-8">
                    <button type="button" className="text-[#113458] bg-[#f4cc13] hover:text-white focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-xl px-8 py-4 text-center" onClick={bulkDownload}>
                        <span className="">Bulk Download</span>
                    </button>
                </div>
            </div>
            <section id="data_explorer">
                <SourceDataComponent AFOLUSector={AFOLUSector} farmingSystem={farmingSystem} mitigationOption={mitigationOption} />
            </section>
        </>
    )
}

export default ImpactsAndSynergiesComponent;