import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataAddress = (user_id) =>{
    const [data_address, setDataFile] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apiuseraddress}/${user_id}`)
              setDataFile(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[user_id])
   // const reFetch  = async () =>{
   //    setLoading(true)
   //    try{
   //       const res = await axios.post(`${config.apiuseraddress}/${user_id}`)
   //       setDataFile(res.data)
   //    }catch(err){
   //      setError(err)
   //    }
   //    setLoading(false)
   // }
   return {data_address , loadings , error ,setDataFile}
}
export default useFetchDataAddress