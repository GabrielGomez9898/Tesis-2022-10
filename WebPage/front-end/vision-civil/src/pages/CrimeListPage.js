import CrimeList from "../components/CrimeList";
import Navbar from "../components/Navbar";

const CrimeListPage = () => {
    return (
    <div className="content">
        <Navbar/>
        <div className="content-container"><CrimeList/></div>
    </div>);
};

export default CrimeListPage;
