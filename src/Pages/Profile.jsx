import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function Profile() {
    let naviagte = useNavigate()
    const {isAuthenticated} = useAuth()

    useEffect(async () => {
        const token = localStorage.getItem('token')
        if(!isAuthenticated && !token){
            navigate('/')
        }
        else{
            const decodedToken = jwtDecode(token)
            const fethUserById = await axios.get(`http://localhost:3002/user/${decodedToken.user}`)
            console.log(fethUserById)
        }
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Profile</h2>
                    <div>
                        <p className="text-gray-700 mb-4">
                            <strong>Email:</strong> 
                        </p>

                        <LogoutButton />
                    </div>
            </div>
        </div>
    );
}
