import CrimeMap from "../components/CrimeMap";
import DashboardMap from "../components/DashboardMap";
import Navbar from "../components/Navbar";
import BarChartCard from "../components/BarChartCard";
import PieChartCard from "../components/PieChartCard";
import RadarChartCard from "../components/RadarChartCard";
import LineChartCard from "../components/LineChartCard";
import PolarAreaChartCard from "../components/PolarAreaChartCard";


const DashboardPage = () => {
    return(
        <div>
            <Navbar/>
            <div className="content-container">
                <div className="dashboard-container">
                    <div className="card-map-container">
                        <DashboardMap hasCircleMarkers={true}/>
                    </div>
                    <BarChartCard/>
                    <PieChartCard/>
                    <RadarChartCard/>
                    <LineChartCard/>
                    <PolarAreaChartCard/>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;