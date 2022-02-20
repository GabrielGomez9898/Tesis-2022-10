import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import ControlPage from "./pages/ControlPage";
import CrimeListPage from "./pages/CrimeListPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from './components/Navbar';
import { AuthContextProvider, auth } from "./firebase";
import AuthenticatedOutlet from './components/AuthenticatedOutlet';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />

          <Route path="/" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<DashboardPage/>} />
          </Route>
          <Route path="/crime-list" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<CrimeListPage/>} />
          </Route>
          <Route path="/notification" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<NotificationPage/>} />
          </Route>
          <Route path="/profile" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<ProfilePage/>} />
          </Route>
          <Route path="/control" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<ControlPage/>} />
          </Route>
          <Route path="/forgotten-password" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<ForgottenPasswordPage/>} />
          </Route>

          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
