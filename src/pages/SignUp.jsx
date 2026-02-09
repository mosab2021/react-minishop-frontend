// ایمپورت ابزارهای لازم
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // برای استفاده از تابع signUp
import toast from "react-hot-toast";

// کامپوننت صفحه ثبت‌نام
export default function signUp() {

    // گرفتن تابع signUp از UserContext
    // این تابع اطلاعات کاربر را ذخیره و سپس وارد سیستم می‌کند
    const { signUp } = useUser();

    // مدیریت فرم — شامل username و password
    const [form, setForm] = useState({ username: '', password: '' });

    // هوک برای هدایت کاربر بعد از ثبت‌نام
    const navigate = useNavigate();

    // تابع ارسال فرم
    const handlesubmit = (e) => {
        e.preventDefault(); // جلوگیری از رفرش شدن صفحه

        // اعتبارسنجی ساده:
        // حداقل طول username و password باید 3 کاراکتر باشد
        if(form.username.length < 3 || form.password.length < 3){
            toast.error('username and password must be more than 3 characters');
            return; 
        }

        // صدا زدن تابع signUp برای ذخیره کاربر
        // مثال → signUp("ali","1234")
        signUp(
            form.username,
            form.password
        );

        // پیام موفقیت
        toast.success('you have registered successfully');

        // هدایت کاربر به صفحه Login
        navigate('/Login');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Register Page</h2>

            {/* فرم ثبت‌نام */}
            <form onSubmit={handlesubmit}>

                {/* فیلد username */}
                <input
                    type="text"
                    placeholder="username"
                    value={form.username}
                    onChange={(e)=>{
                        // هر تغییری که کاربر بنویسد، state به‌روز می‌شود
                        setForm({ ...form, username: e.target.value });
                    }}
                />

                {/* فیلد password */}
                <input
                    type="password"     // بهتر است پسورد مخفی باشد
                    placeholder="password"
                    value={form.password}
                    onChange={(e)=>{
                        setForm({ ...form, password: e.target.value });
                    }}
                />

                <button type="submit">Register</button>
            </form>

            {/* لینک رفتن به صفحه Login برای کسانی که حساب دارند */}
            <p>
                If you already have an account, enter from here:
                <Link to='/Login'> enter to account </Link>
            </p>
        </div>
    );
}
