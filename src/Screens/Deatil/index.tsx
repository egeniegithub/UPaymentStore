import React, { useState, useEffect, FunctionComponent } from 'react'
import { Header } from '../../Component/header'
import { Router, useParams } from 'react-router-dom'
import axios from 'axios'

interface IDetail {
  avatar: string
  name: string
  price: string
  description: string
}

export const DetailPage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<IDetail>({
    avatar: '',
    name: '',
    price: '',
    description: '',
  });
  useEffect(() => {
    axios
      .get(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`,
      )
      .then((res) => {
        setDetail(res.data)
      }).catch((error) => {
        alert("Something went wrong")
      })
  }, [])
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-[80%] flex flex-col mt-20">
        <div className="sm:flex gap-10">
          <div className="sm:w-[300px] w-[200px] sm:h-[350px] h-[250px] bg-white rounded-lg flex justify-center items-center">
            <img src={detail.avatar} className="w-[250] h-[300px]" alt="" />
          </div>
          <div className="flex flex-col justify-between sm:mt-0 mt-5">
            <h1 className="text-[32px] font-bold">{detail.name}</h1>
            <h1 className="text-[20px] font-semibold sm:mt-0 mt-3">${detail.price}</h1>
          </div>
        </div>
        <div className="w-[100%] h-[2px] bg-black my-10"></div>
        <div>
          <h1 className="text-[20px] font-semibold">Description</h1>
          <p className="mt-3">{detail.description}</p>
        </div>
      </div>
    </div>
  )
}
