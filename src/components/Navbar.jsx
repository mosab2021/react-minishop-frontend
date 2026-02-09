// 📦 از react-router-dom چند کامپوننت وارد می‌کنیم:
// Link → برای لینک ساده.
// NavLink → برای لینک‌هایی که وضعیت فعال بودن مسیر را نشان می‌دهند.
// Navigate → برای هدایت خودکار (redirect).
import { Link, Navigate, NavLink } from "react-router-dom";

// 🛒 آیکون سبد خرید از کتابخانه react-icons
import { FaShoppingCart } from "react-icons/fa";

// 🔔 نمایش پیام‌های Toast Notification
import toast from "react-hot-toast";

// 👤 هوک اختصاصی برای دریافت اطلاعات کاربر از Context
import { useUser } from "../context/UserContext";

// 🚀 برای انتقال کاربر بین صفحات به‌صورت برنامه‌ای
import { useNavigate } from "react-router-dom";

// 🌟 کامپوننت اصلی Navbar
export default function Navbar() {

    // دریافت مقادیر از UserContext
    // user: اطلاعات کاربر فعلی مثل username
    // Logout: تابع خروج از حساب
    // isLoggedin: وضعیت ورود کاربر (true/false)
    const { user, Logout, isLoggedin } = useUser();

    // استفاده از هوک useNavigate برای تغییر مسیر با کد (بدون کلیک)
    const navigate = useNavigate();

    // تابع برای خروج کاربر از حساب
    const handlelogout = () => {
        Logout(); // حذف کاربر از localStorage و Context
        toast('You have been logout'); // نمایش پیام
        navigate('/'); // هدایت کاربر به صفحه اصلی
    };

    // JSX برای نمایش Navbar در صفحه
    return (
        <nav style={{
            display: 'flex', // چینش عناصر در یک ردیف
            justifyContent: 'space-between', // چپ و راست جدا
            alignItems: 'center', // وسط‌چین عمودی
            padding: '1rem 2rem', // فاصله از اطراف
            backgroundColor: '#f2f2f2' // رنگ پس‌زمینه
        }}>
            {/* لوگوی سایت یا نام برند */}
            <Link
                to="/"
                style={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: '#333'
                }}>
                miniShop
            </Link>

            {/* بخش لینک‌ها و دکمه‌ها */}
            <div style={{
                display: 'flex',
                gap: '20px' // فاصله بین لینک‌ها
            }}>

                {/* لینک خانه */}
                <NavLink
                    to="/"
                    style={(isActive) => ({
                        color: isActive ? '#ff6600' : '#333' // رنگ ویژه برای صفحه فعال
                    })}>
                    Home
                </NavLink>

                {/* اگر کاربر وارد شده باشد 👇 */}
                {isLoggedin ? (
                    <>
                        {/* نمایش نام کاربر */}
                        <span style={{ color: 'Blue' }}>
                            Hi user {user.username}
                        </span>

                        {/* دکمه خروج */}
                        <button onClick={handlelogout}>Exit</button>
                    </>
                ) : (
                    // 👇 اگر کاربر لاگین نکرده باشد، لینک‌های Login و SignUp نشان داده می‌شود
                    <>
                        <NavLink
                            to="/Login"
                            style={(isActive) => ({
                                color: isActive ? '#ff6600' : '#333'
                            })}>
                            Login
                        </NavLink>

                        <NavLink
                            to="/SignUp"
                            style={(isActive) => ({
                                color: isActive ? '#ff6600' : '#333'
                            })}>
                            SignUp
                        </NavLink>
                    </>
                )}

                {/* لینک محصولات */}
                <NavLink
                    to="/Products"
                    style={(isActive) => ({
                        color: isActive ? '#ff6600' : '#333'
                    })}>
                    Products
                </NavLink>

                {/* لینک سبد خرید */}
                <NavLink
                    to="/Cart"
                    style={(isActive) => ({
                        color: isActive ? '#ff6600' : '#333'
                    })}>
                    Cart
                </NavLink>
            </div>
        </nav>
    );
}
