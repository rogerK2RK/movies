import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
        >
            Logout
        </button>
    );
}
