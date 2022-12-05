import { useEffect, useState } from "react";
const dataSrc = require("../consts/221205_CleanSource.json")
const SourceDataComponent = ({ AFOLUSector, farmingSystem, mitigationOption }) => {

    const [data, setData] = useState([]);

    const filterData = () => {
        setData(dataSrc.filter((ele) => {
            return (ele["FarmingSystem"] === farmingSystem && ele["Mitig_Option"] === mitigationOption)
        }));
    }

    useEffect(() => {
        filterData();
    }, [AFOLUSector, farmingSystem, mitigationOption]);

    return (
        <>
            {/* <div className="my-10 mx-8 bg-[#113458] bg-opacity-10 rounded-xl items-center justify-center"> */}
            {/* <div className="bg-local text-center grid content-center" style={{ backgroundImage: "url(../fable_bg1.jpg)", minHeight: "700px" }}> */}
            <div className="grid col-span-6 md:col-span-3 mx-3">
                <div className="mt-3">
                    <label htmlFor="countries" className="mx-2 text-lg font-medium text-[#113458]">
                        Source Data
                    </label>
                </div>
                {
                    <>
                        {(data.length > 0) ?
                            <div className="relative rounded-t-xl my-5">
                                <table className="w-full text-sm text-center text-[#113458] rounded-t-sm">
                                    <thead className="text-xs text-white uppercase bg-[#11345877]">
                                        <tr className="grid grid-cols-5">
                                            <th scope="col" className="py-3 md:px-6 col-span-1 px-1">Author</th>
                                            <th scope="col" className="py-3 md:px-6 col-span-1 px-1">Title</th>
                                            <th scope="col" className="py-3 md:px-6 col-span-1 px-1">Year</th>
                                            <th scope="col" className="py-3 md:px-6 col-span-1 px-1">Journal</th>
                                            <th scope="col" className="py-3 md:px-6 col-span-1 px-1">DOI</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gradient-to-b bg-[#11345822] rounded-b-sm">
                                        {
                                            data.map((ele, idx) => (
                                                <tr className="border-t border-gray-400 grid grid-cols-5">
                                                    <td className="py-3 md:px-6 col-span-1 px-1" style={{overflowWrap: "anywhere"}}>{ele["Authors"]}</td>
                                                    <td className="py-3 md:px-6 col-span-1 px-1" style={{overflowWrap: "anywhere"}}>{ele["Title"]}</td>
                                                    <td className="py-3 md:px-6 col-span-1 px-1" style={{overflowWrap: "anywhere"}}>{ele["Year"]}</td>
                                                    <td className="py-3 md:px-6 col-span-1 px-1" style={{overflowWrap: "anywhere"}}>{ele["Journal"]}</td>
                                                    <td className="py-3 md:px-6 col-span-1 px-1" style={{overflowWrap: "anywhere"}}>{ele["DOI"]}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className="grid text-center content-center text-[#11345822] bg-gradient-to-b from-[#11345822] rounded-md my-5 p-5" style={{height: "200px"}}>
                                <i>No Data to Display</i>
                            </div>
                        }
                    </>
                }
            </div>
            {/* </div> */}
        </>
    )
}

export default SourceDataComponent;