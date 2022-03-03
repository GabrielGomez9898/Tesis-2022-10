import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";

const LineChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    return (
        <div className="card-linechart-container">
            LineChart {"<" + typeChartsData.lowerDate + ">"} y {"<" + typeChartsData.upperDate + ">"}
        </div>
    )
}

export default LineChartCard