import "../styles/Dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { refreshData } from "../features/FunctionaryList";
import React, { PureComponent, useCallback } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend , LabelList, Tooltip, Customized} from 'recharts';

const PieChartCard = () => {
    const dispatch = useDispatch();
    const typeChartsData = useSelector((state) => state.typeChartsData.value)

    let data = [
        {
            name: "Hurto de viviendas",
            value: typeChartsData.hurtoViviendaNum,
            color: "#3498DB"
        },
        {
            name: "Hurto a personas",
            value: typeChartsData.hurtoPersonaNum,
            color: "#0059FF"
        },
        {
            name: "Hurto de vehículos",
            value: typeChartsData.hurtoVehiculoNum,
            color: "#24a124"
        },
        {
            name: "Vandalismo",
            value: typeChartsData.vandalismoNum,
            color: "#1ABC9C"
        },
        {
            name: "Violación",
            value: typeChartsData.violacionNum,
            color: "#FD66FF"
        },
        {
            name: "Homicidio",
            value: typeChartsData.homicidioNum,
            color: "#FF4848"
        },
        {
            name: "Agresión",
            value: typeChartsData.agresionNum,
            color: "#FF7B00"
        },
        {
            name: "Otro",
            value: typeChartsData.otroNum,
            color: "#808080"
        }
    ]

    const numberOfReports = data.reduce((acc, obj) => acc += obj.value, data[0].value);

    data = data.sort((a, b) => a.value - b.value).filter(({value}) => value != 0);

    console.log(numberOfReports);

    const formatToPercentage = useCallback((value) => `${((value / numberOfReports) * 100).toFixed(0)}%`, []);

    const COLORS = ['#00C3FF', '#0059FF', '#006800', '#00FF62', "#FF00FF", "#FF0000", "#FF7B00", "#000000"];

    return (
        <ResponsiveContainer className="card-piechart-container" width="100%" height="100%" >
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={100} outerRadius={150} fill="#8884d8" animationDuration={1000} >
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
                        formatter={(value) => `${((value / numberOfReports) * 100).toFixed(0)}%`} 
                        style={{fill: "white", stroke: "white", strokeWidth: 0}} 
                    />
                    {data.map((val, i) => (
                        <Cell key={`cell-${i}`} fill={data[i % data.length].color} />
                    ))}
                </Pie>
                {/* <Legend verticalAlign="bottom" iconType="square"></Legend> */}
                {/* <Tooltip/> */}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartCard