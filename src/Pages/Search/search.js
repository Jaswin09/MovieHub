import {Button,createMuiTheme,Tab,Tabs,TextField,ThemeProvider} from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import SingleContent from "../../components/singlecontent/singlecontent";
import Custompagination from "../../components/pagination/pagination";
import './search.css';
const Search=()=>{
    const [type,setType]=useState(0);
    const [page,setPage]=useState(1);
    const [searchtext,setSearchtext]=useState("");
    const [content,setContent]=useState();
    const [numofPages,setNumofpages]=useState();
    const darkTheme = createMuiTheme({
        pallete:{
            type:"dark",
            primary:{
                main:'#fff',
            },
        },
    });

    const fetchsearch=async()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchtext}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setNumofpages(data.total_pages);
    }

    useEffect(()=>{
        window.scroll(0,0);
        fetchsearch();
    },[type,page])
    return(
       <div>
           <ThemeProvider>
               <div className="search" style={{display:'flex',margin:"20px 0"}}>
                   <TextField
                style={{flex:1}}
                className="searchBox" 
                label="Search" 
                variant="filled"
                onChange={(e)=>setSearchtext(e.target.value)}
                />
                <Button variant="contained" style={{marginLeft : 10}} onClick={fetchsearch}> <SearchIcon/> </Button>
               </div>
               <Tabs 
               style={{paddingBottom:5}}
               aria-label="disabled tabs example"
               value={type} 
               indicatorColor="primary" 
               textColor="primary"
               onChange={(event,newvalue)=>{
                   setType(newvalue);
                   setPage(1);
               }}>
                   <Tab style={{ width:"50%" }} label="Search Movies"/>
                   <Tab style={{ width:"50%" }} label="Search TV Series"/>
               </Tabs>
            </ThemeProvider>  
            <div className="trending">
            {content && content.map((item)=>
            (
                <SingleContent key={item.id} 
                id={item.id} 
                poster={item.poster_path} 
                title={item.title || item.name} 
                date={item.first_air_date || item.release_date}
                media={type?'tv':'movie'}
                votes={item.vote_average}/>))}
                 {(searchtext && !content)?
                (type? <h2>No Series Found</h2>: <h2>No Movies Found</h2>):((type? <h2>...</h2>: <h2>...</h2>))}
        </div>
       
        {numofPages > 1 && (<Custompagination setPage={setPage} numOfPages={numofPages}/>) }     
    </div> 
    )   
}

export default Search;