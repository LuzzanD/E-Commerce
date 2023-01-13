import React from 'react'
import Link from 'next/link'
import {useStateContext} from '../context/StateContext'

import {urlFor} from '../Lib/client'

const HeroBanner = ({product, heroBanner: {smallText, midText, largeText1, buttonText}}) => {
  const {setShowCart, onAdd, qty} = useStateContext()

  const handleClick = () => {
    setShowCart(true)
    onAdd(product, qty)
  }

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-left">
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <div>
          <Link href={`/product/${product.slug.current}`}>
            <button onClick={handleClick} type="button">{buttonText}</button>
          </Link>
        </div>
      </div>
      <Link href={`/product/${product.slug.current}`}>
        <img src={urlFor(product.image[0])} className="hero-banner-image" alt="headphones"/>
      </Link>
    </div>
  )
}

export default HeroBanner
