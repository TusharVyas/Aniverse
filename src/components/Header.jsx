import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { AppState } from '../App';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
  const useAppState=useContext(AppState);
  return (
    <div className='sticky z-10 bg-gradient-to-t from-gray-700 via-gray-900 to-black top-0 text-3xl flex justify-between items-center
     text-red-500 font-bold p-3 border-b-2 border-gray-500'>
        <Link to='/'><span>Ani<span className='text-white'>Verse</span></span></Link>
        <h1 className='text-lg  flex items-center cursor-pointer'>
        {useAppState.login?
            <Link to='/addseries'><Button><AddIcon className='mr-1' color='secondary'/><span className='text-white'>Add New</span></Button></Link>:
            <Link to='/login'><Button><LoginIcon className='mr-1' color='secondary'/><span className='text-white'>Log in</span></Button></Link>
        }
        </h1>
    </div>
  )
}

export default Header