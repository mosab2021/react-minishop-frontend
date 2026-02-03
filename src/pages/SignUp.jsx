import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

export default function signUp() {
    const { signUp } = useUser();
    const [form, setForm] = useState({ username: '', password: '' })
    const  navigate  = useNavigate()
    const handlesubmit = (e) => {
        e.preventDefault()
        if(form.username.length< 3 || form.password.length < 3 ){
            toast.error('username and password must be more then 3 word')
            return
        }
        signUp(
            form.username,
            form.password
        )
        toast.success('you have login successfuly')
        navigate('/Login')
        }
        return (
            <div style={{maxWidth:'400px',margin:'2rem auto'}}>
                <h2>Register Page</h2>
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
            <button type="submit">Register</button>
                </form>
                <p>
                    if you have an account enter from here
                    <Link to ='/Login' >enter to account</Link>
                </p>
            </div>
        );
    }