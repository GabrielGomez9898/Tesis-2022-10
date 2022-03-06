import "../styles/Dashboard.scss";
import { useSelector } from "react-redux"; //Hook para acceder valores sobre estados
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const BarChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    const sampleData = {
        hurtoViviendaNum: 8,
        hurtoPersonaNum: 39,
        hurtoVehiculoNum: 20,
        vandalismoNum: 12,
        violacionNum: 27,
        homicidioNum: 12,
        agresionNum: 68,
        otroNum: 7
    }

    const data = [
        {
            reportType: "Hurto de viviendas",
            A: sampleData.hurtoViviendaNum
        },
        {
            reportType: "Hurto a personas",
            A: sampleData.hurtoPersonaNum
        },
        {
            reportType: "Hurto de vehículos",
            A: sampleData.hurtoVehiculoNum
        },
        {
            reportType: "Vandalismo",
            A: sampleData.vandalismoNum
        },
        {
            reportType: "Violación",
            A: sampleData.violacionNum
        },
        {
            reportType: "Homicidio",
            A: sampleData.homicidioNum
        },
        {
            reportType: "Agresión",
            A: sampleData.agresionNum
        },
        {
            reportType: "Otro",
            A: sampleData.otroNum
        }
    ]

    return (
        <>
        </>
    )
}

export default BarChartCard