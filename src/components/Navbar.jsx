import { Link, Navigate, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, Logout, isLoggedin } = useUser();
    const handlelogout = () => {
        Logout()
        toast('you have been logout')
        Navigate( '/' );
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#f2f2f2'
        }}>
            <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>miniShop</Link>
            <div style={{
                display: 'flex',
                gap: '20px'
            }}>
                <NavLink to='/' style={
                    (isActive) => ({ color: isActive ? '#ff6600' : '#333' })
                }>Home</NavLink>
                {isLoggedin ? (
                    <>
                    <span style={{color:'Blue'}}>
                        Hi user {user.username}
                    </span>
                    <button onClick={handlelogout}>Exit</button>
                    </>
                ):(
                    <>
                     <NavLink to='/Login' style={(isActive) => ({ color: isActive ? '#ff6600' : '#333' })}>Login</NavLink>
                     <NavLink to='/SignUp' style={(isActive) => ({ color: isActive ? '#ff6600' : '#333' })}>SignUp</NavLink>
                     </>
                )}
                <NavLink to='/Products' style={(isActive) => ({ color: isActive ? '#ff6600' : '#333' })}>Products</NavLink>
                <NavLink to='/Cart' style={(isActive) => ({ color: isActive ? '#ff6600' : '#333' })}>Cart</NavLink>
            </div>
        </nav>
    );
}