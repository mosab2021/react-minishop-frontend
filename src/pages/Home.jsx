import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div>
        <h1>welcome to our shop</h1>
        <p>for observ the products click on the link please</p>
        <Link to='/products'>browse products</Link>
        </div>
    );
}