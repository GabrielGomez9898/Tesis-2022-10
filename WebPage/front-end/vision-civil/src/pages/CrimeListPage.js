import Crime_list from "../components/Crime_list";
import Navbar from "../components/Navbar";

const CrimeListPage = () => {
    return (
    <div className="content">
        <Navbar/>
        <div className="content-container"><Crime_list/></div>
    </div>);
};

export default CrimeListPage;
