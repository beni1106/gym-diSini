import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
const SignUp = () => {

    const [forgotPassword, setForgotPassword] = useState(false);

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }



    return (
        <div className='customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto'>
            <div className='font-sans text-white text-center text-3xl'>Register Account</div>
            <input type='text' className='w-full my-10 p-2 rounded-lg' placeholder='Enter userEmail' />
            <input type='text' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter userGym' />
            <input type='text' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter userName' />
            <input type='password' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter userPassword' />
            <input type='file' className='w-full mb-10 p-2 rounded-lg' />
            <img src='https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='mb-10 h-[200px] w-[250px]' />
            <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer'>Register</div>
            <div className='p-2 w-[80%] mt-5 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer ' onClick={() => handleClose()}>Forgot Password</div>
            {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword />} />}
        </div>
    )
}

export default SignUp
