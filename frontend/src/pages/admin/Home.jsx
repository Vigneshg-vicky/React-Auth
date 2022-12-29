import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import AdminTable from '../../components/adminTable/AdminTable'
import { selectAdminAuth } from '../../redux/Features/reducers/adminAuthSlice'


function Home() {
  const data = useSelector(selectAdminAuth)
  const myStyle = {
    backgroundImage: "url('https://images.alphacoders.com/597/597903.jpg')",
    backgroundColor: "#000",
    height: "100vh",
    fontSize: "50px",
    backgroundSize:"cover"
   
  };
  if(data.token){
    return (
      <>
      <Box sx={myStyle}>
        <div style={{width:"70%", margin:"auto" ,paddingTop:"4rem"}} >
          <h4>USER MANAGEMENT</h4>
        <AdminTable/>
        </div>
      </Box>
      </>
    )
  }else{
    return(
      <Navigate to='/admin/login' />
    )
  }
}

export default Home