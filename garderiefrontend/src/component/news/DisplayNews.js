import React, { useState, useEffect } from 'react'
// import styled from "styled-components"
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import "./DisplayNews.css";

function DisplayNews() {
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
      
      
    
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    
      <Slide>
        {news.map((newsDetail, index) => (

            <div className="each-slide-effect" key={newsDetail.id}>
                <div height = "40">
                    { newsDetail.name }
                </div>
                <div className="slide-picture" style={ { 'backgroundImage': `url(${process.env.REACT_APP_BASE_URL + newsDetail.picPath})` } }>
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