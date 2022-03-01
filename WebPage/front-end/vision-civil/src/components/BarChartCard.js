import "../styles/Dashboard.scss";
import { useSelector } from "react-redux"; //Hook para acceder valores sobre estados

const BarChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    return (
        <div className="card-barchart-container">
            BarChart {"<" + typeChartsData.lowerDate + ">"} y {"<" + typeChartsData.upperDate + ">"}
        </div>
    )
}

export default BarChartCard