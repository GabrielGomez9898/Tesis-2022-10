import "../styles/Navbar.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    let navigate = useNavigate();

    const { logout } = useAuth();

    const exit = async () => {
        await logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="logo">
                    <a className="nav-link" style={{cursor:"default"}}>
                        <span className="link-text logo-text">Visión Civil</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="angle-double-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                        >
                            <g className="fa-group">
                                <path
                                    fill="currentColor"
                                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                    className="fa-secondary"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                    className="fa-primary"
                                ></path>
                            </g>
                        </svg>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" onClick={() => {navigate("/")}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="analytics"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="svg-inline--fa fa-analytics fa-w-18 fa-7x"
                        >
                            <g className="fa-group">
                                <path 
                                    fill="currentColor" 
                                    d="M510.62 92.63l-95.32 76.28a48.66 48.66 0 0 1 .7 7.09 48 48 0 0 1-96 0 47.44 47.44 0 0 1 .71-7.1l-95.33-76.27a45.11 45.11 0 0 1-29.66 1.59l-101.5 101.5A47.9 47.9 0 1 1 48 160a47.87 47.87 0 0 1 12.28 1.78l101.5-101.5A47.87 47.87 0 0 1 160 48a48 48 0 0 1 96 0 47.44 47.44 0 0 1-.71 7.1l95.32 76.26a46.5 46.5 0 0 1 34.76 0l95.34-76.27A48.66 48.66 0 0 1 480 48a48.36 48.36 0 1 1 30.62 44.63z" 
                                    class="fa-secondary">
                                </path>
                                <path 
                                    fill="currentColor" 
                                    d="M400 320h-64a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V336a16 16 0 0 0-16-16zm160-128h-64a16 16 0 0 0-16 16v288a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V208a16 16 0 0 0-16-16zm-320 0h-64a16 16 0 0 0-16 16v288a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V208a16 16 0 0 0-16-16zM80 352H16a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V368a16 16 0 0 0-16-16z" 
                                    class="fa-primary">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Estadísticas</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" onClick={() => {navigate("/crime-list")}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="th-list"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-th-list fa-w-16 fa-7x"
                        >
                            <g className="fa-group">
                                <path 
                                    fill="currentColor" 
                                    d="M488 352H205.33a24 24 0 0 0-24 24v80a24 24 0 0 0 24 24H488a24 24 0 0 0 24-24v-80a24 24 0 0 0-24-24zm0-320H205.33a24 24 0 0 0-24 24v80a24 24 0 0 0 24 24H488a24 24 0 0 0 24-24V56a24 24 0 0 0-24-24zm0 160H205.33a24 24 0 0 0-24 24v80a24 24 0 0 0 24 24H488a24 24 0 0 0 24-24v-80a24 24 0 0 0-24-24z" 
                                    class="fa-secondary">
                                </path>
                                <path 
                                    fill="currentColor" 
                                    d="M125.33 192H24a24 24 0 0 0-24 24v80a24 24 0 0 0 24 24h101.33a24 24 0 0 0 24-24v-80a24 24 0 0 0-24-24zm0-160H24A24 24 0 0 0 0 56v80a24 24 0 0 0 24 24h101.33a24 24 0 0 0 24-24V56a24 24 0 0 0-24-24zm0 320H24a24 24 0 0 0-24 24v80a24 24 0 0 0 24 24h101.33a24 24 0 0 0 24-24v-80a24 24 0 0 0-24-24z" 
                                    class="fa-primary">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Listado de crímenes</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" onClick={() => {navigate("/notification")}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="paper-plane"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-paper-plane fa-w-16 fa-7x"
                        >
                            <g className="fa-group">
                                <path 
                                    fill="currentColor" 
                                    d="M245.53 410.5l-75 92.83c-14 17.1-42.5 7.8-42.5-15.8V358l280.26-252.77c5.5-4.9 13.3 2.6 8.6 8.3L191.72 387.87z" 
                                    class="fa-secondary">
                                </path>
                                <path 
                                    fill="currentColor" 
                                    d="M511.59 28l-72 432a24.07 24.07 0 0 1-33 18.2l-214.87-90.33 225.17-274.34c4.7-5.7-3.1-13.2-8.6-8.3L128 358 14.69 313.83a24 24 0 0 1-2.2-43.2L476 3.23c17.29-10 39 4.6 35.59 24.77z" 
                                    class="fa-primary">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Notificar ciudadanos</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" onClick={() => {navigate("/control")}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="user-plus"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="svg-inline--fa fa-user-plus fa-w-20 fa-7x"
                        >
                            <g className="fa-group">
                                <path 
                                    fill="currentColor" 
                                    d="M640 224v32a16 16 0 0 1-16 16h-64v64a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-64h-64a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h64v-64a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16v64h64a16 16 0 0 1 16 16z" 
                                    class="fa-secondary">
                                </path>
                                <path 
                                    fill="currentColor" 
                                    d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm89.6 32h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z" 
                                    class="fa-primary">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Usuarios</span>
                    </a>
                </li>

                {/* <li className="nav-item">
                    <a className="nav-link">
                        <span className="link-text">{user?.email}</span>
                    </a>
                </li> */}

                <li className="nav-item">
                    <a className="nav-link" onClick={exit}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="door-open"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="svg-inline--fa fa-door-open fa-w-20 fa-7x"
                        >
                            <g className="fa-group">
                                <path 
                                    fill="currentColor" 
                                    d="M0 464v32a16 16 0 0 0 16 16h336v-64H16a16 16 0 0 0-16 16zm624-16h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" 
                                    class="fa-secondary">
                                </path>
                                <path 
                                    fill="currentColor" 
                                    d="M312.24 1l-192 49.74C106 54.44 96 67.7 96 82.92V448h256V33.18C352 11.6 332.44-4.23 312.24 1zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z" 
                                    class="fa-primary">
                                </path>
                            </g>
                        </svg>
                        <span className="link-text">Cerrar sesión</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;