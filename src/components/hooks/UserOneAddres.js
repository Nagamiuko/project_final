import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchUpdataAddres = (adreid) =>{
    const [datanew, setDataFile] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
      const fetchData = async () =>{
         setLoading(true)
         try{
           const res = await axios.post(`${config.apiuserOneaddress}/${adreid}`)
           setDataFile(res.data)
         }catch(err){
           setError(err)
         }
         setLoading(false)
      }
    fetchData()
 },[adreid])
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
   return {datanew , loadings , error }
}
export default useFetchUpdataAddres