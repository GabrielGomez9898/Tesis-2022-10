import "../styles/Dashboard.scss";
import { useSelector } from "react-redux"; //Hook para acceder valores sobre estados
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, LabelList, Cell, Label } from "recharts";

const BarChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    let data = [
        {
            reportType: "Hurto de viviendas",
            A: typeChartsData.hurtoViviendaNum,
            color: "#3498DB"
        },
        {
            reportType: "Hurto a personas",
            A: typeChartsData.hurtoPersonaNum,
            color: "#0059FF"
        },
        {
            reportType: "Hurto de vehículos",
            A: typeChartsData.hurtoVehiculoNum,
            color: "#24a124"
        },
        {
            reportType: "Vandalismo",
            A: typeChartsData.vandalismoNum,
            color: "#1ABC9C"
        },
        {
            reportType: "Violación",
            A: typeChartsData.violacionNum,
            color: "#FD66FF"
        },
        {
            reportType: "Homicidio",
            A: typeChartsData.homicidioNum,
            color: "#FF4848"
        },
        {
            reportType: "Agresión",
            A: typeChartsData.agresionNum,
            color: "#FF7B00"
        },
        {
            reportType: "Otro",
            A: typeChartsData.otroNum,
            color: "#808080"
        }
    ]

    data = data.sort((a, b) => a.A - b.A);

    const COLORS = ['#3498DB', '#5132FF', '#27AE60', '#8E44AD', "#FD66FF", "#FF4848", "#F39C12", "#1ABC9C"];

    return (
        <div className="card-barchart-container">
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={data} width={730} height={250} barCategoryGap="0%" margin={{ top: 35, right: 35, left: 0, bottom: 10 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="reportType" 
                        angle={-45} 
                        interval={0} 
                        height={100} 
                        tickSize={48}
                        style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}
                    />
                    <YAxis width={70} tickSize={0} style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}>
                        <Label 
                            position={"left"} 
                            angle={-90} 
                            offset={-20} 
                            style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}>
                                Numero de reportes
                        </Label>
                    </YAxis>
                    <Bar dataKey="A" fill="#8884d8">
                        <LabelList dataKey="A" style={{fill: "white", stroke: "white", strokeWidth: 0}}/>
                        {data.map((val, i) => (
                            <Cell key={`cell-${i}`} fill={data[i % data.length].color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartCard