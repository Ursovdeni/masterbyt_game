import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { logInputType } from '../../types'
import axios from 'axios'
import style from './LoginForm.module.css'

export default function LoginForm() {
    const [logInputs, setLogInputs] = useState<logInputType>({email: '', password: ''})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const chengeLoginHandler = (e) => {        
        setLogInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }

      const loginHandler = async () => {
        try {
          const user = {
            email: logInputs.email,
            password: logInputs.password
          }
          const response = await axios.post('http://localhost:3001/api/users/login', user, {
            withCredentials: true
        })
        
          if (response.status === 200) {
            console.log(response.data)
            dispatch({ type: "SET_USER", payload: response.data });
            localStorage.setItem('user', JSON.stringify(response.data.login));
            setLogInputs({email: '', password: ''})
            navigate('/game')
          } else {
            console.log('Ошибка авторизации, неверный логин или пароль!')
          }     
        } catch (error) {
          console.log(error) 
        }
      }


  return (
    <div className={(style.logform__block)}>        
    <h2>Login</h2>
    <form className={style.logform}>
        <TextField onChange={chengeLoginHandler} name='email' type='email' value={logInputs.email} label="Email" variant="outlined" />
        <TextField onChange={chengeLoginHandler} name='password' type='password' value={logInputs.password} label="Password" variant="outlined" />
        <Button onClick={loginHandler} variant="contained">Login</Button>
    </form>
</div>
  )
}
