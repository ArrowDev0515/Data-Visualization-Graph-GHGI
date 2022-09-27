import Image from "next/image";
import { useEffect } from "react";
import { Link } from 'react-scroll'

// const activeStyle = {
//   fontWeight: "bold",
//   color: "rgb(56 189 248)",
//   borderColor: "rgb(96 165 250)"
// }
const Header = ({ tabNo }) => {
  useEffect(() => {

  })

  return (
    <>
      <header className="nav">

      </header>
      <div className="grid grid-cols-4 flex-wrap bg-sky-900 p-2 sticky w-full top-0" style={{ minHeight: "45px", zIndex: "1" }}>
        <div className="col-span-1 pl-2 flex items-center">
          <a href="/">
            {/* <img src="/logo_white.png" style={{ height: "45px" }} /> */}
            <h4 className="text-white text-center"><b>Mitigation Option <br></br>Catalogue</b></h4>
          </a>
        </div>
        <div className="col-span-3 text-sm font-medium text-center text-gray-300">
          {/* <nav className="nav__container__actions"> */}
          <ul className="flex flex-wrap -mb-px justify-end">
            <li className="mr-2">
              <Link activeClass="activeStyle" smooth spy offset={-65} to="home"
                className={`inline-block p-3 cursor-pointer rounded-t-lg border-b-2 border-transparent hover:text-white hover:border-gray-300 focus:text-gray-400 focus:border-gray-400`}>
                Home
              </Link>
            </li>
            <li className="mr-2">
              <Link activeClass="activeStyle" smooth spy offset={-65} to="emission_reduction_potential"
                className={`inline-block p-3 cursor-pointer rounded-t-lg border-b-2 border-transparent hover:text-white hover:border-gray-300 focus:text-gray-400 focus:border-gray-400`}>
                Emission Reduction Potential
              </Link>
            </li>
            <li className="mr-2">
              <Link activeClass="activeStyle" smooth spy offset={-65} to="impacts_synergies"
                className={`inline-block p-3 cursor-pointer rounded-t-lg border-b-2 border-transparent hover:text-white hover:border-gray-300 focus:text-gray-400 focus:border-gray-400`}>
                Impacts & Synergies
              </Link>
            </li>
            <li className="mr-2">
              <Link activeClass="activeStyle" smooth spy offset={-85} to="data_explorer"
                className={`inline-block p-3 cursor-pointer rounded-t-lg border-b-2 border-transparent hover:text-white hover:border-gray-300 focus:text-gray-400 focus:border-gray-400`}>
                Data Explorer
              </Link>
            </li>
          </ul>
          {/* </nav> */}
          {/* <ul>
            <li>
              <a href="/homePage" ></a>
            </li>
            <li className="mr-2">
              <a href="/impactsPage" aria-current="page"></a>
            </li>
            <li className="mr-2">
              <a href="/dataExplorerPage" ></a>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  )
}

export default Header;