import { Route, Routes } from 'react-router-dom'
// Route و Routes ابزارهای اصلی react-router هستند برای ساخت مسیرهای سایت.
// Routes مثل یک نقشه کل مسیرهاست.
// Route هر صفحه را معرفی می‌کند: مثلاً اگر آدرس /products بود چه چیزی نشان بده؟

import Home from './pages/Home'
// صفحه اصلی سایت

import Login from './pages/Login'
// صفحه ورود کاربر

import SignUp from './pages/SignUp'
// صفحه ثبت‌نام کاربر جدید

import Products from './pages/Products'
// صفحه لیست محصولات

import MainLayouts from './layouts/MainLayouts'
// این لایه اصلی سایت است شامل Navbar، Footer و یک Outlet
// یعنی ظاهر کلی تمام صفحات را مشخص می‌کند.

import Cart from './pages/Cart'
// صفحه سبد خرید

import ProductDetail from './pages/ProductDetail'
// صفحه جزئیات هر محصول (با id)

import ProtectedRoute from './routes/ProtectedRoute'
// این کامپوننت مسیرهایی را محافظت می‌کند که فقط باید کاربر لاگین کرده ببیند.
// اگر کاربر لاگین نباشد → به صفحه Login انتقال داده می‌شود.

import Checkout from './pages/Checkout'
// صفحه پرداخت نهایی (فرم آدرس و اطلاعات ارسال)


// کامپوننت اصلی برنامه
function App() {

  return (

    // Routes یعنی تمام مسیرهای سایت اینجا لیست می‌شود.
    <Routes>

      {/* مسیر پایه یا Root */}
      {/* MainLayouts به‌عنوان قالب اصلی تمام صفحات قرار می‌گیرد */}
      {/* یعنی Navbar + Footer همیشه نمایش داده می‌شوند */}
      <Route path='/' element={<MainLayouts />} >

        {/* صفحه Home - چون index نوشتیم، یعنی این صفحه برای path="/" است */}
        <Route index element={<Home />} />

        {/* صفحه لیست محصولات - آدرس: /Products */}
        <Route path='Products' element={<Products />} />

        {/* صفحه جزئیات محصول - /products/3 مثلا */}
        {/* :id یک مقدار پویا است. هر محصول id خودش را دارد. */}
        <Route path='products/:id' element={<ProductDetail />} />

        {/* صفحه ورود */}
        <Route path='Login' element={<Login />} />

        {/* صفحه ثبت‌نام */}
        <Route path='SignUp' element={<SignUp/>}/>

        {/* صفحه سبد خرید */}
        <Route path='Cart' element={<Cart />} />

        {/* صفحه Checkout (پرداخت) */}
        {/* این صفحه محافظت شده است. یعنی فقط بعد از لاگین قابل دسترسی است. */}
        <Route 
          path='/Checkout' 
          element={
            // ProtectedRoute چک می‌کند آیا کاربر وارد شده؟
            // اگر بله → Checkout را نشان می‌دهد
            // اگر نه → می‌فرستد به صفحه Login
            <ProtectedRoute>
              <Checkout/>
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  )
}

export default App
// خروجی گرفتن این کامپوننت برای استفاده در main.jsx
