import React, { useState } from 'react'
import { regInputType } from '../../types'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useAppDispatch } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import style from './RegForm.module.css'

export default function RegForm() {
    const [regInputs, setRegInputs] = useState<regInputType>({login: '', email: '', password: ''})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const chengeRegHandler = (e) => {        
        setRegInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }
    
      const registerHandler = async () => {
        try {
          const user = {
            login: regInputs.login,
            email: regInputs.email,
            password: regInputs.password
          }
          const response = await axios.post('http://localhost:3001/api/users/registration', user, {
            withCredentials: true
        })        
          if (response.status === 200) {
            console.log(response.data)
            dispatch({ type: "SET_USER", payload: response.data });
            localStorage.setItem('user', JSON.stringify(response.data.login));
            setRegInputs({login: '', email: '', password: ''})
            navigate('/game')
          }      
        } catch (error) {
          console.log(error) 
        }
      }


  return (
    <div className={(style.regform__block)}>
    <h2>Registration</h2>
    <form className={style.regform}>
        <TextField onChange={chengeRegHandler} name='login' type='text' value={regInputs.login} label="Name" variant="outlined" />
        <TextField onChange={chengeRegHandler} name='email' type='email' value={regInputs.email} label="Email" variant="outlined" />
        <TextField onChange={chengeRegHandler} name='password' type='password' value={regInputs.password} label="Password" variant="outlined" />
        <Button onClick={registerHandler} variant="contained">Registration</Button>
    </form>
</div>
  )
}
