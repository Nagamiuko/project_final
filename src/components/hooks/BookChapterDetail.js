import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataToonChapterDetail = (chapterid) =>{
    const [databookchapterdetail, setData] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apidatatoonbookchapterdatail}/${chapterid}`)
              setData(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[chapterid])
   return {databookchapterdetail , loadings , error }
}
export default useFetchDataToonChapterDetail
