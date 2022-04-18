import React from 'react';
import Home from './Home'
import CreateProduct from './CreateProduct'
import { DetailPage } from './Deatil';
import { Route, Routes } from 'react-router-dom'

const Screens = () => {
    return (
        <div className='bg-[#ececec] min-h-[100vh] max-h-fit  w-[100%] p-10'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createProduct" element={<CreateProduct />} />
                <Route path="/detailPage/:id" element={<DetailPage/>} />
            </Routes>
        </div>
    )
}

export default Screens;