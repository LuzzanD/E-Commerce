import React from 'react'

import {client} from '../Lib/client'
import {Product, FooterBanner, HeroBanner} from '../components'

const Home = ({products, bannerData}) => {
  return (
    <>
      <HeroBanner product={products[3]} heroBanner ={bannerData.length && bannerData[0]}/>

      <div className="products-heading">
        <h2>Best selling products</h2>
      </div>
      
      <div className="products-container">
        {products?.map(item => <Product key={item._id} product={item}/>)}
      </div>

      <FooterBanner product={products[3]} footerBanner={bannerData.length && bannerData[0]}/>
    </>
  )
}

export const getStaticProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home