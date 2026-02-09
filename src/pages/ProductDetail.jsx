// 📦 وارد کردن داده‌های فرضی (Mock Data) از فایل محلی
import productData from '../data/products';

// 📚 ایمپورت هوک‌های React
import { useState, useEffect } from "react";

// 📍 ایمپورت useParams برای گرفتن ID از آدرس URL
import { useParams } from "react-router-dom";

// 🌐 ایمپورت axios (فعلاً غیرفعاله ولی آماده برای API واقعی)
import axios from "axios";

// 🧾 کامپوننت اصلی جزئیات محصول
export default function ProductDetail() {

    // از آدرس مانند "/products/3" مقدار id را دریافت می‌کنیم
    const { id } = useParams();

    // سه State برای وضعیت‌های مختلف:
    const [product, setProduct] = useState(null);      // اطلاعات محصول
    const [error, setError] = useState(null);          // خطا هنگام دریافت داده
    const [loading, setLoading] = useState(true);      // وضعیت در حال بارگذاری

    // 🪄 وقتی کامپوننت mount شود یا id تغییر کند، اطلاعات محصول را می‌گیرد
    useEffect(() => {
        async function fetchproduct() {
            try {
                setLoading(true);

                // در حالت واقعی از API می‌خوانیم:
                // const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                // setProduct(response.data)

                // فعلاً از داده‌های Mock در فایل productData استفاده می‌کنیم
                const found = productData.find((p) => p.id === Number(id));
                setProduct(found);
            } catch (error) {
                setError('Fetch data error');  // اگر مشکلی پیش بیاید، پیام خطا نمایش داده می‌شود
                setProduct(productData);       // برای جلوگیری از کرش، می‌توان داده پیش‌فرض گذاشت
            } finally {
                setLoading(false);             // در هر صورت، حالت loading غیرفعال می‌شود
            }
        }

        fetchproduct(); // اجرای تابع هنگام Mount شدن

    }, [id]);

    // 💬 حالت‌های مختلف نمایش بسته به وضعیت State‌ها:
    if (loading) return <p>Loading...</p>;                 // در حال بارگذاری
    if (error) return <p style={{ color: 'red' }}>{error}</p>; // در صورت خطا

    // 🖼️ نمایش اطلاعات محصول وقتی آماده شد
    return (
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
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                e.currentTarget.style.backgroundColor = "#fff";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
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

            {/* عنوان */}
            <h3 style={{ fontSize: '1rem' }}>{product.title}</h3>

            {/* دسته‌بندی */}
            <p style={{ color: "#888", fontSize: '0.9rem' }}>{product.category}</p>

            {/* توضیحات */}
            <p style={{
                marginBottom: '1rem',
                color: 'black',
                lineHeight: '1.4'
            }}>
                {product.description}
            </p>

            {/* قیمت */}
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
            >
                Add To Cart 🛒
            </button>
        </div>
    );
}
