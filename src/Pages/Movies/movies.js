import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../components/genres';
import useGenres from '../../components/hooks/usegenres';
import Custompagination from '../../components/pagination/pagination';
import SingleContent from '../../components/singlecontent/singlecontent';
const Movies=()=>{
    const [page,setPage] = useState(1);
    const [content,setContent]=useState([]);
    const [numofPages,setNumofpages] =useState();
    const [selectedGenres,setSelectedGenres]=useState([]);
    const [genres,setGenres]=useState([]);
    const genreforURL=useGenres(selectedGenres);

    const fetchmovies= async ()=>{
        const {data} =await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        console.log(data); 
        setContent(data.results);
        setNumofpages(data.total_pages);
    }

    useEffect(()=>{
        fetchmovies();
        // eslint-disable-next-line
    },[page,genreforURL]);

    return(
        <div>
        <span className="pageTitle">Movies</span>
        <Genres
        type='movie' 
        selectedGenres={selectedGenres} 
        setSelectedGenres={setSelectedGenres}
        genres={genres} 
        setGenres={setGenres}
        setpage={setPage}/>
        <div className="trending">
            {content && content.map((item)=>
                <SingleContent key={item.id} 
                id={item.id} 
                poster={item.poster_path} 
                title={item.title || item.name} 
                date={item.first_air_date || item.release_date}
                media='movie'
                votes={item.vote_average}/>)}
        </div>
        {numofPages > 1 && (<Custompagination setPage={setPage} numOfPages={numofPages}/>) }
        </div>
    )
}

export default Movies;