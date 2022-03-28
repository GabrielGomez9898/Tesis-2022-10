import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label, Area, AreaChart } from "recharts";

const LineChartCard = () => {
    const timeChartsData = useSelector((state) => state.timeChartsData.value);

    const data = timeChartsData;

    return (
        <div className="card-linechart-container">
            <ResponsiveContainer width="100%" height="100%" >
                <AreaChart width={730} height={250} data={data} margin={{ top: 35, right: 35, left: 0, bottom: 10 }}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="periodo" 
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
                    <Tooltip />
                    <Area type="monotone" dataKey="reportes" stroke="#8884d8" fillOpacity={1} fill="url(#color)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartCard