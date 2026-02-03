import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function MainLayouts(){
    return(
        <>
        <Navbar/>
        <main style={{
            padding : '20px',
            minHeight:'80vh'
            }}>
            <Outlet/>
        </main>
        <Footer/>
        </>        
    );
}