import React, { useContext } from 'react'
import { useState } from 'react'
import {TailSpin} from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { seriesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { AppState } from '../App';

import { useNavigate } from 'react-router-dom';

const AddSeries = () => {
  const useAppState=useContext(AppState);
  const navigate=useNavigate();
    const [form,setForm]=useState({
        nameOfTheShow: "",
        year: "",
        description: "",
        image: "",
        rated: 0,
        rating: 0
    });
    const [loading,setLoading]=useState(false);

    const addSeries=async ()=>{
        setLoading(true);
        try{
          if(useAppState.login)
            {await addDoc(seriesRef,form);
            swal({
                title: "Successfully Added",
                icon : "success",
                buttons : false,
                timer : 3000
            })
            setForm({
              nameOfTheShow: "",
              year: "",
              description: "",
              image: ""
            })}
            else{
              navigate('/login');
            }
        }
        catch(err){
            swal({
                title: err,
                icon : "error",
                buttons : false,
                timer : 3000
            })
        }
        setLoading(false);
    }

  return (
    <div>
        <section class="text-gray-600 body-font relative">
  <div class="container px-5 py-8 mx-auto">
    <div class="flex flex-col text-center w-full mb-4">
      <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-red-500">Add New Show</h1>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-300">Name of the Show</label>
            <input type="text" id="name" name="name" value={form.title} onChange={(e)=> setForm({...form,nameOfTheShow: e.target.value})}
            class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="year" class="leading-7 text-sm text-gray-300">Year of Release</label>
            <input type="year" id="year" name="year" value={form.year} onChange={(e)=> setForm({...form,year: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="description" class="leading-7 text-sm text-gray-300">Image Link</label>
            <input id="description" name="description" value={form.image} onChange={(e)=> setForm({...form,image: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="description" class="leading-7 text-sm text-gray-300">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={(e)=> setForm({...form,description: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button onClick={addSeries} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
            {loading?<TailSpin height={25} color="white"/>:"Add"}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddSeries