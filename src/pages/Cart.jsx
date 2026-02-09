// 📦 وارد کردن امکانات مورد نیاز از کتابخانه‌ها
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";     // دسترسی به Context سبد خرید
import toast from "react-hot-toast";                  // برای پیام‌های popup هنگام خرید یا حذف

// 🧩 کامپوننت اصلی
export default function Cart() {

    // 🎯 دریافت داده‌ها و توابع از Context
    const {
        cartItems,        // لیست آیتم‌های موجود در سبد
        addToCart,        // افزودن آیتم جدید یا افزایش تعداد
        removeFromCart,   // حذف یک مورد از سبد
        clearCart,        // خالی کردن کل سبد
        totalPrice,       // مجموع قیمت کل
        totalItems,       // تعداد آیتم‌های کل
    } = useCart();

    // 🔁 امکان جابه‌جایی برنامه‌ای (بدون کلیک در Link)
    const navigate = useNavigate();

    // ⛔️ بررسی اگر سبد خرید کاملاً خالی باشد
    // cartItems.length === 0 باید چک شود (نه فقط cartItems === 0)
    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <h2>Your cart is empty 🛒</h2>
                <Link to='/products' style={{ color: '#ff6600' }}>
                    Go to shop
                </Link>
            </div>
        );
    }

    // ✅ در غیراین‌صورت، نمایش کل محتوای سبد خرید
    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2>🛍 Cart Page</h2>

            {/* لیست محصولات داخل سبد */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {cartItems.map((item) => (
                    <li key={item.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #ddd',
                            padding: '10px 0'
                        }}>
                        {/* بخش تصویر و توضیحات */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: '60px', height: '60px', borderRadius: '5px' }}
                            />
                            <div>
                                <p style={{ fontWeight: 'bold' }}>{item.title}</p>
                                <p style={{ fontSize: '14px', color: '#555' }}>
                                    Quantity: {item.numberOfItem}
                                </p>
                            </div>
                        </div>

                        {/* بخش قیمت و حذف آیتم */}
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                                ${item.price * item.numberOfItem}
                            </p>
                            <button
                                onClick={() => {
                                    removeFromCart(item.id);
                                    toast.error(`Removed ${item.title} from cart`);
                                }}
                                style={{
                                    backgroundColor: '#ff6600',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <hr />

            {/* جمع کل و تعداد آیتم‌ها */}
            <h3 style={{ marginTop: '20px' }}>
                Total items: {totalItems} | 🧾 Total price: ${totalPrice.toFixed(2)}
            </h3>

            {/* دکمه‌ها برای پاک کردن یا رفتن به Checkout */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                    onClick={() => {
                        clearCart();
                        toast.error('Cart cleared');
                    }}
                    style={{
                        backgroundColor: '#555',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 18px',
                        cursor: 'pointer'
                    }}
                >
                    Clear Cart
                </button>

                <button
                    onClick={() => {
                        toast.success('Redirecting to checkout...');
                        setTimeout(() => {
                            navigate('/checkout');
                        }, 1200);
                    }}
                    style={{
                        backgroundColor: '#ff6600',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 18px',
                        cursor: 'pointer'
                    }}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}
