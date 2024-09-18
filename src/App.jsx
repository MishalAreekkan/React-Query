import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios";
import { useState } from "react";
import ListedData from "./Component/ListedData";
function App() {
  const query = useQueryClient()
  const [show,setShow] = useState(false)
  const {data,error,isError,isLoading,isSuccess} = useQuery({
    queryKey:['users'],
    queryFn: async ()=>{
      const response = await axios ('http://127.0.0.1:8000/list/')
      return response.data 

    },
    enabled:show,
    refetchOnWindowFocus:false,
    // retry:5,
    // retryDelay,
  })
  if (isSuccess){
    console.log(data,"....data");
  }

  const {mutate} = useMutation({
    mutationFn: async () => {
      try {
        await axios('http://127.0.0.1:8000/register/', {
          method: 'POST',
          data: {
            id: 14,
            first_name: 'hhhh',
            email: 'hhaasa@gmail.com',
            password: '111',
            password2: '111',
          }
        });
      } catch (error) {
        console.log(error.response?.data);
      }
    },
    onSuccess:()=>{
      query.invalidateQueries({
        queryKey:['users']
      })
    }
  })


  return (
<>
  <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <h1 className="text-5xl font-bold mb-8 text-green-400">Hello Dear!</h1>
    
    <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-blue-400">Want to Show Users?</h3>
      <div className="flex space-x-4 mb-4 justify-center">
        <button 
          onClick={() => setShow(true)} 
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          Show Users
        </button>
        <button 
          onClick={() => mutate()} 
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          Add User
        </button>
      </div>
      
      {isError && <p className="text-red-400">Error loading data...</p>}
      <ul className="list-disc list-inside space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="bg-gray-700 p-2 rounded-lg shadow-sm">
            {user?.first_name}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-8">
      {/* Include the ListedData component */}
      <ListedData />
    </div>
  </div>
</>

  )
}

export default App


            //  didnt use try catch
            // retry is inbuild in reactQuery