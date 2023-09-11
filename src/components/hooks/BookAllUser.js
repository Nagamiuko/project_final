import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'


const useFetchAllUser = (user_id) =>{
   const [datatoonalluser , setDataToonAllUser] = useState([])
   const [loading,setLoading] = useState(false)
   const [error, setError] = useState()

   useEffect(() =>{
     const feth = async () => {
        setLoading(true)
        try{
           const res = await axios.post(`${config.apidatatoonalluser}/${user_id}`)
           setDataToonAllUser(res.data)
        }catch(err){
          setError(err)
        }
       setLoading(false)
     }

      feth()
   },[user_id])
    return {datatoonalluser , error , loading} 
}
export default useFetchAllUser