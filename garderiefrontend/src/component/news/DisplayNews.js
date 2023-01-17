import React, { useState, useEffect } from 'react'
// import styled from "styled-components"
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import "./DisplayNews.css";

function DisplayNews() {
    const BASE_URL = "http://localhost:8080";
    const [news, setNews] = useState([]);
    const loadAdmins = async() => {
        await fetch("http://localhost:8080/news/latest")
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setNews(data);
          })
          .catch(err => {
            console.log("we have a problem " + err.message);
          });
    };
    useEffect(() => {
        loadAdmins();
      }, []);
      
  return (
    
      <Slide>
        {news.map((newsDetail, index) => (

            <div className="each-slide-effect" key={newsDetail.id}>
                <div height = "40">
                    { newsDetail.name }
                </div>
                <div className="slide-picture" style={ { 'backgroundImage': `url(${BASE_URL + newsDetail.picPath})` } }>
                </div>
                <div className="slide-picture">
                    <span>{ newsDetail.content }</span>
                </div>
            </div>

        ))}
    </Slide>

  )
}


export default DisplayNews;