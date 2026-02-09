// ایمپورت ابزارهای مورد نیاز
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // دسترسی به Login از UserContext
import toast from "react-hot-toast";

// کامپوننت صفحه ورود
export default function Login(){

    // گرفتن تابع Login از UserContext
    // این تابع چک می‌کند نام‌کاربری/رمز درست است یا نه
    const { Login } = useUser();

    // state برای نگهداری فرم ورود
    // form.username
    // form.password
    const [form, setForm] = useState({ username: '', password: '' });

    // برای هدایت کاربر بعد از لاگین
    const navigate = useNavigate(); // *** این خط درست است → بدون {} باید باشد ***

    // تابع هندل کردن فرم
    const handlesubmit = (e) => {
        e.preventDefault(); // جلوگیری از رفرش شدن فرم

        // صدا زدن تابع Login و بررسی موفقیت
        // اگر اطلاعات درست باشد → Login مقدار "undefined" برمی‌گرداند (true)
        // اگر غلط باشد → false
        const success = Login(form.username, form.password);

        // اگر ورود موفق باشد
        if(success !== false){
            toast.success('you have logged in successfully');

            // هدایت کاربر به صفحه محصولات
            navigate('/product'); // ***** اشتباه تایپی در کد اصلی: proudct  *****
        }
        else{
            // اگر اطلاعات اشتباه باشد
            toast.error('please enter valid information');
        }
    };

    return(
        <div>
            <h2>Login page</h2>

            {/* فرم ورود */}
            <form onSubmit={handlesubmit}>

                {/* فیلد username */}
                <input
                    type="text"
                    placeholder="username"
                    value={form.username}
                    onChange={(e)=>{
                        // وقتی کاربر چیزی تایپ کند state آپدیت می‌شود
                        setForm({ ...form, username: e.target.value });
                    }}
                />

                {/* فیلد password */}
                <input
                    type="password"
                    placeholder="password"
                    value={form.password}
                    onChange={(e)=>{
                        // وقتی کاربر رمز وارد کند state تغییر می‌کند
                        setForm({ ...form, password: e.target.value });
                    }}
                />

                <button type="submit">Login</button>
            </form>

            {/* لینک به صفحه ثبت‌نام */}
            <p>
                if you don't have account  
                <Link to={'/signUp'}> register </Link>
            </p>
        </div>
    );
}
