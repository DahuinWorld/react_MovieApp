import React, { Component } from 'react';
import Proptypes from "prop-types";

function Food({name, src, rating}){
  return(
    <div>
      <h1>I love {name}</h1> 
      <h2>This is the photo</h2>
      <img src={src}/>
      <h2>Rate : {rating}/5</h2>
    </div>
  )
  //props.fav = {fav}
}

Food.propTypes = {
  name: Proptypes.string.isRequired,
  src: Proptypes.string.isRequired,
  rating: Proptypes.number.isRequired,
}

const foodILike = [
  {
    id:1,
    name:"Kimchi",
    image:"01.png",
    rating: 5
  },
  {
    id:2,
    name:"Bibimbap",
    image:"02.png",
    rating: 4.2
  },
  {
    id:3,
    name:"Doncasu",
    image:"03.png",
    rating: 4.8
  },

]

function App(){
  return (
    <div>
      {foodILike.map( dish => (
      <Food name={dish.name} src={dish.image} rating={dish.rating}/>
      ))}
    </div>
  )
}


export default App;