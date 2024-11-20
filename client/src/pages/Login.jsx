// import React, { useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { Link, useNavigate } from 'react-router-dom';
// import fetchUserDetails from '../utils/fetchUserDetails';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';

// const Login = () => {
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     })
//     const [showPassword, setShowPassword] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setData((preve) => {
//             return {
//                 ...preve,
//                 [name]: value
//             }
//         })
//     }

//     const valideValue = Object.values(data).every(el => el)


//     const handleSubmit = async(e)=>{
//         e.preventDefault()

//         try {
//             const response = await Axios({
//                 ...SummaryApi.login,
//                 data : data
//             })
            
//             if(response.data.error){
//                 toast.error(response.data.message)
//             }

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 localStorage.setItem('accesstoken',response.data.data.accesstoken)
//                 localStorage.setItem('refreshToken',response.data.data.refreshToken)

//                 const userDetails = await fetchUserDetails()
//                 dispatch(setUserDetails(userDetails.data))

//                 setData({
//                     email : "",
//                     password : "",
//                 })
//                 navigate("/")
//             }

//         } catch (error) {
//             AxiosToastError(error)
//         }



//     }
//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

//                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
//                     <div className='grid gap-1'>
//                         <label htmlFor='email'>Email :</label>
//                         <input
//                             type='email'
//                             id='email'
//                             className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
//                             name='email'
//                             value={data.email}
//                             onChange={handleChange}
//                             placeholder='Enter your email'
//                         />
//                     </div>
//                     <div className='grid gap-1'>
//                         <label htmlFor='password'>Password :</label>
//                         <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id='password'
//                                 className='w-full outline-none'
//                                 name='password'
//                                 value={data.password}
//                                 onChange={handleChange}
//                                 placeholder='Enter your password'
//                             />
//                             <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
//                                 {
//                                     showPassword ? (
//                                         <FaRegEye />
//                                     ) : (
//                                         <FaRegEyeSlash />
//                                     )
//                                 }
//                             </div>
//                         </div>
//                         <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
//                     </div>
    
//                     <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

//                 </form>

//                 <p>
//                     Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
//                 </p>
//             </div>
//         </section>
//     )
// }

// export default Login

// import React from 'react';
import  useTelegramUser  from '../hookscopy/useTelegramUser';
// import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
// import AxiosToastError from '../utils/AxiosToastError';
// import { setUserDetails } from '../store/userSlice';
import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
const AuthenticateButton = () => {
    const user = useTelegramUser(); // Get user details from Telegram Web App
    const dispatch = useDispatch();

    const handleAuthenticate = async () => {
        if (!user  || !user.first_name) {
            toast.error('Unable to authenticate. Missing required details.');
            return;
        }

        try {
               const response = await Axios({
                ...SummaryApi.auth,
                data : {   telegram_id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name || '',
                    username: user.username || '',}
            })
            
            if(response.data.error){
                toast.error(response.data.error)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)
                toast.success("Login")
                // const userDetails = await fetchUserDetails()
                // dispatch(setUserDetails(userDetails.data))

                navigate("/")
            }

            // const data = await response.json();

            // if (data.error) {
            //     toast.error(data.error);
            //     return;
            // }

            // if (data.success) {
            //     toast.success(data.message);
            //     // Save tokens to local storage
            //     localStorage.setItem('accessToken', data.data.accessToken);
            //     localStorage.setItem('refreshToken', data.data.refreshToken);

            //     // Dispatch user details to Redux
            //     dispatch(setUserDetails(user));

            //     toast.success('User authenticated successfully!');
            //     navigate("/")
            // }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <button
            onClick={handleAuthenticate}
            className="bg-[var(--tg-theme-button-color)] text-white py-2 px-4 rounded font-semibold hover:bg-[var(--tg-theme-button-color)]"
        >
            Authenticate
        </button>
    );
};

export default AuthenticateButton;
