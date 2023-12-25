import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetPointsAC } from "../../store/actions";
import axios from 'axios';
import style from './NavBar.module.css'

export default function NavBar() {
//  const user = useAppSelector((store) => store.usersReducer.user);
 const navigate = useNavigate();
 const dispatch = useAppDispatch()

 const user = JSON.parse(localStorage.getItem('user'))

 const logoutHandler = async () => {
  try {
      const response = await axios.get(`http://localhost:3001/api/users/logout`, {
            withCredentials: true
        })

        if (response.status === 200) {
          if (response.data.msg === 'Success') {
            dispatch({type:'DEL_USER', payload: {}})
            dispatch(resetPointsAC())
            localStorage.clear();
            navigate('/') 
          }                
      }            
  } catch (error) {
      console.error(error)            
  }
}

  return (
    
    <div className={style.nav__block}>
     <a className={style.logo}><img src='https://i.otzovik.com/objects/b/530000/528714.png' style={{ height: '55px' }}></img></a>
        <Link to="/game" >Game</Link>
        {user ? (
        <><Link to="/profile">{user}</Link><Link onClick={logoutHandler} to="/logout">Logout</Link></>)
    : (
        <Link to="/auth" >Login</Link>
    )}
    </div>
  )
}
