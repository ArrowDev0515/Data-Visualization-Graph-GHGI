import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { ArrowDownTrayIcon, ArrowDownIcon, ArrowUpIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ModalComponent from "./modal_component";
import SourceDataComponent from '../components/source_data';
import { exportToCSV } from "../utils/exportCSV";

const FC = dynamic(() => import("./fusion_chart.js"), { ssr: false });
const consts = require("../consts/consts");
const dataSrc = require("../consts/221205_TradeOffs.json");

const ImpactsAndSynergiesComponent = ({ country, AFOLUSector, farmingSystem }) => {
    const [mitigationOption, setMitigationOption] = useState(consts.MITIGATION_OPTION_TSWD);
    const [mitigationOptionList, setMitigationOptionList] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        });
        setExportData(data);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const mitigationOptionChange = (e) => {
        setMitigationOption(e.target.value);
    }

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
                        <ArrowLongRightIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
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
                return (<div className="flex justify-center">NA</div>);
        }
    }

    const modalContent = <>
        <div className="mt-5 text-[#113458]">
            <table className="w-full text-sm text-center text-[#113458] rounded-t-sm">
                <thead className="text-xs text-white uppercase bg-[#11345877] ">
                    <tr>
                        <th scope="col" className="py-3 px-6">{consts.MODAL_TABLE_HEADER_MAGNITUDE}</th>
                        <th scope="col" className="py-3 px-6">{consts.MODAL_TABLE_HEADER_SYMBOL}</th>
                        <th scope="col" className="py-3 px-6">{consts.MODAL_TABLE_HEADER_DEFINITION}</th>
                    </tr>
                </thead>
                <tbody className="bg-gradient-to-b bg-[#11345811] rounded-b-sm">
                    <tr className="border-t border-gray-400">
                        <td className="py-4 px-6">1</td>
                        <td className="py-4 px-6 flex text-center justify-center">
                            <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        </td>
                        <td className="py-4 px-6">{consts.MODAL_TEXT_STRONGLY_DECREASE}</td>
                    </tr>
                    <tr className="border-t border-gray-400">
                        <td className="py-4 px-6">2</td>
                        <td className="py-4 px-6 flex text-center justify-center">
                            <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        </td>
                        <td className="py-4 px-6">{consts.MODAL_TEXT_DECREASE}</td>
                    </tr>
                    <tr className="border-t border-gray-400">
                        <td className="py-4 px-6">3</td>
                        <td className="py-4 px-6 flex text-center justify-center">
                            <ArrowLongRightIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        </td>
                        <td className="py-4 px-6">{consts.MODAL_TEXT_NEUTRAL}</td>
                    </tr>
                    <tr className="border-t border-gray-400">
                        <td className="py-4 px-6">4</td>
                        <td className="py-4 px-6 flex text-center justify-center">
                            <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        </td>
                        <td className="py-4 px-6">{consts.MODAL_TEXT_INCREASE}</td>
                    </tr>
                    <tr className="border-t border-gray-400">
                        <td className="py-4 px-6">5</td>
                        <td className="py-4 px-6 flex text-center justify-center">
                            <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                        </td>
                        <td className="py-4 px-6">{consts.MODAL_TEXT_STRONGLY_INCREASE}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>

    return (
        <>
            <div className="mt-10 px-5 py-3">
                <label htmlFor="countries" className="text-2xl font-medium text-[#113458]">
                    {consts.MODAL_TITLE_TRADE_OFFS}
                </label>
            </div>
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

                        <ModalComponent title={consts.MODAL_TITLE_TRADE_OFFS} content={modalContent} isModalOpen={isModalOpen} closeModal={closeModal} />

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
                <div className="col-span-6 lg:col-span-3 bg-gradient-to-t from-[#11345822] rounded-md text-[#113458] grid p-3 my-3" style={{ minHeight: "300px" }}>
                    {/* <img src="avatar2.png" className="h-40 bg-gray-900 bg-opacity-10 rounded-md m-3" /> */}
                    <div className="my-3">Some Text Here!</div>
                </div>
                <div className="grid col-span-6 md:col-span-4 lg:col-span-2 md:ml-5 my-3 items-center" style={{ minHeight: `${300}px` }}>
                    {/* <FC chartConfigs={chartConfigs}></FC> */}
                    {(exportData && exportData.length) ?
                        <>
                            <div className="relative rounded-t-xl">
                                <table className="w-full text-sm text-center text-[#113458] rounded-t-sm">
                                    <thead className="text-xs text-white uppercase bg-[#11345877] ">
                                        <tr>
                                            <th scope="col" className="py-3 px-1">{consts.TEXT_NON_GHG_INDICATOR}</th>
                                            <th scope="col" className="py-3 px-1">{consts.TEXT_MAGNITUDE}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gradient-to-b bg-[#ffffff82] rounded-b-sm">
                                        {exportData.map((element, idx) => (
                                            <tr key={idx} className="border-t border-gray-400">
                                                <td scope="row" className="py-4 px-1 font-medium whitespace-nowrap" style={{ overflowWrap: "anywhere" }}>{element["NonGHGIndicator"]}</td>
                                                <td className="py-4 px-1" style={{ backgroundColor: `${element["HEX"]}` }}>{getIcon(element["Magnitude"])}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </> :
                        <div className="grid text-center content-center text-[#11345822] bg-gradient-to-b from-[#11345822] rounded-md">
                            <i>No Impacts & Synergies for <b>{country}</b></i>
                        </div>
                    }
                </div>
                <div className="col-span-6 md:col-span-2 lg:col-span-1 grid text-center text-gray-600 mt-2 text-xs items-center">
                    <i>
                        <div className="flex text-center items-center justify-center mt-2">
                            <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            {consts.MODAL_TEXT_STRONGLY_DECREASE}
                        </div>
                        <div className="flex text-center items-center justify-center mt-2">
                            <ArrowDownIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            {consts.MODAL_TEXT_DECREASE}
                        </div>
                        <div className="flex text-center items-center justify-center mt-2">
                            <ArrowLongRightIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            {consts.MODAL_TEXT_NEUTRAL}
                        </div>
                        <div className="flex text-center items-center justify-center mt-2">
                            <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            {consts.MODAL_TEXT_STRONGLY_INCREASE}
                        </div>
                        <div className="flex text-center items-center justify-center mt-2">
                            <ArrowUpIcon className="h-5 w-5 hover:text-white" aria-hidden="true" />
                            {consts.MODAL_TEXT_INCREASE}
                        </div>
                    </i>
                </div>
            </div>
            <section id="data_explorer">
                <SourceDataComponent AFOLUSector={AFOLUSector} farmingSystem={farmingSystem} mitigationOption={mitigationOption} />
            </section>
        </>
    )
}

export default ImpactsAndSynergiesComponent;