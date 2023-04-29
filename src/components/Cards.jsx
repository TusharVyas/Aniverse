import React from 'react'
import { useState,useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { seriesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards=()=> {
    const [data,setData]=useState([]);
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        async function getData(){
            setLoading(true);
            const _data= await getDocs(seriesRef);
            _data.forEach((doc)=>setData((prv)=>[...prv,{...doc.data(),id:doc.id}]))
            setLoading(false);
        }
        getData();
    }, [])
    
  return (
    <div className='flex flex-wrap gap-4 bg-gradient-to-t from-gray-700 via-gray-900 to-black  md:px-40 md:mt-2 m-auto justify-center w-screen h-max min-h-screen'>
    {loading?<div className='w-full flex justify-center items-center h-96'><ThreeDots height={40} color="white"/></div>:
        data.map((e,i)=>{
            return(
                <Link to={`/details/${e.id}`}><div key={i} className='card bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 font-medium shadow-lg p-2 
                    hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500 rounded w-full '>
                    <img className='h-60 md:h-72 m-1 object-cover' src={e.image}/>
                    <h1 className='text-xs text-center mt-2'>
                         {e.nameOfTheShow}
                    </h1>
                    <h1 className='flex items-center'>
                        <span className='text-gray-500 mr-1'>Rating:</span> 
                        <ReactStars size={20} half={true} value={e.rating/e.rated} edit={false}/>
                    </h1>
                    <h1>
                        <span className='text-gray-500'>Year:</span> {e.year}
                    </h1>
                </div></Link>
            )})}
    </div>
  )
}

export default Cards