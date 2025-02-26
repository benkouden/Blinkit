
import { Outlet } from 'react-router-dom'
import './App.css'
import Hearder from './components/Hearder'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import SummaryApi from './common/SummaryApi';
import AxiosToastError from './utils/AxiosToastError';
import Axios from './utils/Axios';
import { setAllCategory, setAllSubCategory } from './store/productSlice';
function App() {
  const dispatch = useDispatch()
  const fetchUser =async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))

  }


  const fetchCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData } = response
  
            if(responseData.success){
               dispatch(setAllCategory(responseData.data))
            }
        } catch (error) {
          AxiosToastError(error)
            
        }finally{
            // setLoading(false)
        }
      }
      const fetchSubCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.getSubCategory
            })
            const { data : responseData } = response
            console.log("responseData all cate",responseData)
  
            if(responseData.success){
               dispatch(setAllSubCategory(responseData.data))
            }
        } catch (error) {
          AxiosToastError(error)
            
        }finally{
            // setLoading(false)
        }
      }
  
      useEffect(()=>{
        fetchUser()
        fetchCategory()
        fetchSubCategory()
    },[])

  return (
    <>
      <Hearder/>
      <main className='min-h-[78vh] '>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
