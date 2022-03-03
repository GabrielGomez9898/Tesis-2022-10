import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";

const PieChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value)

    return (
        <div className="card-piechart-container">
            PieChart {"<" + typeChartsData.lowerDate + ">"} y {"<" + typeChartsData.upperDate + ">"}
        </div>
    )
}

export default PieChartCard