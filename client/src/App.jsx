import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider from './provider/GlobalProvider';
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/CartMobile';
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";
import useTelegramUser from './hookscopy/useTelegramUser';
import useTelegram from './hookscopy/useTelegram'



function App() {

  const tg = useTelegram()

  const isTG = useTelegramUser();


  // console.log("tg",tg)
  const dispatch = useDispatch()
  const location = useLocation()


  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }
    } catch (error) {

    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }
    } catch (error) {

    } finally {
    }
  }



  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  }, [])
  const [colorScheme, themeParams] = useThemeParams();

  useEffect(() => {
    // Set CSS variables based on Telegram theme parameters or fallback based on colorScheme
    document.documentElement.style.setProperty(
      '--tg-theme-bg-color',
      themeParams.bg_color || (colorScheme === 'dark' ? '#1c1c1e' : '#ffffff')
    );
    document.documentElement.style.setProperty(
      '--tg-theme-text-color',
      themeParams.text_color || (colorScheme === 'dark' ? '#ffffff' : '#000000')
    );
    document.documentElement.style.setProperty(
      '--tg-theme-button-color',
      themeParams.button_color || (colorScheme === 'dark' ? '#3a8dff' : '#007aff')
    );
    document.documentElement.style.setProperty(
      '--tg-theme-secondary-bg-color',
      themeParams.secondary_bg_color || (colorScheme === 'dark' ? '#2c2c2e' : '#f2f2f7')
    );
  }, [themeParams, colorScheme]);
  return (

    <div className="contentWrapper bg-tg-theme-bg text-tg-theme-text p-4  shadow-md">

      <GlobalProvider>
     
        <Header />
        <main className='min-h-[78vh]'>
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        {
          location.pathname !== '/checkout' && (
            <CartMobileLink />
          )
        }
      </GlobalProvider>
    </div>

  )
}

export default App
