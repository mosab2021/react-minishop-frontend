import productData from '../data/products'
import axios from 'axios';
import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
export default function Products(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        async function fetchproduct() {
            try {
                setLoading(true)
                 const response = await axios.get('https://fakestoreapi.com/products')                                
                setProducts(response.data)
               // setProducts(productData)
            } catch (error) {
                setError('erorr fetching data')
               // setProducts(productData)
                
            }
            finally{
                // setLoading(false)
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
            }
        }
        fetchproduct()
    },[])
    // if(loading) return <p>loading...</p>
    // if(loading) return <Loader/>
    if(loading) return (
        <div>
            <Skeleton width={200} height={20}/>
            <Skeleton width={400} height={100}/>
            <Skeleton width={200} height={20}/>
        </div>
    )
    if (error) return <p style={{color:'red'}}>{error}</p>
    return(
        <div>
        <h2>Product page</h2>
        <div style={{
            display:'grid',
            gap:'20px',
            marginTop:'20px'
        }}>
            {products.map((p)=>(
                <ProductCard key={p.id} product={p}/>
            ))}
        </div>
        </div>
    );
}