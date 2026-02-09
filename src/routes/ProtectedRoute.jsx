// کامپوننت Navigate برای هدایت کاربر به مسیر دیگر (در صورت عدم مجوز)
// useNavigate اینجا اضافه شده ولی در این فایل استفاده نشده، پس می‌شود حذفش کرد
import { Navigate, useNavigate } from "react-router-dom";

// گرفتن اطلاعات کاربر (مثل isLoggedIn) از UserContext
import { useUser } from "../context/UserContext";

// کامپوننت محافظ مسیرها (ProtectedRoute)
// هر صفحه‌ای که فقط باید در حالت "لاگین‌شده" قابل‌دسترسی باشد، درون این کامپوننت قرار می‌گیرد
export default function ProtectedRoute({ children }) {

    // از UserContext وضعیت ورود کاربر گرفته می‌شود
    // توجه: در UserContext معمولاً نام درستش isLoggedIn است (I بزرگ)
    const { isLoggedin } = useUser();

    // اگر کاربر لاگین نکرده باشد
    if (!isLoggedin) {
        // هدایت به صفحه login
        // Navigate باعث می‌شود مرورگر مسیر را تغییر دهد
        return <Navigate to='/login' />;
    }

    // اگر کاربر لاگین کرده باشد، فقط همان محتوای فرزند را نمایش می‌دهیم
    return children;
}
