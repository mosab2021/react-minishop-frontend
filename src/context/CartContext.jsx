// 📦 وارد کردن ابزار مورد نیاز از React
import { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";

// ✨ ایجاد Context ساده برای سبد خرید
const CartContext = createContext();

// 💡 هوک کمکی برای استفاده راحت‌تر از Context
export const useCart = () => useContext(CartContext);

// 🌟 کامپوننت Provider که کل منطق سبد خرید را نگه می‌دارد
export function CartProvider({ children }) {

    // 🧺 state اصلی که آیتم‌های سبد خرید را ذخیره می‌کند
    // مقدار اولیه از localStorage خوانده می‌شود تا سبد خرید حتی پس از رفرش باقی بماند
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 💾 ذخیره سبد خرید در localStorage هر بار که تغییر می‌کند
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 🟢 افزودن محصول به سبد خرید
    const addToCart = useCallback((product) => {
        setCartItems((prev) => {
            // بررسی آیا محصول از قبل در سبد وجود دارد
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                // اگر وجود دارد، فقط تعداد آن را افزایش بده
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, numberOfItem: item.numberOfItem + 1 }
                        : item
                );
            } else {
                // در غیراین صورت، محصول جدید را اضافه کن
                return [...prev, { ...product, numberOfItem: 1 }];
            }
        });
    }, []);

    // 🔴 حذف یک محصول از سبد
    const removeFromCart = useCallback((id) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    }, []);

    // ⚫ پاک کردن کل سبد
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // 💰 محاسبه قیمت کل سبد با useMemo برای بهینه‌سازی
    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            return sum + item.price * item.numberOfItem;
        }, 0);
    }, [cartItems]);

    // 🧮 محاسبه تعداد کل آیتم‌ها
    const totalItems = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            return sum + item.numberOfItem;
        }, 0);
    }, [cartItems]);

    // ✅ تمام داده‌ها و توابعی که به سایر کامپوننت‌ها داده می‌شود
    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems
    }), [cartItems, addToCart, removeFromCart, clearCart, totalPrice, totalItems]);

    // 📤 در نهایت تمام فرزندان را داخل Provider برمی‌گردانیم
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
