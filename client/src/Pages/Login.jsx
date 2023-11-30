import {Form,Input,message}from 'antd';
import axios from 'axios';
import {useNavigate}from'react-router-dom';
const Login=()=>{
    const Navigate=useNavigate();
    const handleLogin=async(values)=>{
        try{
            const res=await axios.post('http://localhost:8080/api/user/login',values);
        if(res.data.success){
            await localStorage.setItem("token",res.data.token);
            message.success(res.data.message);
            Navigate('/')
        }
        }catch(err){
            message.error("Error in login")
        }
    }
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-slate-200'>
            <div className=' border-2 border-gray-400 flex justify-center flex-col flex-wrap md:p-20 p-10 rounded-xl  shadow-xl'>
            <div className='flex justify-center mb-8'>
                <h1 className='text-xl font-bold '>Login</h1>
            </div>
            <div className=''>
                <Form className='flex flex-col' onFinish={handleLogin}>
                    <Form.Item label='Email'  name="email" className=' '>
                        <Input className='md:w-60 md:inline-flex md:start-6'  type='email'/>
                    </Form.Item>
                    <Form.Item label='Password'  name="password" className=''>
                        <Input className='md:w-60' type='password'/>
                    </Form.Item>
                    <button className=' h-8 border-2 border-green-400 bg-green-400 rounded-2xl text-white font-bold shadow-xl'>Login</button>
                    <a href="/register" className='flex justify-center mt-5'><p>Don't have an accound?</p></a>
                </Form>
            </div>
            </div>
        </div>
    )
}
export default Login