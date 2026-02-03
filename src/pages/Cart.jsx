import { Link, useNavigate } from "react-router-dom";
import { usecart } from "../context/CartContext";
import toast from "react-hot-toast";
export default function Cart(){
    const {
        cartitems,
                addToCart,
                removeFromCart,
                clearCart,
                totalPrice,
                totalItems,

    } = usecart()
    const navigate = useNavigate()
    if (cartitems === 0 ){
        return(
            <div style={{textAlign:'center',marginTop:'3rem'}}>
            <h2>your cart is empty</h2>
            <Link to='/product'>go to shop</Link>
            </div>
        );
    }
    return(
        <div style={{maxWidth:'700px',margin:'0px auto'}}>
        <h2>Cart page</h2>
            <ul>
                {cartitems.map((item)=>(
                    <li key={item.id}>
                        <div>
                            <img src={item.image} alt={item.title} style={{width:'60px',height:'60px'}} />
                                <div>
                                    <p>
                                        {item.title}
                                        </p>
                                        <p>
                                            number :
                                        {item.numberOfItem}
                                    </p>
                                </div>
                        </div>
                        <div>
                            <p>
                                {item.price * item.numberOfItem}
                            </p>
                            <button onClick={()=>{
                                removeFromCart(item.id);
                            }}>remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <hr></hr>   
            <h3>
                total {totalItems}
                            <span>total price : {totalPrice}</span>
            </h3>
            <div>
                <button onClick={clearCart}>clear cart</button>
                <button on onClick={()=>{
                    toast.success('order completed')
                    clearCart()
                    setTimeout(()=>{
                        navigate('/products')
                    },2000)
                }} style={{
                    backgroundColor:'#ff6600',
                    color:'#fff',
                    border:'none',
                    borderRadius:'6px',
                    padding:'10px 18px',
                cursor:'pointer'}} >check out</button>
            </div>

        </div>
    );
}