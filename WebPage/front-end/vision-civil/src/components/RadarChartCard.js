import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";

const RadarChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    return (
        <div className="card-radarchart-container">
            RadarChart {"<" + typeChartsData.lowerDate + ">"} y {"<" + typeChartsData.upperDate + ">"}
        </div>
    )
}

export default RadarChartCard