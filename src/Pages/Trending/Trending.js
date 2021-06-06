import React, { useEffect, useState } from 'react';
import axios from 'axios'
import SingleContent from '../../components/singlecontent/singlecontent';
import './trending.css'
import Custompagination from '../../components/pagination/pagination';

const Trending=()=>{
    const [content,setContent]=useState([])
    const [page,setPage]= useState(1)
    const fetchTrending=async()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        //console.log(data);
        setContent(data.results);
    };
    useEffect(()=>{
        fetchTrending();
    },[page]);
    return(
    <div>
        <span className="pageTitle">Trending</span>
        <div className="trending">
            {content && content.map((item)=>
                <SingleContent key={item.id} 
                id={item.id} 
                poster={item.poster_path} 
                title={item.title || item.name} 
                date={item.first_air_date || item.release_date}
                media={item.media_type} 
                votes={item.vote_average}/>)}
        </div>
        <Custompagination setPage={setPage}/>
    </div>  
    )   
}

export default Trending;