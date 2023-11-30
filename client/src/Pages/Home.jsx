import { useState, useEffect } from 'react';
import todoimg from '../todolistimg.svg';
import { Form, Input, message } from 'antd';
import axios from 'axios';

const generateRandomString = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomBytes = new Uint8Array(length);
  window.crypto.getRandomValues(randomBytes);
  const result = Array.from(randomBytes)
    .map((byte) => charset[byte % charset.length])
    .join('');
  return result;
};


const TodoItem = ({id, list,handleremove})=>{
  return(
    <div
    className='w-full flex  bg-slate-300 h-10 items-center rounded-lg shadow-lg'
  >
    <h1 className='ml-10  w-full textwhi1'>{list}</h1>
    <span className='flex justify-end'>
      <button
        className='bg-blue-950 text-white font-bold flex abs p-2 '
        onClick={()=>handleremove(id)}
      >
        Remove
      </button>
    </span>
  </div>
  )
}

const Home = () => {
  const [data, setdata] = useState([]);
  const [todos,setTodos] = useState("noUpdate");

  const listHandle = async (values) => {
    try {
      const id = generateRandomString(16);
      const data = { ...values, "id": id };
      const res = await axios.post('http://localhost:8080/api/user/listdata', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (res.data.success) {
        message.success('Successfully added');
        setTodos("update")
        // window.location.reload();
      }
    } catch (err) {
      message.error(err);
    }
  };

  const handleremove = async (id) => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/user/removedata',
        {id},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      setTodos("remove")
      if (res.data.success) {
        message.success('Successfully removed');
      }
    } catch (err) {
      // message.error('Error while removing');
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/user/getdata', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setdata(res.data.listdata);
        setTodos("noUpdate")
      } catch (err) {
        console.log(err);

      }
    };
    fetchdata();
  }, [todos]);

  return (
    <div className='w-screen h-screen flex flex-col bg-slate-200 md:overflow-hidden'>
      <div className='w-screen flex justify-center'>
        <div className='inline-block bg-slate-700 w-1/2 md:w-1/4 text-center h-14 shadow-sm rounded-sm'>
          <h1 className='text-2xl text-fuchsia-500 font-bold mt-2'>TODO-LIST</h1>
        </div>
      </div>
      <div className='w-full h-screen flex flex-col md:flex-row-reverse mt-4 bg-slate-200'>
        <div className='md:w-1/2'>
          <img src={todoimg} alt='' />
        </div>
        <div className='flex flex-col  w-full h-full bg-slate-200'>
          <div className='md:mx-20 mt-16 md:flex-row flex-col md:w-5/6 w-full '>
            <Form onFinish={listHandle} className='flex space-x-8 md:flex-row flex-col'>
              <div className='w-full md:px-0 px-2'>
                <Form.Item name='list'>
                  <Input className='md:w-full w-full  h-10 shadow-2xl px-10 ' type='text' />
                </Form.Item>
              </div>
              <div className='md:mb-0 mb-5 md:w-32 w-full md:right-0  relative right-8 md:px-0 px-2 '>
                <button className='md:w-32 w-full h-10 text-center bg-blue-900  rounded-3xl text-white font-bold shadow-2xl '>
                  Add
                </button>
              </div>
            </Form>
          </div>
          <div className='w-full h-full overflow-auto space-y-5 mb-20 md:mx-4 p-2 '>
            {data.map((d, index) => (
             <TodoItem key={index} id={d.id} list={d.list} handleremove={handleremove}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import { useState, useEffect } from 'react';
// import todoimg from '../todolistimg.svg';
// import { Form, Input, message } from 'antd';
// import axios from 'axios';

// const generateRandomString = (length) => {
//   const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   const randomBytes = new Uint8Array(length);
//   window.crypto.getRandomValues(randomBytes);
//   const result = Array.from(randomBytes)
//     .map((byte) => charset[byte % charset.length])
//     .join('');
//   return result;
// };

// const TodoItem = ({ id, list, handleremove, fetchData }) => {
//   const onRemove = async () => {
//     try {
//       await handleremove(id);
//       fetchData(); // Fetch data again after removal
//     } catch (err) {
//       // Handle error
//       message.error('Error while removing');
//     }
//   };

//   return (
//     <div className='w-full flex  bg-slate-300 h-10 items-center rounded-lg shadow-lg'>
//       <h1 className='ml-10  w-full textwhi1'>{list}</h1>
//       <span className='flex justify-end'>
//         <button className='bg-blue-950 text-white font-bold flex abs p-2 ' onClick={onRemove}>
//           Remove
//         </button>
//       </span>
//     </div>
//   );
// };

// const Home = () => {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/user/getdata', {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       });
//       setData(res.data.listdata);
//     } catch (err) {
//       console.log(err);
//       message.error('Error in data retrieval');
//     }
//   };

//   const listHandle = async (values) => {
//     try {
//       const id = generateRandomString(16);
//       const data = { ...values, id };
//       await axios.post('http://localhost:8080/api/user/listdata', data, {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       });
//       message.success('Successfully added');
//       fetchData(); // Fetch data again after adding
//     } catch (err) {
//       message.error(err);
//     }
//   };

//   const handleremove = async (id) => {
//     try {
//       await axios.post('http://localhost:8080/api/user/removedata', { id }, {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       });
//       message.success('Successfully removed');
//     } catch (err) {
//       // Handle error
//       message.error('Error while removing');
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Fetch data on component mount
//   }, []);

//   return (
//     <div className='w-screen h-screen flex flex-col bg-slate-200 md:overflow-hidden'>
//       <div className='w-screen flex justify-center'>
//         <div className='inline-block bg-slate-700 w-1/2 md:w-1/4 text-center h-14   '>
//           <h1 className='text-2xl text-fuchsia-500 font-bold mt-2'>TODO-LIST</h1>
//         </div>
//       </div>
//       <div className='w-full h-screen flex flex-col md:flex-row-reverse mt-4 bg-slate-200'>
//         <div className='md:w-1/2'>
//           <img src={todoimg} alt='' />
//         </div>
//         <div className='flex flex-col  w-full h-full bg-slate-200'>
//           <div className='md:mx-20 mt-16 md:flex-row flex-col'>
//             <Form onFinish={listHandle} className='flex space-x-8 md:flex-row flex-col'>
//               <div className='w-full'>
//                 <Form.Item name='list'>
//                   <Input className='md:w-full w-screen h-10 shadow-2xl' type='text' />
//                 </Form.Item>
//               </div>
//               <div className='md:mb-0 mb-5 '>
//                 <button className='w-[300px] md:w-32 h-10 text-center bg-blue-900 rounded-3xl text-white font-bold shadow-2xl '>
//                   Add
//                 </button>
//               </div>
//             </Form>
//           </div>
//           <div className='w-full h-full overflow-auto space-y-5 mb-20 md:mx-4 p-2'>
//             {data.map((d, index) => (
//               <TodoItem key={index} id={d.id} list={d.list} handleremove={handleremove} fetchData={fetchData} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
