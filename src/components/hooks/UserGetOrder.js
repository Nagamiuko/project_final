import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchOrderUser = (userOr_Id) =>{
    const [dataOrder, setDataOrder] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
      const fetchData = async () =>{
         setLoading(true)
         try{
           const res = await axios.get(`${config.apiGetOrderUser}/${userOr_Id}`)
           setDataOrder(res.data)
         }catch(err){
           setError(err)
         }
         setLoading(false)
      }
    fetchData()
 },[userOr_Id])
   return {dataOrder , loadings , error }
}
export default useFetchOrderUser