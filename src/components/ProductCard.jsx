// 📦 ایمپورت موارد مورد نیاز
import { Link } from "react-router-dom";      // برای لینک به صفحه جزئیات محصول
import { usecart } from '../context/CartContext'; // دریافت توابع سبدخرید از Context
import toast from "react-hot-toast";          // نمایش پیغام زمانی که محصول اضافه شد

// 🧩 کامپوننت ProductCard
export default function ProductCard({ product }) {

    // از Cart Context فقط تابع addToCart را برمی‌داریم
    const { addToCart } = usecart();

    // ✨ تابع مدیریت افزودن محصول به سبد خرید
    const handleAdd = () => {
        addToCart(product);              // افزودن محصول به سبد خرید
        toast.success('Added to cart');  // نمایش پیغام موفقیت
    };

    // 🎨 خروجی JSX
    return (
        // وقتی روی کارت کلیک شود، کاربر به صفحه جزئیات آن محصول می‌رود
        <Link to={`/products/${product.id}`}>
            <div
                style={{
                    border: '1px solid #345',
                    borderRadius: '10px',
                    padding: '1rem',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s'
                }}
                // افکت هنگام Hover ماوس روی کارت
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                    e.currentTarget.style.backgroundColor = "#fff";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    e.currentTarget.style.backgroundColor = "#fafafa";
                }}
            >
                {/* تصویر محصول */}
                <img
                    src={product.image}
                    alt={product.title}
                    style={{
                        height: '150px',
                        marginBottom: '10px'
                    }}
                />

                {/* عنوان محصول */}
                <h3 style={{ fontSize: '1rem' }}>{product.title}</h3>

                {/* دسته‌بندی محصول */}
                <p style={{ color: "#888", fontSize: '0.9rem' }}>{product.category}</p>

                {/* قیمت محصول */}
                <p style={{ fontWeight: 'bold', color: '#ff6600' }}>{product.price}</p>

                {/* دکمه افزودن به سبد خرید */}
                <button
                    style={{
                        padding: '10px 12px',
                        backgroundColor: '#ff6600',
                        color: '#fff',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'background-color 0.6s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e55a00";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ff6600";
                    }}
                    onClick={handleAdd}
                >
                    Add To Cart 🛒
                </button>
            </div>
        </Link>
    );
}
