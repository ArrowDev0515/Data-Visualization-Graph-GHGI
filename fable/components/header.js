import { useEffect } from "react";
import { Link } from 'react-scroll'
import { Menu, Transition, Fragment } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"

const Header = ({}) => {
  useEffect(() => {

  })
  return (
    <>
      <header className="nav"></header>
      <div className="grid grid-cols-4 flex-wrap bg-[#113458] p-2 sticky w-full top-0" style={{ minHeight: "45px", zIndex: "1" }}>
        <div className="text-xs sm:text-md md:text-lg col-span-1 pl-2 flex items-center">
          <a href="/">
            {/* <img src="/logo_white.png" style={{ height: "45px" }} /> */}
            <h4 className="text-white text-center"><b>Mitigation Option <br></br>Catalogue</b></h4>
          </a>
        </div>
        <div className="md:hidden col-start-4 inline-flex justify-end">
          <Menu as="div" className="relative text-left">
            <Menu.Button className="inline-flex w-full justify-end rounded-md px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white hover:bg-opacity-20">
              Menu
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (

                      <button
                        className={`${active ? 'bg-[#113458] text-white' : 'text-[#113458]'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Link smooth spy offset={-65} to="home">Home</Link>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-[#113458] text-white' : 'text-[#113458]'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Link smooth spy offset={-65} to="emission_reduction_potential">Emission Reduction Potential</Link>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-[#113458] text-white' : 'text-[#113458]'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Link smooth spy offset={-65} to="impacts_synergies">Impacts & Synergies</Link>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-[#113458] text-white' : 'text-[#113458]'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Link smooth spy offset={-65} to="data_explorer">Source Data</Link>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="hidden md:block md:col-span-3 text-xs font-medium text-center text-gray-300">
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
                Source Data
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header;