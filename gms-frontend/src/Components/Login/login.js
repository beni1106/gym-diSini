import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
    const navigate = useNavigate();

    const handleLogin = async () => {
        // sessionStorage.setItem("isLogin", true)
        // navigate('/dashboard')

        await axios.post('http://localhost:4000/auth/login', loginField, { withCredentials: true }).then((resp) => {
            console.log(resp);

        }).catch(err => {
            console.log(err)
        })


    }

    const handleOnChange = (event, name) => {
        setLoginField({ ...loginField, [name]: event.target.value });
    }

    return (
        <div className='w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-fit'>

            <div className='font-sans text-white text-center text-3xl'>Login</div>

            <input value={loginField.userName} onChange={(event) => { handleOnChange(event, "userName") }} type='text' className='w-full my-10 p-2 rounded-lg' placeholder='Enter userName' />

            <input value={loginField.password} onChange={(event) => { handleOnChange(event, "password") }} type='password' className='w-full mb-10 p-2 rounded-lg' placeholder='Enter userPassword' />

            <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={() => { handleLogin() }}>Login</div>
        </div>
    )
}

export default Login
