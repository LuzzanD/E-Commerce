import React from 'react'
import Link from 'next/link'
import {useStateContext} from '../context/StateContext'

import {urlFor} from '../Lib/client'

const FooterBanner = ({product, footerBanner: {discount, largeText1,
largeText2, saleTime, smallText, midText, desc, buttonText}}) => {

  const {setShowCart, onAdd, qty} = useStateContext()

  const handleClick = () => {
    setShowCart(true)
    onAdd(product, qty)
  }

  return (
    <div className="footer-banner-container">

        <div className="left">
          <p>{discount}</p>
          <div className="left-title">
            <h3>{largeText2}</h3>
            <h3>{largeText1}</h3>
          </div>
          <p>{saleTime}</p>
        </div>

        <img 
          className="footer-banner-image"
          src={urlFor(product.image[0])}
        />

        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product.slug.current}`}>
            <button onClick={handleClick} type="button">{buttonText}</button>
          </Link>
        </div>
    </div>
  )
}

export default FooterBanner