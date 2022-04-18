import React from 'react'
import { Header } from '../../Component/header'
import { ProductForm } from '../../Component/productForm'

const CreateProduct = () => {
  return (
    <div className="flex flex-col items-center">
      <Header/>
      <ProductForm/>
    </div>
  )
}

export default CreateProduct
