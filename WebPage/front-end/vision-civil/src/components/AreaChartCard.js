import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AreaChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value);

    const sampleData = {
        totalReportsByPeriod: [],

        totalReportsByType: [
            {
                periodo: "2022",
                reportesPorTipo: [
                    {
                        tipo: "Hurto de viviendas",
                        reportes: 369
                    },
                    {
                        tipo: "Hurto a personas",
                        reportes: 571
                    },
                    {
                        tipo: "Hurto de vehículos",
                        reportes: 403
                    },
                    {
                        tipo: "Vandalismo",
                        reportes: 198
                    },
                    {
                        tipo: "Violación",
                        reportes: 260
                    },
                    {
                        tipo: "Homicidio",
                        reportes: 490
                    },
                    {
                        tipo: "Agresión",
                        reportes: 809
                    },
                    {
                        tipo: "Otro",
                        reportes: 162
                    },
                ]
            },
            {
                periodo: "2023",
                reportesPorTipo: [
                    {
                        tipo: "Hurto de viviendas",
                        reportes: 328
                    },
                    {
                        tipo: "Hurto a personas",
                        reportes: 860
                    },
                    {
                        tipo: "Hurto de vehículos",
                        reportes: 391
                    },
                    {
                        tipo: "Vandalismo",
                        reportes: 275
                    },
                    {
                        tipo: "Violación",
                        reportes: 308
                    },
                    {
                        tipo: "Homicidio",
                        reportes: 502
                    },
                    {
                        tipo: "Agresión",
                        reportes: 1003
                    },
                    {
                        tipo: "Otro",
                        reportes: 190
                    },
                ]

            },
            {
                periodo: "2024",
                reportesPorTipo: [
                    {
                        tipo: "Hurto de viviendas",
                        reportes: 260
                    },
                    {
                        tipo: "Hurto a personas",
                        reportes: 839
                    },
                    {
                        tipo: "Hurto de vehículos",
                        reportes: 420
                    },
                    {
                        tipo: "Vandalismo",
                        reportes: 211
                    },
                    {
                        tipo: "Violación",
                        reportes: 671
                    },
                    {
                        tipo: "Homicidio",
                        reportes: 455
                    },
                    {
                        tipo: "Agresión",
                        reportes: 759
                    },
                    {
                        tipo: "Otro",
                        reportes: 93
                    },
                ]
            },
            {
                periodo: "2025",
                reportesPorTipo: [
                    {
                        tipo: "Hurto de viviendas",
                        reportes: 189
                    },
                    {
                        tipo: "Hurto a personas",
                        reportes: 496
                    },
                    {
                        tipo: "Hurto de vehículos",
                        reportes: 294
                    },
                    {
                        tipo: "Vandalismo",
                        reportes: 95
                    },
                    {
                        tipo: "Violación",
                        reportes: 744
                    },
                    {
                        tipo: "Homicidio",
                        reportes: 380
                    },
                    {
                        tipo: "Agresión",
                        reportes: 560
                    },
                    {
                        tipo: "Otro",
                        reportes: 43
                    },
                ]
            }
        ],
    }

    const data = sampleData.totalReportsByType.map((val) => {
        let object = {};
        object["periodo"] = val.periodo;
        val.reportesPorTipo.forEach((val) => object[val.tipo] = val.reportes)
        return object;
    });

    const COLORS = ['#3498DB', '#5132FF', '#27AE60', '#8E44AD', "#FD66FF", "#FF4848", "#F39C12", "#1ABC9C"];

    return (
        <div className="card-areachart-container">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} width={730} height={250} margin={{ top: 35, right: 35, left: 0, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorHurtoVivienda" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorHurtoPersona" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorHurtoVehiculo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[2]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[2]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorVandalismo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[3]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[3]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorViolacion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[4]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[4]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorHomicidio" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[5]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[5]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorAgresion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[6]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[6]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOtro" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[7]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS[7]} stopOpacity={0} />
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
                    <YAxis width={70} tickLine={false} tickMargin={-3} style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}>
                        <Label 
                            position={"left"} 
                            angle={-90} 
                            offset={-20} 
                            style={{color: "black", fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}>
                                Numero de reportes
                        </Label>    
                    </YAxis>
                    <Tooltip offset={25}/>
                    <Area type="monotone" dataKey="Hurto de viviendas" stroke={COLORS[0]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Hurto a personas" stroke={COLORS[1]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Hurto de vehículos" stroke={COLORS[2]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Vandalismo" stroke={COLORS[3]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Violación" stroke={COLORS[4]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Homicidio" stroke={COLORS[5]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Agresión" stroke={COLORS[6]} strokeWidth={2} fillOpacity={1} fill="none" />
                    <Area type="monotone" dataKey="Otro" stroke={COLORS[7]} strokeWidth={2} fillOpacity={1} fill="none" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AreaChartCard