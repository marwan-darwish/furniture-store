import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const{filtered_products,gridView}=useFilterContext()
  const{products_loading}=useProductsContext()
  if(filtered_products<1&&products_loading===false){
    return <h5 style={{textTransform:"none"}}>
      sorry,no products matched...
    </h5>
  }
  if(gridView===false){
    return <ListView products={filtered_products}>

    </ListView>
  }
  return <GridView products={filtered_products}>

  </GridView>
}

export default ProductList
