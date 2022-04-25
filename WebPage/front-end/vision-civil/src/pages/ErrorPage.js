import "../styles/Error.scss";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page-container">
            <img src={logo} alt=""/>
            <h1>Upsss <span>!</span></h1>
            <h2>Buscando cosas que no deberías?</h2>
            <p>La página a la que estás tratando de acceder no existe, es posible que hayas cometido un error de escritura en la barra de búsqueda</p>
            <button onClick={() => navigate("/")}>Devuélvete por donde viniste</button>
        </div>
    );
};

export default ErrorPage;
