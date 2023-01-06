//A template in which fields and fetched data from the api in backEnd are embedded in this structure
// getMeal is coming from ShowFood component and contains all the fields

import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import RecipeAction from './RecipeAction'


const ShowFoods=(getFood)=> {
    //console.log(getMeal.data)
    return (
     
           <div className="card" >
               <img src={getFood.data.name}/>
               <div className="info">
                   <h2>{getFood.data.name}</h2>
                   <p>{getFood.data.offerDate}Offerd Date</p>
                 </div>
               <div className="recipe">
               <h2>Description</h2>
                     <p>{getFood.data.description}</p>
                
                   
                   <img src={getFood.data.picPath}/>
               </div>
           
         </div>
     
        
    )
}
export default ShowFoods