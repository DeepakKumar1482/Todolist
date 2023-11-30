import { Navigate } from "react-router-dom";
const PublicRoutes=({children})=>{
    // const Navigate=useNavigate()
        if(localStorage.getItem('token')){
            return <Navigate to={'/'}/>
        }else{
            return children
        }
}
export default PublicRoutes;