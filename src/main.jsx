import React from 'react' 
// این خط کتابخانه React رو وارد می‌کنه تا بتونیم با JSX کار کنیم.

import { BrowserRouter } from 'react-router-dom'
// این خط "روتر" مرورگر را وارد می‌کند تا بتوانیم بین صفحات مختلف جابه‌جا شویم.
// یعنی اجازه می‌دهد پروژه چند صفحه داشته باشد (Home، Products، Cart و ...)

import { StrictMode } from 'react'
// StrictMode کمک می‌کنه مشکلات احتمالی کد پیدا بشه. 
// مثل معلم مراقب که اشتباهات ریز را گزارش می‌دهد.

import { createRoot } from 'react-dom/client'
// این برای وصل کردن React به tag اصلی HTML استفاده میشه (div id="root")

import './index.css'
// فایل استایل‌های عمومی. هر چی اینجا بنویسیم روی کل سایت اعمال میشه.
// مثل لباس مشترک کل برنامه.

import { CartProvider } from './context/CartContext.jsx'
// این کانتکست سبد خرید را وارد می‌کنه.
// مسئول نگهداری مقدارهای سبد خرید در کل برنامه.

import App from './App.jsx'
// این کامپوننت اصلی برنامه است. همه صفحات از داخل این شروع میشن.

import { Toaster } from 'react-hot-toast'
// این ابزار نوتیفیکیشن است. مثل پیام‌های کوچک “محصول اضافه شد!” یا “لطفاً لاگین کنید”.

import { UserProvider } from './context/UserContext.jsx'
// این کانتکست برای مدیریت کاربر هست (login، logout، ذخیره اطلاعات کاربر)


// از اینجا برنامه React داخل صفحه HTML ما رندر می‌شود.
createRoot(document.getElementById('root')).render(

  // StrictMode فعال میشه تا React خطاهای احتمالی برنامه رو به ما هشدار بده
  <React.StrictMode>

    {/* BrowserRouter باعث میشه بتونیم صفحه‌سازی (Routing) داشته باشیم */}
    <BrowserRouter>

      {/* UserProvider مثل یک جعبه است که اطلاعات کاربر را به کل سایت می‌دهد */}
      <UserProvider>

        {/* CartProvider یک جعبه دیگر است برای مدیریت سبد خرید کل سایت */}
        <CartProvider>

          {/* App کامپوننت اصلی برنامه است که همه صفحات و مسیرها داخل آن است */}
          <App />

          {/* Toaster: نمایش نوتیفیکیشن‌ها در بالای سایت */}
          {/* position='top-right' یعنی سمت راست بالا نشان بده */}
          {/* duration=2500 یعنی ۲.۵ ثانیه نمایش داده شود */}
          {/* style={{fontSize:'14px'}} یعنی اندازه متن نوتیفیکیشن */}
          <Toaster 
            position='top-right' 
            toastOptions={{duration:2500,style:{fontSize:'14px'}}}
          />

        </CartProvider>

      </UserProvider>

    </BrowserRouter>

  </React.StrictMode>
)
