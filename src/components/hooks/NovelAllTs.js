import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataNovelTs = () =>{
    const [datanovelTs, setDataFile] = useState([])
    const [loadnoveltranslate, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apidatanovelalltranslate}`)
              setDataFile(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[])
   return {datanovelTs , loadnoveltranslate , error }
}
export default useFetchDataNovelTs