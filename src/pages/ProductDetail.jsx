import productData from '../data/products'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function ProductDetail(){
    const {id}=useParams();
    const [product,setProduct]=useState(null);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        async function fetchproduct() {
            try {
                setLoading(true)
                // const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                // setProduct(response.data)
                // productData.find((p)=> p.id === Number(id));                
                setProduct(productData.find((p)=> p.id === Number(id)));
                
            } catch (error) {
                setError('fetch data error')
                setProduct(productData);
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchproduct()
    },[id])
     if(loading) return <p>loading...</p>
    if (error) return <p style={{color:'red'}}>{error}</p>
    return(
                    <div style={{
                border:'1px solid #345',
                borderRadius:'10px',
                padding:'1rem',
                textAlign:'center',
                backgroundColor:'white',
                boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
                transition:'transform 0.2s'
            }}
            onMouseEnter={(e)=>{
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'
                e.currentTarget.style.backgroundColor = "#fff"
                
            }}
             onMouseLeave={(e)=>{
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'
                e.currentTarget.style.backgroundColor = "#fafafa"
                
            }}
            >
                <img src={product.image} alt={product.title} style={{height:'150px',marginBottom:'10px'}}/>
                <h3 style={{fontSize:'1rem'}}>{product.title}</h3>
                <p style={{color:"#888",fontSize:'0.9rem'}}>{product.category}</p>
                <p style={{marginBottom:'1rem',color:'black'}}>{product.description}</p>
                <p style={{fontWeight:'bold',color:'#ff6600'}}>{product.price}</p>
                <button style={{
                    padding:'10px 12px',
                    backgroundColor:'#ff6600',
                    color:'#fff',
                    borderRadius:'10px',
                    cursor:'pointer',
                    transition:'background-color 0.6s'
                }}
                     onMouseEnter={(e)=>{
                e.currentTarget.style.backgroundColor = "#e55a00"
                
            }}
             onMouseLeave={(e)=>{
                e.currentTarget.style.backgroundColor = "#ff6600"
                
            }}

                >Add To Card 🛒</button>
            </div>
    );
}