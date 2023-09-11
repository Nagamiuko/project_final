import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataToonOne = (bookid) =>{
    const [databookone, setData] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apidatatoonone}/${bookid}`)
              setData(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[bookid])
   return {databookone , loadings , error }
}
export default useFetchDataToonOne