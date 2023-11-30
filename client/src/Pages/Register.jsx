import {Form,Input,message} from 'antd';
import axios from 'axios';
import {useNavigate}from'react-router-dom'
const Register =()=>{
    const Navigate=useNavigate();
    const HandleSubmit=async(values)=>{
        console.log(values);
        try{
            const res=await axios.post('http://localhost:8080/api/user/register',values);
            if(res.data.success){
                message.success(res.data.message)
                Navigate('/login')
            }else{
                message.error("Email Already Registered");
            }
        }catch(e){
            console.log(e);
            message.error("Can't register");
        }
    }
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-slate-200'>
            <div className=' border-2 border-gray-400 flex justify-center flex-col flex-wrap md:p-20 p-10 rounded-xl  shadow-xl'>
            <div className='flex justify-center mb-8'>
                <h1 className='text-xl font-bold '>Register</h1>
            </div>
            <div className=''>
                <Form className='flex flex-col' onFinish={HandleSubmit}>
                    <Form.Item label='Name' name="name" className=' '>
                        <Input className='md:w-60 md:inline-flex md:start-5 ' type='text'/>
                    </Form.Item>
                    <Form.Item label='Email'  name="email" className=' '>
                        <Input className='md:w-60 md:inline-flex md:start-6'  type='email'/>
                    </Form.Item>
                    <Form.Item label='Password'  name="password" className=''>
                        <Input className='md:w-60' type='password'/>
                    </Form.Item>
                    <button className=' h-8 border-2 border-green-400 bg-green-400 rounded-2xl text-white font-bold shadow-xl'>Register</button>
                </Form>
            </div>
            </div>
        </div>
    )
}
export default Register;