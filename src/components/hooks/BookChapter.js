import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataToonChapter = (bookid) =>{
    const [databookchapter, setDataChapter] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.get(`${config.apidatatoonchapterbook}/${bookid}`)
              setDataChapter(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[bookid])
  
   return {databookchapter , loadings , error ,setDataChapter }
}
export default useFetchDataToonChapter
