import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
export default function Login(){
    const {Login} = useUser()
    const [form,setForm]=useState({username :'' ,password : ''})
    const {navigate} = useNavigate()
    const handlesubmit = (e)=>{e.preventDefault()
        const success = Login(form.username, form.password);
        if(success){
            toast.success('you have logged in successfuly')
            navigate('/proudct')
        }
        else{
            toast.error('please enter your information')
        }
    }
    return(
        <div>
        <h2>Login page</h2>
        <form onSubmit={handlesubmit}>
            <input
            type="text"
            placeholder="username"
            value={form.username}
            onChange={(e)=>{
                setForm({...form,username:e.target.value})
            }}
            
            />
            <input
            type="text"
            placeholder="password"
            value={form.password}
            onChange={(e)=>{
                setForm({...form,password:e.target.value})
            }}
            />
            <button type="submit">Login</button>
        </form>
        <p>if you don't have account <Link to={'/signUp'}>reigster</Link></p>
        </div>
    );
}