import axios from "axios";
import { useEffect , useState } from "react";
import config from '../../config.json'
const useFetchDataCommentBooks = (book_id) =>{
    const [dataCommentBook, setCmentBook] = useState([])
    const [loadCment, setLoading] = useState(false)
    const [error, setError] = useState([])
    
    useEffect(() => {
         const fetchData = async () =>{
            setLoading(true)
            try{
              const res = await axios.post(`${config.apiuserGetCommentBooks}/${book_id}`)
              setCmentBook(res.data)
            }catch(err){
              setError(err)
            }
            setLoading(false)
         }
       fetchData()
    },[book_id])
   return {dataCommentBook , loadCment , error }
}
export default useFetchDataCommentBooks