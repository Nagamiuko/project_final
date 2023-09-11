import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataNovelAlls = (Search) =>{
    const [datanovelAll, setDataFile] = useState([])
    const [load, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(config.apidatanovelalls)
              setDataFile(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[Search])
   return {datanovelAll , load , error }
}
export default useFetchDataNovelAlls