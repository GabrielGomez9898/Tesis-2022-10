import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {

    return (
        <>
            <Navbar/>
            <div className="content-container">
                <SignupForm />
            </div>
        </>
    );
}

export default SignupPage;