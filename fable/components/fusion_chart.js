import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

// const dataSource = {
//   chart: {
//     // caption: "12,301MtCO2e",
//     // subCaption: "In MMbbl = One Million barrels",

//     bgColor: "#000000",
//     bgAlpha: "20",


//     // captionFontSize: "18",
//     // captionFontColor: "#ffffff",
//     // baseFontColor: "#ff0000",
//     labelFontSize: "16",
//     labelFontColor: "#cccccc",

//     // defaultcenterlabelColor: "#cccccc",

//     smartLineColor: "#ffffff",
//     legendItemFontColor: "#ffffff",
//     labelDistance: 0,
//     // plotBorderColor: "#ffffff",
//     // centerlabel: "# Users: $value",
//     // showpercentvalues: "1",
//     useDataPlotColorForLabels: "1",
//     legendCaptionFontColor: "#ff0000",
//     defaultcenterlabel: "12,301MtCO2e",
//     defaultcenterlabelColor: "#ffffff",
//     tooltipBorderRadius: "10",
//     plottooltext: `<b>$percentValue</b> of our Android users are on <b>$label</b>`,
//     // toolTipColor: "#ffff00",
//     // plotFillHoverColor:"ff0000",
//     showlabels: "0",
//     link: "#ff0000",
//     // labelBorderColor: "#00ffaa",

//     theme: "fusion"
//   },
//   data: [
//     { label: "Venezuela", value: "290", color: "#9b59b6" },
//     { label: "Saudi", value: "260" },
//     { label: "Canada", value: "180" },
//     { label: "Iran", value: "140" },
//     { label: "Russia", value: "115" },
//     { label: "UAE", value: "100" },
//     { label: "US", value: "30" },
//     { label: "China", value: "30" }
//   ]
// };

// const chartConfigs = {
//   type: "doughnut2d",
//   width: "100%",
//   height: "100%",
//   dataFormat: "JSON",
//   containerBackgroundOpacity: "0",
//   dataSource: dataSource
// };

export default function NextFC({chartConfigs}) {
  // const FusionCharts = require("fusioncharts");
  // const charts = require("fusioncharts/fusioncharts.charts");
  // const FusionTheme = require("fusioncharts/themes/fusioncharts.theme.fusion.js");
  // const { default: ReactFC } = require("react-fusioncharts");

  
  const onClick = (eventObj) => {
    var senderChart = eventObj.sender; // chart/ map on which event triggered
    console.log(chartConfigs.dataSource);
  }
  


  return <ReactFC {...chartConfigs} fcEvent-dataPlotClick={onClick} className="w-full"/>;
}