import React, { Component } from 'react';

function Food({name}){
  return(
    <h1>I love {name}</h1> 
  )
  //props.fav = {fav}
}

function Image({src}){
  return(
    <div>
      <h2>This is the photo</h2>
      <img src={src}/>
    </div>
  )
}


const foodILike = [
  {
    id:1,
    name:"Kimchi",
    image:"01.png"
  },
  {
    id:2,
    name:"Bibimbap",
    image:"02.png"
  },
  {
    id:3,
    name:"Doncasu",
    image:"03.png"
  },

]

function App(){
  return (
    <div>
      {foodILike.map( dish => (
      <Food name={dish.name} />,
      <Image src={dish.image}/>
      ))}
    </div>
  )
}


export default App;