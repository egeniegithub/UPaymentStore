import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface IProduct {
  category: string
  description: string
  avatar: string
  price: string
  name: string
  developerEmail: string
}

export const ProductForm = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState<IProduct>({
    category: '',
    description: '',
    avatar: '',
    price: '',
    name: '',
    developerEmail: '',
  })
  const [categories, setCategories] = useState([])

  const handleValues = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios
      .get('https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/')
      .then((res) => {
        setCategories(res.data)
      })
      .catch((error) => {
        alert('Something went wrong')
      })
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await axios
      .post(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products`,
        product,
      )
      .then((res) => {
        console.log(res, 'res')
        setProduct({
          category: '',
          description: '',
          avatar: '',
          price: '',
          name: '',
          developerEmail: '',
        })
        navigate('/')
      })
      .catch((error) => {
        alert('Something went wrong')
      })
  }
  console.log(product, 'product')

  return (
    <div className="mt-20 xl:w-[40%] md:w-[70%] sm:w-[90%] w-[100%] flex flex-col items-center">
      <h1 className="font-bold text-[32px]">Create Product</h1>
      <form
        className="w-[100%] mt-10 flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="w-[100%] xl:mb-5 sm:mb-3 mb-2">
          <input
            onChange={handleValues}
            value={product.name}
            name="name"
            className="w-[100%] py-2 rounded-lg pl-3 focus:outline-none"
            placeholder="Product Name"
          />
        </div>
        <div className="w-[100%] xl:mb-5 sm:mb-3 mb-2">
          <input
            onChange={handleValues}
            value={product.developerEmail}
            name="developerEmail"
            className="w-[100%] py-2 rounded-lg pl-3 focus:outline-none"
            placeholder="Developer Email"
          />
        </div>
        <div className="w-[100%] xl:mb-5 sm:mb-3 mb-2">
          <textarea
            onChange={handleValues}
            value={product.description}
            name="description"
            className="w-[100%] py-2 rounded-lg pl-3 focus:outline-none"
            placeholder="description"
          />
        </div>
        <div className="w-[100%] xl:mb-5 sm:mb-3 mb-2 -mt-1">
          <input
            onChange={handleValues}
            value={product.avatar}
            name="avatar"
            className="w-[100%] py-2 rounded-lg pl-3 focus:outline-none"
            placeholder="avatar"
          />
        </div>
        <div className="w-[100%] xl:mb-5 sm:mb-3 mb-2">
          <select
            defaultValue={'Select Category'}
            onChange={handleValues}
            name="category"
            className="w-[100%] py-2 rounded-lg px-3 focus:outline-none"
            style={{ display: 'block' }}
          >
            <option disabled selected label="Select Category">
              Select Category
            </option>
            {categories.length > 0
              ? categories.map((category: any, index) => {
                  return (
                    <option
                      value={category.name}
                      label={category.name}
                      key={index}
                    >
                      {category.name}
                    </option>
                  )
                })
              : null}
          </select>
        </div>
        <div className="w-[100%] xl:mb-5 sm:mb-3 mb-2">
          <input
            onChange={handleValues}
            value={product.price}
            name="price"
            className="w-[100%] w-[100%] py-2 rounded-lg pl-3 focus:outline-none"
            placeholder="Price"
          />
        </div>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="w-[100%] w-[100%] py-2 rounded-lg pl-3 focus:outline-none bg-white"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
