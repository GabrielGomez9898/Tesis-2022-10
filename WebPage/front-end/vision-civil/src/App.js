import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import ControlPage from "./pages/ControlPage";
import CrimeListPage from "./pages/CrimeListPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/notification" element={<NotificationPage/>} />
        <Route path="/control" element={<ControlPage/>} />
        <Route path="/crime-list" element={<CrimeListPage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
