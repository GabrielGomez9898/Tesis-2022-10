import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {

    return (
        <div>
            <Navbar/>
            <div className="content-container">
                <SignupForm />
            </div>
        </div>
    );
}

export default SignupPage;