import { useNavigate } from "react-router-dom";
import google_icon from "../../assets/social_icon/google.png"
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { userSave } from "../../utilities/utils";

const SocialLogin = () => {
    const { setUser, signInGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInGoogle()
            setUser(result.user);
            await userSave(result?.user);
            navigate(location?.state ? location.state : "/");
            toast.success("Successfully Login");
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="flex justify-center ">
            <div onClick={handleGoogleLogin} className="border cursor-pointer rounded-md hover:bg-gray-100 p-1 w-full flex justify-center items-center gap-6">
                <img  src={google_icon} alt="google-icon" className="w-8 cursor-pointer" />
                <p className="font-medium">Sign in with Google</p>
            </div>

        </div>
    );
};

export default SocialLogin;