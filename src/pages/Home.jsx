// 📦 گرفتن کامپوننت Link از react-router-dom
// Link مثل تگ <a> هست اما باعث رفرش کامل صفحه نمی‌شود.
// این یعنی سایت ما "SPA" است (Single Page Application).
import { Link } from "react-router-dom";

// 🏠 کامپوننت صفحه اصلی سایت (Home Page)
export default function Home() {
    return (
        <div style={{ padding: "2rem" }}>
            
            {/* عنوان خوش‌آمدگویی */}
            <h1>Welcome to our shop</h1>

            {/* توضیح کوتاه درباره صفحه محصولات */}
            <p>For observing the products click on the link below</p>

            {/* لینک به صفحه محصولات */}
            {/* استفاده از Link به جای <a> باعث بهتر شدن سرعت و تجربه کاربری می‌شود */}
            <Link
                to="/products"
                style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none"
                }}
            >
                Browse Products
            </Link>
        </div>
    );
}
