import { createContext, useState, useEffect, useContext } from "react";
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

    const addToCart = (product) => {
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
        })
    }

    const removeFromCart = (id) => {
        setcartitems((p) => { p.filter((item) => { item.id !== id }) })
    }

    const clearCart = () => {
        setcartitems([]);
    }

    const totalPrice = cartitems.reduce((a, item) => {
        a + item.price * numberOfItem
    }, 0)

    const totalItems = cartitems.reduce((a,item)=>{
        a + item.numberOfItem
    }, 0)

     return (
        <Cartcontext.Provider
            value={{
                cartitems,
                addToCart,
                removeFromCart,
                clearCart,
                totalPrice,
                totalItems
            }}
        >
            {children}
        </Cartcontext.Provider>
    );
}

