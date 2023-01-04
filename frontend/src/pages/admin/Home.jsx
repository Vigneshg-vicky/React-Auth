import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import AdminTable from "../../components/adminTable/AdminTable";
import { selectAdminAuth } from "../../redux/Features/reducers/adminAuthSlice";
import { deleteAdminToken } from "../../redux/Features/reducers/adminAuthSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectAdminAuth);
  const myStyle = {
    // backgroundImage: "url('https://images.alphacoders.com/597/597903.jpg')",
    backgroundColor: "#23cfc0",
    height: "100vh",
    fontSize: "50px",
    backgroundSize: "cover",
  };
  const LogoutAdmin = ()=>{
    console.log("hvkhvkh")
    dispatch(deleteAdminToken())
    navigate('/admin/login')
    
  }
  if (data.token) {
    return (
      <>
        <Box sx={myStyle}>
          <div style={{ width: "70%", margin: "auto", paddingTop: "4rem" }}>
            <h4>USER MANAGEMENT</h4>
            <AdminTable />
          </div>
          <button style={{width:"10rem", marginLeft:"13.9rem"}} className="btn btn-primary" onClick={LogoutAdmin}>Logout</button>
        </Box>
      </>
    );
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default Home;
