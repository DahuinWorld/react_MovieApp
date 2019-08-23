# Movie App 2019

React JS Fundamentals Course

#props
##test1
~~~js
function App(){
  return (
    <div>
     <h1>Hello</h1>
     <Food fav="Kimchi"/>
     <Food fav="banana"/>
     <Food fav="cake"/>
     <Food fav="jelly"/>
    </div>
  )
}
~~~

우리는 우리가 가지고있지않은 데이터를 써줄 수 없다. 
같은 태그를 여러개 쓴느건 너무 번거롭다


{foodILike.map( dish => (
    <Food name={dish.name} />,
    <Image src={dish.image}/>
))}

여기서 dish는 object이다.따라서 dish는 첫번째로 Kimchi object 그리고 Bibimbap object 그리고 Doncasu object이다.

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

이렇게 따로 써도 되고
function Food({name,picture}){
    return(
        <div>
            <h1>I love {name}</h1>
            <img src={picture}/>
        </div>
    )
}

## Case 01
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

## Case 02
function renderFood(dish){
    console.log(dish);
    return (
        <Food key={dish.id} name={dish.name} picture={dish.image}/>
        )
}

function App(){
    return (
        <div>
            {foodILike.map(renderFood)}
        </div>
    )
}

yarn add prop-types
타입을 확인할 수 있다!
~~~js
Food.propTypes = {
  name: Proptypes.string.isRequired,
  src: Proptypes.string.isRequired,
  rating: Proptypes.number.isRequired,
}
~~~
