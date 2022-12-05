import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function NextFC({ chartConfigs }) {

  const onClick = (eventObj) => {
    var senderChart = eventObj.sender; // chart/ map on which event triggered
  }

  return (
    <>
      <ReactFC {...chartConfigs} fcEvent-dataPlotClick={onClick} className="w-full" />
    </>
  );
}