import { Button } from '@mui/material'
import React, { useState } from 'react'
import RegForm from '../../components/regForm/RegForm'
import LoginForm from '../../components/loginForm/LoginForm'
import style from './AuthPage.module.css'


export default function AuthPage() {
    const [visible, setVisible] = useState<boolean>(true)


  return (
    <div className={style.auth__container}>
        <div className='authbtn__block'>
            <Button onClick={() => setVisible((prev) => !prev)} variant="contained">Registration / Login</Button>
        </div>
        <div className=''>
            {visible ? (<RegForm />) : (<LoginForm />)}
        </div>
    </div>
  )
}

