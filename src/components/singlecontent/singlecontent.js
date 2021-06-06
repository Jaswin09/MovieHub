import React from 'react';
import {Badge} from '@material-ui/core';
import { img_300, unavailable } from '../config/config';
import './singlecontent.css'
import ContentModal from '../contentmodal/contentmodal';

const SingleContent=({id,poster,title,date,media,votes})=>{
    return(
        <ContentModal media={media} id={id}>
            <Badge badgeContent={votes} color={votes>7?'primary':'secondary'}/>
            <img className="poster" src={poster? `${img_300}/${poster}` : unavailable } alt={title}/>
            <b className="title">{title}</b>
            <span className="subTitle">{media==="tv" ? "TV series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent;