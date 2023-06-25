import React from 'react';
import Footer1 from '../components/Footer1/Footer1';
import Navbar from '../components/Navbar/Navbar';
import SideBar_GV from '../components/Sidebars/SideBar_GV';
import LT_Table from './LT_Table';
import Table_LT_Search from './LT_Table_Search';
import {axiosInstance} from "../config"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LT = () => {

const [MA_LOP_THI, setID] = useState('')
    const [LT1, setLT] = useState([])
    const [open, setOpen] = useState(true)
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          if( !MA_LOP_THI  ){
            setOpen(true)
          }else{
            const res = await axiosInstance.post('/schedules_ma',{
              MA_LOP_THI
            })
            console.log("res: " + JSON.stringify(res.data))
            setLT(res.data)
            setOpen(false)
            if(res.data.length == 0){
              toast.error("Nhập mã lớp thi không đúng !", {
                  position: "top-center"
              }); 
          }
           ;}
        } catch (error) {
            toast.error("Lỗi không tạo được thông tin !", {
              position: "top-center"
          });
        }
    }

  return <div className='table_HP'>
  <Navbar/>
  <div className="containerHP">
      <SideBar_GV/>
      <div className="table1">
          <h1>Đăng kí hình thức thi</h1>
              <form className="wapperHP" onSubmit={handleSubmit}>
                  <h3>Tìm kiếm theo mã lớp thi:</h3>
                  <div className="tim">
                      <input type="search" className='HP' placeholder='Nhập dữ liệu vào đây' onChange={(e)=>setID(e.target.value)}/>
                      <button className='button_HP'>Search</button>
                  </div>
              </form>
              {
                open ? (
              <LT_Table/>
                ):(
              <Table_LT_Search data= {LT1}/>
                )
}
<ToastContainer />
      </div>
  </div>
  <Footer1/>
</div>;
};

export default LT;
