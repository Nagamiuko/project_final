import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataToonAll = () =>{
    const [datatoonall, setDataFile] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apidatatoonalls}`)
              setDataFile(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[])
   return {datatoonall , loadings , error }
}
export default useFetchDataToonAll