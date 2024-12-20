import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LogoutButton from './LogoutButton'



const NavBar = () => {

    const { isAuthenticated } = useAuth()

    return (
        <>
            <nav>
                <ul className=" flex place-content-around mb-8">
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/movies'><li>Movies</li></Link>
                    <Link to='/cars'><li>Cars</li></Link>
                    {isAuthenticated ? (
                        <>
                        
                            <Link to='/profile'><li>Profile</li></Link>
                            <LogoutButton />
                           
                        </>
                    )
                        : (
                            <>
                                <Link to='/register'><li>Register</li></Link>
                                <Link to='/login'><li>Login</li></Link>
                            </>
                        )
                    }

                </ul>
            </nav>
        </>
    )
}


export default NavBar