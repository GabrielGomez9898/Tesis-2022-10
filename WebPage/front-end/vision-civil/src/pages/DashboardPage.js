import DashboardMap from "../components/DashboardMap";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
    return(
        <div>
            <Navbar/>
            <div className="content-container"><DashboardMap /></div>
        </div>
    );
}

export default DashboardPage;