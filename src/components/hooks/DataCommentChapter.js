import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataCommentChapter = (chapterid) =>{
    const [datacomchapter, setDataChapter] = useState([])
    const [loadChapter, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apiuserGetCommentChapter}/${chapterid}`)
              setDataChapter(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[chapterid])
   return {datacomchapter , loadChapter , error }
}
export default useFetchDataCommentChapter