import React from 'react';
import './styles.scss'
import Button from '../../../UI/Button';
import { useNavigate } from 'react-router-dom';


import { ROUTES } from '../../../Navigation';


export default function AuthNav() {
  const navigate = useNavigate()
  const onHandleLogOut = () => {
    localStorage.clear()
    navigate(ROUTES.HOME)
  }
  return (
    <div className='auth-nav'>
      {/*<Button onClick={onHandleLogOut} label="Log out"/>*/}
    </div>
  )
}
