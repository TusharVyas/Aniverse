import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {RecaptchaVerifier,signInWithPhoneNumber,getAuth} from 'firebase/auth'
import app from '../firebase/firebase'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import { async } from '@firebase/util';
import bcryptjs from 'bcryptjs';
const auth=getAuth(app);

const Signup = () => {
    const navigate=useNavigate();
    const [form,setForm]=useState({
        name:"",
        mobile : "",
        password : ""
    });
    const [loading,setLoading]=useState(false);
    const [otpSent,setOtpSent]=useState(false);
    const [otp,setOtp]=useState();

    const generateRecaptcha= ()=>{
        window.recaptchaVerifier =new RecaptchaVerifier('recaptcha-container',{
            'size':'invisible',
            'callback':(response)=>{

            }
        },auth);
    }

    const requestOtp=()=>{
        setLoading(true);
        generateRecaptcha();
        let appVerifier=window.recaptchaVerifier;
        signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier)
        .then(confirmationResult=>{
            window.confirmationResult=confirmationResult;
            swal({
                text: "OTP Sent",
                icon : "success",
                buttons : false,
                timer : 3000
            });
            setOtpSent(true);
            setLoading(false);
        }).catch((error)=>{
            console.log(error)
        })
    }

    const verifyOtp=()=>{
        try{
            setLoading(true);
            window.confirmationResult.confirm(otp).then((result)=>{
            uploadData();
                swal({
                    text: "Successfully Registered",
                    icon : "success",
                    buttons : false,
                    timer : 3000
                });
            navigate('/login');
            setLoading(false);
            })
            setLoading(false);
        }
        catch(error){
            console.log(error);
        }
    }

    const uploadData = async ()=>{
        try{
            const salt =bcryptjs.genSaltSync(10);
            var hash=bcryptjs.hashSync(form.password,salt);
            console.log(form);
            await addDoc(usersRef,{
                name: form.name,
                password : hash,
                mobile : form.mobile
            });
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className='w-full flex flex-col items-center mt-8 justify-center'>
        <h1 className='text-xl font-bold'>Sign Up</h1>
        {otpSent?
        <>
            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="description" class="leading-7 text-sm text-gray-300">OTP</label>
                    <input  id="description" name="description" value={otp} onChange={(e)=> setOtp(e.target.value)}
                    class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div class="p-2 w-full md:w-1/3">
                <button  onClick={verifyOtp} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                {loading?<TailSpin height={25} color="white"/>:"Confirm OTP"}
                </button>
            </div>
        </>
        :
        <>
        <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="description" class="leading-7 text-sm text-gray-300">Name</label>
            <input  id="description" name="description" value={form.name} onChange={(e)=> setForm({...form,name: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
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
            <input id="description" type='password' name="description" value={form.pasword} onChange={(e)=> setForm({...form,password: e.target.value})}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full md:w-1/3">
          <button onClick={requestOtp} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
            {loading?<TailSpin height={25} color="white"/>:"Request OTP"}
          </button>
        </div>
        </>}
        <p>Already have an account?<Link to='/login'><span className='text-blue-500'>Login</span></Link></p>
        <div id='recaptcha-container'></div>
    </div>
  )
}

export default Signup