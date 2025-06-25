import React from 'react'
import Login from '../../Components/Login/login'
import SignUp from '../../Components/Signup/signUp'

const Home = () => {
    return (
        <div className='w-full h-[100vh]'>
            <div className='border-2 border-slate-700 bg-slate-800 text-white p-5 font-semibold text-2xl'>
                Welcome Gym Disini
            </div>
            <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
                <div className='w-full lg:flex gap-32'>

                    <Login />
                    <SignUp />

                </div>
            </div>
        </div>
    )
}

export default Home
