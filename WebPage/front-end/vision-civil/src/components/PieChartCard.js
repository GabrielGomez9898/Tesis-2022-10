import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend , LabelList, Tooltip, Customized} from 'recharts';

const PieChartCard = () => {
    const typeChartsData = useSelector((state) => state.typeChartsData.value)

    // const sampleData = {
    //     hurtoViviendaNum: 8,
    //     hurtoPersonaNum: 39,
    //     hurtoVehiculoNum: 20,
    //     vandalismoNum: 12,
    //     violacionNum: 27,
    //     homicidioNum: 12,
    //     agresionNum: 68,
    //     otroNum: 7
    // }

    const data = [
        {
            name: "Hurto de viviendas",
            value: typeChartsData.hurtoViviendaNum
        },
        {
            name: "Hurto a personas",
            value: typeChartsData.hurtoPersonaNum
        },
        {
            name: "Hurto de vehículos",
            value: typeChartsData.hurtoVehiculoNum
        },
        {
            name: "Vandalismo",
            value: typeChartsData.vandalismoNum
        },
        {
            name: "Violación",
            value: typeChartsData.violacionNum
        },
        {
            name: "Homicidio",
            value: typeChartsData.homicidioNum
        },
        {
            name: "Agresión",
            value: typeChartsData.agresionNum
        },
        {
            name: "Otro",
            value: typeChartsData.otroNum
        }
    ]

    const COLORS = ['#3498DB', '#5132FF', '#27AE60', '#8E44AD', "#FD66FF", "#FF4848", "#F39C12", "#1ABC9C"];

    return (
        <ResponsiveContainer className="card-piechart-container" width="100%" height="100%" >
            <PieChart>
                <Pie data={data.sort((a, b) => a.value - b.value)} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={100} outerRadius={150} fill="#8884d8" >
                    <LabelList 
                        dataKey="name" 
                        angle="0" 
                        position="outside" 
                        offset={7.5} 
                        style={{fill: "black", stroke: "black", strokeWidth: 0, fontFamily: ["Manjari", "sansSerif"], fontSize: "0.9rem"}}
                    />
                    <LabelList 
                        dataKey="value" 
                        angle="0" 
                        formatter={(value) => `${((value / 193) * 100).toFixed(0)}%`} 
                        style={{fill: "white", stroke: "white", strokeWidth: 0}} 
                    />
                    {data.map((val, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                {/* <Legend verticalAlign="bottom" iconType="square"></Legend> */}
                {/* <Tooltip/> */}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartCard