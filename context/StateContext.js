import React, {createContext, useState, useContext} from "react"
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    const incQty = () => {
        setQty(prevQty => prevQty + 1)
    }

    const decQty = () => {
        setQty(prevQty => {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    const onAdd = (product, quant) => {

        const checkProductInCart = cartItems.find(item => item._id === product._id)

        if(checkProductInCart) {
            setCartItems(previousCart => previousCart.map(cartProduct => {
                if(cartProduct._id === product._id) {
                    return  {...cartProduct, quantity: cartProduct.quantity + quant}
                } else return cartProduct
            }))
        } else {
            product.quantity = quant
            setCartItems([...cartItems, {...product}])
        }

        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quant)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quant)

        toast.success(`${quant} ${product.name} added to the cart.`)
    }

    const onRemove = (product) => {

        const newCartItems = cartItems.filter(item => item._id !== product._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice - product.price * product.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - product.quantity)
        setCartItems(newCartItems)

    }

    const toggleCartItemQuantity = (product, value) => {

        if(value === 'inc'){
            const newCartItems = cartItems.map(item => {
                if (item._id === product._id)  {
                    return {...item, quantity: item.quantity + 1}
                } else return item
            })

            setCartItems(newCartItems)
            setTotalPrice(prevTotalPrice => prevTotalPrice + product.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)

        } else if (value === 'dec'){
            if(product.quantity > 1){
                const newCartItems = cartItems.map(item => {
                    if (item._id === product._id)  {
                        return {...item, quantity: item.quantity - 1}
                    } else return item
                })

                setCartItems(newCartItems)
                setTotalPrice(prevTotalPrice => prevTotalPrice - product.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)

            } else onRemove(product)
        }
    }

    return(
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                setQty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)
