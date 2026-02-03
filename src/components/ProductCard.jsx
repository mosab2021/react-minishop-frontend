import { Link } from "react-router-dom";
import { usecart } from '../context/CartContext'
import toast from "react-hot-toast";
export default function ProductCard({ product }) {
    const { addToCart } = usecart()
    const handleAdd=()=>{
        addToCart(product)
        toast.success('added to cart')
    }
    return (
        <Link to={`/products/${product.id}`}>
            <div style={{
                border: '1px solid #345',
                borderRadius: '10px',
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'
                    e.currentTarget.style.backgroundColor = "#fff"

                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'
                    e.currentTarget.style.backgroundColor = "#fafafa"

                }}
            >
                <img src={product.image} alt={product.title} style={{ height: '150px', marginBottom: '10px' }} />
                <h3 style={{ fontSize: '1rem' }}>{product.title}</h3>
                <p style={{ color: "#888", fontSize: '0.9rem' }}>{product.category}</p>
                <p style={{ fontWeight: 'bold', color: '#ff6600' }}>{product.price}</p>
                <button style={{
                    padding: '10px 12px',
                    backgroundColor: '#ff6600',
                    color: '#fff',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'background-color 0.6s'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e55a00"

                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ff6600"

                    }}
                    onClick={
                        handleAdd
                    }

                >Add To Card 🛒</button>
            </div>
        </Link>
    );
}