import { useState, useEffect } from "react";
import Header from '../components/header';
import EmissionRedcutionPotentialComponent from '../components/emission_reduction_potential';
import HomeComponent from '../components/home';
import Footer from "../components/footer";

const consts = require("../consts/consts");
const dataSrc = require("../consts/221201_HomePage.json");

export default function Index() {

  const [country, setCountry] = useState(consts.COUNTRY_CHINA);
  const [countryList, setCountryList] = useState([]);


  useEffect(() => {
    getCountryList();
  }, [country]);

  const getCountryList = () => {
    // get year list
    let countryArr = [];
    countryArr = dataSrc.map((ele) => {
      return ele["Party"];
    }).reduce(
      (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
      [],
    );
    countryArr = countryArr.sort((a, b) => {
      if (a > b)
        return 1;
      else return -1;
    })
    setCountryList(countryArr);
  }
  const countryChange = (e) => {
    setCountry(e.target.value);
  }
  return (
    <>
      <Header />
      <div className="flex m-4 place-content-center items-center">
        <label htmlFor="countries" className="text-xl font-medium text-[#113458] mr-2.5">Country : </label>
        <select id="countries" className="bg-[#113458] bg-opacity-10 border-2 border-[#113458] text-[#113458] text-xl rounded-lg focus:text-[#113458] focus:border-[#113458] focus-visible:outline-none block p-2 w-48" value={country} onChange={countryChange}>
          {
            countryList.map((countryItem, idx) => (
              <option className="text-[#113458]" key={"country_option" + idx} value={countryItem}>{countryItem}</option>
            ))
          }
        </select>
      </div>

      <section id="home"><HomeComponent country={country} /></section>
      <div className="my-2 mx-8 bg-[#113458] bg-opacity-10 rounded-xl items-center justify-center">
        <EmissionRedcutionPotentialComponent country={country} />
      </div>
      <Footer/>
    </>
  )
}
