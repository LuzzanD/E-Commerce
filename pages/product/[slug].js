import React, {useState, useEffect} from 'react'
import {client, urlFor} from '../../Lib/client'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {Product} from '../../components'
import {useStateContext} from '../../context/StateContext'
import {Toaster} from 'react-hot-toast'

const ProductDetails = ({product, products}) => {
   const [index, setindex] = useState(0)
   const {qty, setQty, incQty, decQty, onAdd, setShowCart} = useStateContext()

   const {image, name, details, price} = product 

   const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
   }
    
  return (
    <div>
        <div className="product-detail-container">
            <div className="images-container">
                <div className="image-container">
                    <img 
                        src={urlFor(image && image[index])} 
                        className="product-detail-image"
                    />
                </div>
                <div className="small-images-container">
                    {image?.map((item, i) => {
                      return ( 
                        <img 
                            key={i}
                            src={urlFor(item)}
                            className={i === index ?
                            'small-image selected-image' :
                            'small-image'}
                            onMouseEnter={() => setindex(i)}
                        />
                        )
                    })}
                </div>
            </div>
            <div className="product-detail-desc">
                <div className="name-price">
                    <h1>{name}</h1>
                    <p className="price">${price}</p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <div className="quantity">
                    <h3>Quantity</h3>
                    <div className="quantity-desc">
                        <div className="minus" onClick={decQty}><AiOutlineMinus /></div>
                        <div className="num">{qty}</div>
                        <div className="plus" onClick={incQty}><AiOutlinePlus /></div>
                    </div>
                </div>
                <div className="buttons">
                    <Toaster />
                    <button className="add-to-cart" type="button" onClick={() => onAdd(product, qty)}>Add to cart</button>
                    <button className="buy-now" type="button" onClick={handleBuyNow}>Buy now</button>
                </div>
            </div>
        </div>
        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products?.filter(item => (item.slug.current !== product.slug.current)).map(item => <Product key={item._id} product={item}/>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`
    const products = await client.fetch(query)
    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback : 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current =='${slug}'][0]`
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)

    return {
      props: {product, products}
    }
  }

export default ProductDetails