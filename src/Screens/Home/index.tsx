import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../../Component/header'
import { AiOutlineClose } from 'react-icons/ai'

const HomePage = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      .get('https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/')
      .then((res) => {
        setProduct(res.data)
      })
      .catch((error) => {
        alert('Something went wrong')
      })
    axios
      .get('https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/')
      .then((res) => {
        setCategories(res.data)
      })
      .catch((error) => {
        alert('Something went wrong')
      })
  }, [])

  const handleValues =async (e: any) => {
    let id = e.target.value
    await axios
      .get(`https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/${id}`)
      .then((res) => {
        let Filter=product.filter((e:any)=>{
          return e.category===res.data.name
        })
        if(Filter.length){
          setProduct(Filter)
          let Option=document.querySelectorAll(".option")
          Option.forEach((e:any)=>{
              e.style.display="none"
          })
        }
        else(alert("Nothing Found"))
      })
      .catch((error) => {
        alert('Something went wrong')
      })
  }
  console.log(product,"pro")

  let handleDel = async (id: string) => {
    await axios
      .delete(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`,
      )
      .then((res) => {
        axios
          .get(
            'https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/',
          )
          .then((res) => {
            setProduct(res.data)
          })
          .catch((error) => {
            alert('Something went wrong')
          })
      })
      .catch((error) => {
        alert('Something went wrong')
      })
  }

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-[100%] flex justify-between items-center mt-10">
        <input
          type="text"
          className="xl:w-[25%] lg:w-[35%] md:w-[45%] sm:w-[55%] w-[65%] rounded-md py-2 px-3 focus:outline-none drop-shadow-lg"
          placeholder="Apple watch, Samsung S21, Macbook, ..."
        />
        <div className="xl:w-[20%] lg:w-[30%] md:w-[40%] sm:w-[50%] w-[60%]">
          <div className="w-[100%]">
            <select
              onChange={handleValues}
              name="categories"
              className="w-[100%] py-2 rounded-lg px-3 focus:outline-none cursor-pointer"
              style={{ display: 'block' }}
            >
              <option
                disabled
                selected
                label="Select Category"
                className=" border border-teal-700"
              >
                Select Category
              </option>
              {categories.length > 0
                ? categories.map((category: any, index) => {
                    return (
                      <option value={category.id} key={index} className="option">
                        {category.name}
                      </option>
                    )
                  })
                : null}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-wrap gap-14 w-[75%]">
        {product.length > 0
          ? product.map((element: any, index) => {
              return (
                <div className="w-[200px] relative" key={index}>
                  <AiOutlineClose
                    className="text-[16px] text-white rounded-full p-1 bg-red-500 font-bold cursor-pointer absolute top-2 right-2"
                    onClick={() => {
                      handleDel(element.id)
                    }}
                  />
                  <div
                    className="w-[100%] h-[200px] bg-white rounded-lg productCard cursor-pointer"
                    onClick={() => {
                      navigate(`/detailpage/${element.id}`)
                    }}
                  >
                    {element.avatar ? (
                      <img
                        src={element?.avatar}
                        className="w-[100%] h-[100%] rounded-lg"
                        alt=""
                      />
                    ) : element.ImageURL ? (
                      <img
                        src={element?.ImageURL}
                        className="w-[100%] h-[100%] rounded-lg"
                        alt=""
                      />
                    ) : (
                      <img
                        src="/images/imagePlaceholder.png"
                        className="w-[100%] h-[100%] rounded-lg"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2 w-[100%]">
                    <p className="text-[16px] font-bold  cursor-pointer">
                      {element.name}
                    </p>
                  </div>
                  <p className="mt-1 text-[16px] font-bold text-center">
                    ${element.price}
                  </p>
                </div>
              )
            })
          : null}
        <Link to="/createProduct">
          <button className="w-[50px] h-[50px] bg-black text-white font-bold text-[24px] rounded-full flex justify-center items-center fixed bottom-20 right-20">
            +
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
