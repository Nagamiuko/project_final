import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataToonChapterImage = (bookid,chapterid) =>{
    const [databookchapterimage, setData] = useState([])
    const [loadings, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.get(`${config.apidatatoonchapterbookimage}/${chapterid}/${bookid}`)
              setData(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[bookid,chapterid])
  //   const reFetch  = async () =>{
  //     setLoading(true)
  //     try{
  //       const res = await axios.get(`${config.apidatatoonone}`)
  //       setData(res.data)
  //     }catch(err){
  //       setError(err)
  //     }
  //     setLoading(false)
  //  }
   return {databookchapterimage , loadings , error }
}
export default useFetchDataToonChapterImage
