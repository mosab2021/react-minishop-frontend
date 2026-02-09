import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

// 📌 نام کامپوننت باید با حرف بزرگ شروع شود (React Rule)
export default function Checkout() {

    // 📦 گرفتن داده‌های سبد خرید
    const {
        cartItems,
        clearCart,
        totalPrice
    } = useCart();

    // 👤 دریافت اطلاعات کاربر لاگین شده
    const { user } = useUser();

    // 🔁 برای انتقال کاربر پس از ثبت سفارش
    const navigate = useNavigate();

    // 📝 مقادیر اولیه فرم
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});

    // 🧪 تابع اعتبارسنجی فرم
    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required";

        if (!form.address.trim()) newErrors.address = "Address is required";

        // ✔️ شماره موبایل ایران: 11 رقم، با 09 شروع
        if (!/^09\d{9}$/.test(form.phone))
            newErrors.phone = "Invalid phone number";

        // ✔️ اصلاح regex ایمیل (کد تو اشتباه بود و همیشه false می‌شد)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email))
            newErrors.email = "Invalid email";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = validateForm();
        setErrors(validation);

        // اگر خطایی وجود نداشت
        if (Object.keys(validation).length === 0) {

            toast.loading("Submitting your order...", { duration: 1200 });

            setTimeout(() => {
                toast.success(`Order successfully submitted, ${form.name} ❤️`);

                clearCart(); // خالی کردن سبد پس از سفارش

                navigate("/"); // انتقال به صفحه اصلی
            }, 1500);
        } else {
            toast.error("Please fix the errors in the form");
        }
    };

    // اگر سبد خرید خالی است، نمایش پیام
    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <h2>Your cart is empty 🛒</h2>
                <p>Please add products before checkout</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Checkout</h2>

            <p>User: <strong>{user?.username}</strong></p>
            <p>Total Price: <strong>${totalPrice}</strong></p>

            <form onSubmit={handleSubmit}>

                {/* Name */}
                <div style={{ marginBottom: "20px" }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ display: "block", width: "100%", marginTop: "5px" }}
                    />
                    {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "20px" }}>
                    <label>Email</label>
                    <input
                        type="text"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ display: "block", width: "100%", marginTop: "5px" }}
                    />
                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>

                {/* Address */}
                <div style={{ marginBottom: "20px" }}>
                    <label>Address</label>
                    <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        style={{ display: "block", width: "100%", marginTop: "5px" }}
                    />
                    {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "20px" }}>
                    <label>Phone</label>
                    <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={{ display: "block", width: "100%", marginTop: "5px" }}
                    />
                    {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#ff6600",
                        color: "#fff",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Submit Order
                </button>
            </form>
        </div>
    );
}
