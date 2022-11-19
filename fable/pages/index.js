import { useState } from "react";
import Header from '../components/header'
import EmissionRedcutionPotentialComponent from '../components/emission_reduction_potential';
import ImpactsAndSynergiesComponent from '../components/impacts_synergies';
import DataExplorerComponent from '../components/data_explorer';
import HomeComponent from '../components/home';

const consts = require("../consts/consts");

export default function Index() {

  const [country, setCountry] = useState("Albania");

  const countryChange = (e) => {
    setCountry(e.target.value);
  }
  return (
    <>
      <Header />
      <div className="flex m-4 place-content-center items-center">
        <label htmlFor="countries" className="hidden md:block text-xl font-medium text-[#113458] mr-2.5">Country : </label>
        <select id="countries" className="bg-[#113458] bg-opacity-10 border-2 border-[#113458] text-[#113458] text-xl rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-2 w-48" value={country} onChange={countryChange}>
          {/* <option className="text-[#113458]" key={"111"} value={"11"}>222</option> */}
          {
            consts.COUNTRY_LIST.map((countryItem, idx) => (
              <option className="text-[#113458]" key={"country_option" + idx} value={countryItem}>{countryItem}</option>
            ))
          }
        </select>
      </div>

      <section id="home"><HomeComponent country={country} /></section>
      <div className="my-2 mx-8 bg-[#113458] bg-opacity-10 rounded-xl items-center justify-center">
        <section id="emission_reduction_potential"><EmissionRedcutionPotentialComponent country={country} /></section>
        <section id="impacts_synergies"><ImpactsAndSynergiesComponent country={country} /></section>
      </div>
      <section id="data_explorer"><DataExplorerComponent country={country} /></section>
    </>
  )
}
