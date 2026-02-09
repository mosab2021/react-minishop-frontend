// ایجاد context و ایمپورت هوک‌های ضروری React
import { createContext, useContext, useEffect, useState } from "react";

// ساخت یک کانتکست برای نگهداری اطلاعات کاربر
// مثال: user = { username: "ali", password: "1234" }
const UserContext = createContext();

// کامپوننت Provider که همهٔ بخش‌های برنامه را پوشش می‌دهد
export function UserProvider({ children }) {

    // state برای نگه داشتن اطلاعات کاربر
    // null یعنی کاربری لاگین نشده
    const [user, setUser] = useState(null);

    // state برای تشخیص وضعیت ورود
    const [isLoggedin, setIsLoggedin] = useState(false);

    // ----------------------------------------------------
    // useEffect اول — اجرای فقط یکبار هنگام لود شدن سایت
    // ----------------------------------------------------
    useEffect(() => {

        // چک کردن اینکه آیا کاربری از قبل در localStorage ذخیره شده یا نه
        const storedUser = localStorage.getItem('user');

        // اگر کاربر ذخیره شده بود → بازیابی‌اش کن
        if (storedUser) {
            // تبدیل رشته به آبجکت
            setUser(JSON.parse(storedUser));

            // مشخص کن که کاربر وارد شده است
            setIsLoggedin(true);
        }

        // چون آرایه وابستگی خالی است → فقط یکبار اجرا می‌شود
    }, []);

    // ----------------------------------------------------
    // useEffect دوم — هر وقت user تغییر کند اجرا می‌شود
    // ----------------------------------------------------
    useEffect(() => {

        // اگر user مقدار داشت (یعنی لاگین یا ثبت‌نام)
        if (user) {
            // ذخیره اطلاعات کاربر داخل localStorage
            // مثال ذخیره: { username: "ali", password: "1234" }
            localStorage.setItem('user', JSON.stringify(user));

            // وضعیت → وارد شده
            setIsLoggedin(true);
        }

        // اگر user برابر null باشد یعنی logout شده
        else {
            // حذف کاربر از حافظه
            localStorage.removeItem('user');

            // وضعیت → خارج شده
            setIsLoggedin(false);
        }

        // اجرا هنگام تغییر user
    }, [user]);

    // ----------------------------------------------------
    // تابع ثبت‌نام کاربر
    // ----------------------------------------------------
    const signUp = (username, password) => {

        // ساخت یک آبجکت کاربر از ورودی فرم
        // مثال: { username: "reza", password: "2024" }
        const newUser = { username, password };

        // ذخیره کاربر ثبت‌نام شده در localStorage
        localStorage.setItem('registeredUser', JSON.stringify(newUser));

        // پس از ثبت‌نام، کاربر را لاگین کن
        setUser(newUser);
    };

    // ----------------------------------------------------
    // تابع ورود کاربر
    // ----------------------------------------------------
    const Login = (username, password) => {

        // گرفتن کاربری که قبلاً signUp کرده
        const stored = JSON.parse(localStorage.getItem('registeredUser'));

        // بررسی اینکه آیا username و password درست هستند
        if (
            stored &&
            stored.username === username &&
            stored.password === password
        ) {
            // لاگین موفق
            setUser(stored); 
        }

        // اگر اطلاعات اشتباه بود
        else {
            return false; // در کامپوننت login با toast استفاده می‌شود
        }
    };

    // ----------------------------------------------------
    // تابع خروج از حساب
    // ----------------------------------------------------
    const Logout = () => {

        // حذف اطلاعات کاربر
        setUser(null);

        // وضعیت ورود را false کن
        setIsLoggedin(false);
    };

    // ----------------------------------------------------
    // مقدارهایی که قرار است همه کامپوننت‌ها به آنها دسترسی داشته باشند
    // ----------------------------------------------------
    return(
        <UserContext.Provider
            value={{
                user,         // اطلاعات کامل کاربر
                isLoggedin,   // وضعیت ورود (true یا false)
                signUp,       // تابع ثبت‌نام
                Logout,       // تابع خروج
                Login         // تابع ورود
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// هوک اختصاصی برای دسترسی راحت‌تر به UserContext
// به‌جای: useContext(UserContext)
// استفاده: const { user } = useUser();
export const useUser = () => useContext(UserContext);
