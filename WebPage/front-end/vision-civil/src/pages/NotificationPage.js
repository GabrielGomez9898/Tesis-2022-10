import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
const NotificationPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="content-container"><Notification/></div>
        </div>
    );
};

export default NotificationPage;
