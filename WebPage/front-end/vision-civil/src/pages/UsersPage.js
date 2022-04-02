import Navbar from "../components/Navbar";
import UsersTable from "../components/UsersTable";
import SignupForm from "../components/SignupForm";

const UsersPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="content-container">
                <UsersTable/>
            </div>
        </div>
    );
};

export default UsersPage;
