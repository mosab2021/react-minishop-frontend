import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { usecart } from "../context/CartContext";
import { BiPhone } from "react-icons/bi";



export default function checkedout() {
    const {
        cartitems,
        clearCart,
        totalPrice
    } = usecart()
    const { user } = useUser()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        address:''
        , name : ''
        , phone : ''
        , email:''
    })
    const [errors,setErrors] = useState({});

    const validateForm = ()=>{
        const newErrors = {}
        if(!form.name.trim()) newErrors.name = 'name required'
        if(!form.address.trim()) newErrors.address = 'address is required'
        if(!form.phone.match(/^09[0-9]{10,}$/)) newErrors.phone = 'phone number is required'
        if(!form.email.match(/^[^\s@]+@[^@\s@]+\.[^\s@]+@/)) newErrors.email = 'email is required'
        return newErrors
    }
    const handlesubmit = (e) =>{
        e.preventDefault();
        const validation = validateForm();
        setErrors(validation)
        if (Object.keys(validation).length === 0){
            toast.loading('Loading Form Please Wait',{duration:1000})
            setTimeout(() => {
            toast.success(`Your Order Has Been Submited ${form.name}`)      
            clearCart();
            navigate('/');
            },1500);
            
        }
        else{
            toast.error('Your Form Has Problems')
            console.log(validation)
        }
    }
    return(
        <div>
            <h2>submit order</h2>
            <p> user : {user?.username}</p>
            <p>totalPrice : ${totalPrice}</p>
            <form onSubmit={handlesubmit}>
                <div>
                    <label>name</label>
                    <input type="text" value={form.name}onChange={(e)=>{
                setForm({...form, name : e.target.value})
            }}
           />
           {errors.name && <span style={{color : 'red'}}>{errors.name}</span>}
                </div>
                                <div>
                    <label>email</label>
                    <input type="text" value={form.email}onChange={(e)=>{
                setForm({...form, email : e.target.value})
            }}
           />
           {errors.address && <span style={{color : 'red'}}>{errors.address}</span>}
                </div>
                                <div>
                    <label>adress</label>
                    <input type="text" value={form.address}onChange={(e)=>{
                setForm({...form, address : e.target.value})
            }}
           />
           {errors.phone && <span style={{color : 'red'}}>{errors.phone}</span>}
                </div>
                                <div>
                    <label>phone</label>
                    <input type="text" value={form.phone}onChange={(e)=>{
                setForm({...form, phone : e.target.value})
            }}
           />
                </div>
                <button type="submit">set order</button>
            </form>
        </div>
    );
}