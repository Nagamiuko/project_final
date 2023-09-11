import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataNovel = () =>{
    const [datanovel, setDataFile] = useState([])
    const [loadnovel, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apidatanovelallcompose}`)
              setDataFile(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[])
   return {datanovel , loadnovel , error }
}
export default useFetchDataNovel