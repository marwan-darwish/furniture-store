import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {

  const{id}=useParams()
  const history=useHistory()
  const{single_product_loading,single_product_error,single_product,fetchSingleProduct}=useProductsContext()
 useEffect(() => {
  fetchSingleProduct(`${url}${id}`)
  // eslint-disable-next-line
 }, [id])
 useEffect(() => {
  if(single_product_error){
    setTimeout(() => {
      history.push("/")
    },2000);
  }
  // eslint-disable-next-line
 }, [single_product_error])
 if(single_product_loading){
   return <Loading/>
 }
 if(single_product_error){
   return <Error/>
 }
 const{name,price,description,stock,stars,reviews,id:prodId,company,images}=single_product
  return <Wrapper>
    <PageHero title={name} product/>
    <div className="section-center page section">
<Link to="/products" className="btn">
  back to products
</Link>
<div className="product-center">
  <ProductImages images={images}/>
  <section className="content">
    <h2>{name}</h2>
    <Stars stars={stars} reviews={reviews}/>
    <h5 className="price">
{formatPrice(price)}
    </h5>
    <p className="desc">
{description}
    </p>
    <p className="info">
      <span>Avaliable:</span>
      {stock>0?`In stock (${stock})`:"out of stock"}
    </p>
    <p className="info">
      <span>id:</span>
      {prodId}
    </p>
    <p className="info">
      <span>Brand:</span>
      {company}
    </p>
    <hr/>
    {stock>0&&<AddToCart product={single_product}/>}
  </section>
</div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
