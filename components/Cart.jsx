import React, {useRef} from 'react'
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineShopping, AiOutlineDelete} from 'react-icons/ai'
import toast, {Toaster} from 'react-hot-toast'
import {useStateContext} from '../context/StateContext'
import {urlFor} from '../Lib/client'

const Cart = () => {
  const cartRef = useRef()
  const {totalPrice, totalQuantities, setShowCart, cartItems, toggleCartItemQuantity, onRemove} = useStateContext()

  const handleCheckout = () => {
    toast.loading('Redirecting...')
    {<Toaster />}
    setShowCart(false)
  }

  const cartRender = cartItems.map(item => {
    return (
        <div className="product" key={item._id}>
          <img src={urlFor(item.image[0])} className="cart-product-image" />
          <div className="item-desc">
            <div className="flex top">
              <h5>{item.name}</h5>
              <h4>${item.price}</h4>
            </div>
            <div className="flex bottom">
              <div className="quantity-desc">
                <div className="minus" onClick={() => toggleCartItemQuantity(item, 'dec')}><AiOutlineMinus /></div>
                <div className="num">{item.quantity}</div>
                <div className="plus" onClick={() => toggleCartItemQuantity(item, 'inc')}><AiOutlinePlus /></div>
              </div>
              <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                <AiOutlineDelete size={20}/>
              </button>
            </div>
          </div>
        </div>
  )})

  return (
      <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
          <div className="cart-heading">
            <div classNaem="shopping-bag">
              <AiOutlineShopping size={20}/>
            </div>
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">{totalQuantities} items</span>
            <button
              className="close-btn"
              type="button"
              onClick={() => setShowCart(false)}
            > 
              X 
            </button>
          </div>
          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShoppingCart />
              <h3>Your shopping bag is empty</h3>
              <Link href="/">
                <button 
                  type="button" 
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
          <div className="product-container">
            {cartItems.length >= 1 && cartRender}
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <Link href="/success">
                  <button 
                    type="button" 
                    className="btn"
                    onClick={handleCheckout}
                    
                  >
                    Pay
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
  )
}

export default Cart