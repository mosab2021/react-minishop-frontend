import { createContext, useState, useEffect, useContext,useMemo,useCallback } from "react";

const Cartcontext = createContext()

export const usecart = () => useContext(Cartcontext);

export function CartProvider({ children }) {
    const [cartitems, setcartitems] = useState(() => {
        const savedcart = localStorage.getItem('cart')
        return savedcart ? JSON.parse(savedcart) : []
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartitems))
    }), [cartitems];

    const addToCart = useCallback( (product) => {
        setcartitems((p) => {
            const currentItems = p.find((item) => {
                item.id === product.id
            })
            if (currentItems) {
                return p.map((item) => (item.id === product.id ? { ...item, numberOfItem: item.numberOfItem + 1 } : item))
            }
            else {
                return [...p, { ...product, numberOfItem: 1 }]
            }
        }
    )},
        [setcartitems])

    const removeFromCart = useCallback( (id) => {
        setcartitems((p) => { p.filter((item) => { item.id !== id }) })
    },[setcartitems])

    const clearCart = useCallback( () => {
        setcartitems([]);
    },[setcartitems])

    const totalPrice = useMemo(()=>{ 
        return cartitems.reduce((a, item) => {
            a + item.price * item.numberOfItem;
        }, 0)
    },[cartitems])

    const totalItems = useMemo(()=>{
        return cartitems.reduce((a,item)=>{
            a + item.numberOfItem;
        }, 0)
    },[cartitems])

    // const value =  useMemo(() =>( {           
    //             cartitems,
    //             addToCart,
    //             removeFromCart,
    //             clearCart,
    //             totalPrice,
    //             totalItems
    //         }),[cartitems,
    //             addToCart,
    //             removeFromCart,
    //             clearCart,
    //             totalPrice,
    //             totalItems])
     return (
        <Cartcontext.Provider
            value={{  
                cartitems,
                addToCart,
                removeFromCart,
                clearCart,
                totalPrice,
                totalItems }}
        >
            {children}
        </Cartcontext.Provider>
    );
}

