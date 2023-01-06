
// Fetching foods for class based on "ClassID" for search page 
//this component is one of the options of radio buttons
// Tha other options will be activities for each class and teachers for each class


import React from 'react'
import { useState } from 'react';
import styled, { StyledComponent } from 'styled-components'
import ShowFoods from './ShowFoods'

// search = classId  we will get from user in main search page

function GetFoods() {
    const[search,setSearch]=useState("");
    const[MyFood,setFood]=useState([]);
    
    const searchFood=(evt)=>{
        if(evt.key=="Enter"){
            fetch(`http://localhost:8080//class/foods/{search}`)
             .then(res=>res.json())
             .then(data=>{
                //console.log(data.meals) 
                setFood(data.Food)
             })
             
        }
    }


    return (
        <div className="main">
             <div className="heading">
              
             </div>

             <div className="searchBox"> 
                  <i class="fas fa-search"></i>
                  <input type="search" className="search-bar" placeholder="Enter Your Class ID" 
                  onChange={(e)=>setSearch(e.target.value)} 
                  value={search} onKeyPress={searchFood}></input>
                  
             </div>

             <div className="container">

                 {
                    //  MyFood is all the fetched Foods from the api in BackEnd 
                    // by map, I'm sending each of these in to ShowFood component that
                    //will show differnt feilds of Food like photo, Name,... in predefined structure
                    
                     (MyFood==null)? <p>Not Found</p> : MyFood.map((res)=>{
                         return(
                            <ShowFoods data={res}/>
                         )
                     })
                     


                 }
              
             </div>
 
        </div >
        
    )
}

export default GetFoods