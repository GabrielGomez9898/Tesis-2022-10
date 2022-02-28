import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";

const AreaChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    return (
        <div className="card-areachart-container">
            AreaChart {"<" + typeChartsData.lowerDate + ">"} y {"<" + typeChartsData.upperDate + ">"}
        </div>
    )
}

export default AreaChartCard