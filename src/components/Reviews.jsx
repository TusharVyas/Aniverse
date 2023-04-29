import React from 'react'
import ReactStars from 'react-stars'
import { useState,useEffect } from 'react'
import { reviewsRef, db } from '../firebase/firebase'
import { addDoc,doc,updateDoc,query,where,getDocs,getDoc } from 'firebase/firestore'
import { ThreeDots,TailSpin } from 'react-loader-spinner'
import { async } from '@firebase/util'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const Reviews = ({id,prevRating,userRated}) => {
    const naviagte=useNavigate();
    const useAppState=useContext(AppState)
    const [rating,setRating]=useState(0);
    const [loading,setLoading] =useState(false);
    const [reviewsLoading,setReviewsLoading] =useState(false);
    const [thoughts,setThoughts]=useState("");
    const [data,setData]=useState([]);
    const [newAdded,setNewAdded]=useState(0);
    // console.log(prevRating+rating);
    const sendReview=async ()=>{
        setLoading(true);
        try{
            if(useAppState.login){
            await addDoc(reviewsRef,{
                seriesid : id,
                name : useAppState.userName,
                rating : rating,
                thoughts : thoughts,
                timestamp: new Date().getTime()
            })
            const ref=doc(db,"series",id);
            
            await updateDoc(ref,{
                rating : prevRating+rating,
                rated : userRated+1
            });
            setRating(0);
            setThoughts("");
            setNewAdded(newAdded+1);
            swal({
                title: "Review Sent",
                icon : "success",
                buttons : false,
                timer : 3000
            })}
            else{
                naviagte('/login');
            }
        }
        catch(error){
            swal({
                title: error.message,
                icon : "error",
                buttons : false,
                timer : 3000
            })
        }
        setLoading(false);
    }
    useEffect(() => {
        async function getData(){
            setReviewsLoading(true);
            setData([]);
            let quer=query(reviewsRef,where('seriesid','==',id));
            const querySnapShot=await getDocs(quer);
            querySnapShot.forEach((doc)=>{
                setData((prev)=>[...prev,doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [newAdded])
    
  return (
    <div className='mt-2 py-1 border-t-2 border-gray-700 w-full'>
        <input placeholder='Your Thoughts' 
            value={thoughts} onChange={(e)=>{setThoughts(e.target.value)}}
            className='w-full p-2 outline-none bg-black'/>
        <ReactStars size={30} half={true} value={rating} edit={true} 
            onChange={(rate)=>setRating(rate)}
        />
        <button  onClick={sendReview}
            className='bg-green-600 w-full p-2 flex justify-center items-center'>
            {loading? <TailSpin height={20} color="white"/>:"Share"}
        </button>
        {reviewsLoading?<div className='mt-6 flex justify-center'><ThreeDots height={10} color="white"/></div>
        :
        <div className='mt-4'>
            {data.map((e,i)=>{
                return(
                        <div className='border-b border-gray-600 p-2 w-full mt-2' key={i}>
                            <div className='flex items-center'>
                                <p className='text-blue-500'>{e.name}</p>
                                <p className='ml-3 text-xs'>{new Date(e.timestamp).toLocaleString()}</p>
                            </div>
                            <p>{e.thoughts}</p>
                            <ReactStars size={20} half={true} value={e.rating} edit={false}/>
                        </div>
                    )
                })}
        </div>}
    </div>
  )
}

export default Reviews