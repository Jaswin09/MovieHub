import React, { useEffect } from 'react';
import axios from 'axios'
import { Chip } from '@material-ui/core';
const Genres=({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setpage
})=>{
    const handleAdd =(genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=> g.id !==genre.id));
        setpage(1);
    }  

    const handleremove=(genre)=>{
        setSelectedGenres(selectedGenres.filter((g) => g.id!==genre.id));
        setGenres([...genres,genre]);
        setpage(1);
    };

    const fetchgenres=async()=>{
      const {data}= await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    }
 
    //console.log(genres)
    useEffect(()=>{
        fetchgenres();
        return()=>{
            setGenres({});
        };
    },[])
    return( 
    <div style={{padding:"6px 0"}}>
        {selectedGenres.map((genre)=>(
            <Chip label={genre.name} 
            style={{margin:2}} 
            size="small" 
            color="primary"
            clickable 
            key={genre.id}
            //onClick={()=>handleremove(genre)}
            onDelete={()=>handleremove(genre)}
            />
        ))}
        {genres.map((genre)=>(
            <Chip label={genre.name} 
            style={{margin:2}} 
            size="small" 
            color="default"
            clickable 
            key={genre.id}
            onClick={()=>handleAdd(genre)}
            />
        ))}
    </div>
    );
   
}

export default Genres;