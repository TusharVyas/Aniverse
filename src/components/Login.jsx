import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate as navigate} from 'react-router-dom';
import { query,where,getDoc, getDocs } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs'
import { AppState } from '../App';
import swal from 'sweetalert';

const Login = () => {
    const useAppState=useContext(AppState);
    const nav=navigate();
    const [form,setForm]=useState({
        mobile : "",
        password : ""
    });
    const [loading,setLoading]=useState(false);

    const login=async()=>{
        
        setLoading(true);
        try{
            const quer=query(usersRef,where('mobile','==',form.mobile));
            const querySnapShot=await getDocs(quer);
            querySnapShot.forEach((doc)=>{
                const _data=doc.data();
                const isUser=bcrypt.compareSync(form.password,_data.password);
                if(isUser)
                {
                    useAppState.setLogin(true);
                    useAppState.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon : "success",
                        buttons : false,
                        timer : 3000
                    })
                    nav('/');
                }
                else{
                    swal({
                        title: "Invalid credentials",
                        icon : "error",
                        buttons : false,
                        timer : 3000
                    })
                }
            })
        }
        catch(err){
            swal({
                title: err.message,
                icon : "error",
                buttons : false,
                timer : 3000
            })
        }
        setLoading(false);
    }
  return (
    <div className='w-full flex flex-col items-center mt-8 justify-center'>
        <h1 className='text-xl font-bold'>Login</h1>
        <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="description" class="leading-7 text-sm text-gray-300">Mobile No.</label>
            <input type="number" id="description" name="description" value={form.mobile} onChange={(e)=> setForm({...form,mobile: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-1/3">
          <div class="relative">
            <label for="description" class="leading-7 text-sm text-gray-300">Password</label>
            <input type='password' id="description" name="description" value={form.pasword} onChange={(e)=> setForm({...form,password: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full md:w-1/3">
          <button onClick={login} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
            {loading?<TailSpin height={25} color="white"/>:"Login"}
          </button>
        </div>
        <p>Do Not Have Accout?<Link to='/signup'><span className='text-blue-500'>Sign Up</span></Link></p>
    </div>
  )
}

export default Login