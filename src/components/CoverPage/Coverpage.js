import React from 'react'
import { Link } from 'react-router-dom'
import './Coverpage.css'

function Coverpage() {
  return (
    <div className="coverpage">
        <div className='heading'><h1 >Effortlessly Schedule Your Appointments with Ease</h1>
           <p className='content'>Streamline your healthcare experience with our intuitive online appointment booking system.</p>
           <p className='content'> Quickly find available times, book your visits, and manage your schedule all from the comfort of your home.</p>
           <p className='content'> Enjoy a seamless, user-friendly interface designed to make managing your health appointments simple and stress-free.</p>
        <Link to='/register'><button type="button" className="btn btn-light custom">Register Now!</button></Link> 
        </div>

    </div>
  )
}

export default Coverpage