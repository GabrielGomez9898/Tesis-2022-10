import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";
import { PolarAngleAxis, PolarGrid, RadarChart, ResponsiveContainer, Radar, Legend, PolarRadiusAxis, Tooltip, Label, LabelList } from "recharts";

const RadarChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    const biggest = Math.max(...Object.values(typeChartsData))

    const round5 = (x) => {
        console.log(Math.ceil(x / 5) * 5);
        return Math.ceil(x / 5) * 5;
    }

    const data = [
        {
            reportType: "Hurto de viviendas",
            A: typeChartsData.hurtoViviendaNum,
            fullMark: biggest
        },
        {
            reportType: "Hurto a personas",
            A: typeChartsData.hurtoPersonaNum,
            fullMark: biggest
        },
        {
            reportType: "Hurto de vehículos",
            A: typeChartsData.hurtoVehiculoNum,
            fullMark: biggest
        },
        {
            reportType: "Vandalismo",
            A: typeChartsData.vandalismoNum,
            fullMark: biggest
        },
        {
            reportType: "Violación",
            A: typeChartsData.violacionNum,
            fullMark: biggest
        },
        {
            reportType: "Homicidio",
            A: typeChartsData.homicidioNum,
            fullMark: biggest
        },
        {
            reportType: "Agresión",
            A: typeChartsData.agresionNum,
            fullMark: biggest
        },
        {
            reportType: "Otro",
            A: typeChartsData.otroNum,
            fullMark: biggest
        }
    ]

    return (
        <ResponsiveContainer className="card-radarchart-container" width="100%" height="100%">
            <RadarChart data={data} outerRadius={150} width={730} height={250}>
                <PolarGrid/>
                <PolarAngleAxis dataKey="reportType" style={{fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}/>
                <PolarRadiusAxis angle={90} domain={[0, round5(biggest)]} style={{fontSize: "0.8rem"}} tick={false}/>
                <Radar name="Reportes" dataKey="A" stroke="#FFCC00" fill="#FFCC00" fillOpacity={0.3} animationDuration={1000} />
                <Tooltip/>
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default RadarChartCard