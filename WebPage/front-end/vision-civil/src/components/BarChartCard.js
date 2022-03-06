import "../styles/Dashboard.scss";
import { useSelector } from "react-redux"; //Hook para acceder valores sobre estados
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, LabelList, Cell, Label } from "recharts";

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

    const COLORS = ['#3498DB', '#5132FF', '#27AE60', '#8E44AD', "#FD66FF", "#FF4848", "#F39C12", "#1ABC9C"];

    return (
        <div className="card-barchart-container">
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={data.sort((a, b) => a.A - b.A)} width={730} height={250} barCategoryGap="0%">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="reportType" angle={-45} interval={0} height={100} tickSize={48} padding={{left:30, right: 30}} style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}/>
                    <YAxis width={60} tickSize={0} padding={{top: 30}}>
                        <Label position={"left"} angle={-90} offset={-20}>Numero de reportes</Label>
                    </YAxis>
                    <Bar dataKey="A" fill="#8884d8">
                        <LabelList dataKey="A" style={{fill: "white", stroke: "white", strokeWidth: 0}}/>
                        {data.map((val, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartCard