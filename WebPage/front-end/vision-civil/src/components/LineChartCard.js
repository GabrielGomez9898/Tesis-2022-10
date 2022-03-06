import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label } from "recharts";

const LineChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    const sampleData = {
        reportsByPeriod: [
            {
                reportes: 20,
                periodo: "Lunes"
            },
            {
                reportes: 3,
                periodo: "Martes"
            },
            {
                reportes: 6,
                periodo: "Miércoles"
            },
            {
                reportes: 2,
                periodo: "Jueves"
            },
            {
                reportes: 1,
                periodo: "Viernes"
            },
            {
                reportes: 23,
                periodo: "Sábado"
            },
            {
                reportes: 9,
                periodo: "Domingo"
            }
        ],

        hurtoViviendaByPeriod: [],
        hurtoPersonaByPeriod: [],
        hurtoVehiculoByPeriod: [],
        vandalismoByPeriod: [],
        violacionByPeriod: [],
        homicidioByPeriod: [],
        agresionByPeriod: [],
        otroByPeriod: []
    }

    const data = sampleData.reportsByPeriod;

    return (
        <div className="card-linechart-container">
            <ResponsiveContainer width="100%" height="100%" >
                <LineChart width={730} height={250} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="periodo" 
                        angle={-45} 
                        interval={0} 
                        height={100} 
                        tickSize={48} 
                        padding={{right: 30}} 
                        style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}} 
                    />
                    <YAxis width={60} tickSize={0} padding={{top: 30}}>
                    <Label 
                        position={"left"} 
                        angle={-90} 
                        offset={-20} 
                        style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}>
                            Numero de reportes
                    </Label>
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="reportes" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartCard