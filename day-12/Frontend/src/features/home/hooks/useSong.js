import { getSong } from "../service/song.api";
import { Children, useContext } from "react";
import { SongContext } from "../song.context";


export const useSong =()=>{
    const context = useContext(SongContext)
    const {loading, song,setSong, setLoading} = context
    

    async function handleGetSong({mood})
    {
setLoading(true)
const data = await getSong({mood})
setSong(data)
setLoading(false)

 }
 return {handleGetSong, song, loading}
}

