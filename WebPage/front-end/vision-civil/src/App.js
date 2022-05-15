import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotificationPage from "./pages/NotificationPage";
import UsersPage from "./pages/UsersPage";
import CrimeListPage from "./pages/CrimeListPage";
import ErrorPage from "./pages/ErrorPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { AuthContextProvider } from './contexts/AuthContext';
import AuthenticatedOutlet from './components/AuthenticatedOutlet';
import MasterOutlet from './components/MasterOutlet';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "Visión Civil";
  }, []);

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
          <Route path="/users" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<MasterOutlet/>}>
              <Route path="" element={<UsersPage/>} />
            </Route>
          </Route>
          <Route path="/password" element={<AuthenticatedOutlet/>}>
            <Route path="" element={<ChangePasswordPage/>} />
          </Route>

          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
