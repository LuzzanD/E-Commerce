import React, {useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import {runFireworks} from '../Lib/utils'

import {useStateContext} from '../context/StateContext'

const Success = () => {
  const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext()

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFireworks()
  }, [])

  return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsBagCheckFill size={32}/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt</p>
            <p className="description">
                If you have any questions please email on:
                <a className="email" href="mailto:andrija0stojanovic@gmail.com">andrija0stojanovic@gmail.com</a>
            </p>
            <Link href="/">
                <button type="button" className="btn">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success