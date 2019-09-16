# Movie App 2019

React JS Fundamentals Course

# props
## test1
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
같은 태그를 여러개 쓰는 건 너무 번거롭다

~~~js
{foodILike.map( dish => (
    <Food name={dish.name} />,
    <Image src={dish.image}/>
))}
~~~

여기서 dish는 object이다.따라서 dish는 첫번째로 Kimchi object 그리고 Bibimbap object 그리고 Doncasu object이다.

~~~js
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
~~~

이렇게 따로 써도 되고

~~~js
function Food({name,picture}){
    return(
        <div>
            <h1>I love {name}</h1>
            <img src={picture}/>
        </div>
    )
}
~~~

### Case 01
~~~js
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
~~~

### Case 02

~~~js
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
~~~

## yarn add prop-types
#### 타입을 확인할 수 있다!
~~~js
Food.propTypes = {
  name: Proptypes.string.isRequired,
  src: Proptypes.string.isRequired,
  rating: Proptypes.number.isRequired,
}
~~~


# State

~~~js
class App extends React.Component{}
~~~
App 은 React class component 에서 확장된 거!
React class component = cellphone
App = iphon, galuxy, samsung...

App은 react component 에서 확장되고 react component는 render method를 가지고 있다!
extend from 을 했기 때문에 render method가 있다!

### function VS class
**Function component**는 function이고 뭔가를 return해 그리고 screen에 표시!!
**class component**는 class야 하지만 react component로 부터 확장되고 screen에 표시돼. 그리고 그것을 render method안에 넣어야함!리액트는 자동적으로 모든 class component의 render method를 실행하고자 해

### class를 사용하는 이유
class에 있는 state를 사용하기 위해서! --> state는 데이터가 변함!


~~~js
class App extends React.Component{
  state = {
    count: 0
  };
  add = () => {
    this.setstate({ count:1 });
  };
  minus = () => {
    this.setstate({ count:-1 });
  };

  render(){
    return (
      <div>
        <h1>The number is:{this.state.count}</h1>
        <button onClick={this.add()}>Add</button>
        <button onClick={this.minus()}>Minus</button>
      </div>
    )
  }
}
~~~
setstate 사용! this.state를 직접 고쳐주면 안됌!

#### Case1
~~~js
add = () => {
  this.setstate({ count: this.state.count +1 })
};
~~~ 
#### Case2
~~~js
add = () => {
  this.setState( currnent => ({ count : current.count +1 }) )
};
~~~

### **매 순간 너가 setState를 호출할 때 마다 react는 새로운 state와 함께 render function을 호출할거야** 


### 현재 state의 결과값을 사용할 때
~~~js
  add = () => {
    this.setState({ count:this.state.count +1 })
  };
~~~
이 방법은 추천하지 않음!
~~~js
  add = () => {
    this.setState(current => ({ count: current.count +1 }))
  };
~~~
current사용추천!

**매 순간 내가 set State 를 호출할 때 마다 react는 새로운 state와 함께 render function을 호출할거다(=호출할때 마다 다시 render할거다!)**

## Life Cycle method
life cycle method는 기본적으로 react가 component를 생성하는 그리고 없애는 방법이다.
component가 생성될때, render전에 호출되는 몇가지 function이 있다. component가 render된 후, 호출되는 다른 function들이 존재한다.

1. Mounting 
  mounting은 "태어나는 것"과 같다.

2. Updating
  일반적인 업데이트를 의미

3. Unmounting
  component가 죽는것을 의미
  conponent가 어떻게 죽지? 페이지를 바꿀 때!


### function호출되는 순서

- **mounting에서**
1. constructor() :Javascript에서 class를 만들 때 호출되는거!

2. getDerivedStateFromProps()

3. render()

4. componentDidMount() : 이것은 기본적으로 우리들에게 "이봐 이 component는 처음 render됐어" 라고 알려줌

따라서 component가 mount될때, component가 screen에 표시될 때, component가 Webpage에 갈 때, constructor를 호출함.

- **update에서**
1. static getDerivedStateFromProps()

2. shouldComponentUpdate() : 업데이트를 할지말지 결정하는 것에 대한 것

3. render()
36
4. getSnapshotBeforeUpdate()

5. componentDidUpdate() :
  setSTate를 호출하면, component를 호출하고, 먼저 render를 호출한 다음 업데이트가 완료되었다고 말하면 componentDidUpdate가 실행될거다.

- **unmount에서(component가 죽을 때)**

componentWillUnmount를 호출할 수있다


### setState를 사용할 때 state안에 default값들을 선언할 필요는 없다.

## 4. Making the Movie App

### 4.0 Fetching Movies from API
YTS에서 만든 API를 사용할거다.

~~~js
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const movies = await axios.get("http://yts-proxy.now.sh/list_movies.json")
  };
  componentDidMount() {
    this.getMovies(); 
  };

  render(){
    const { isLoading } = this.state;

    return(
      <div>
        {isLoading ? "Loading..." : "We are ready"}
      </div>
    );
  }
}

export default App;
~~~
isLoading: true --> render --> componentDidMount (--> getMovies실행)

getMovies는 axios.get을 사용한다. 하지만 axios.get은 완료되기까지 시간이 조금 필요하기때문에 await을 넣음!
await은 async을 꼭 써야합니다!
async await을 하는 것은 우리가 기본적으로 javaScript에게 getMovies function에게 조금 시간이 필요하고 우리는 그걸 기다려야만 하다는 것을 말한다.

### 4.1 Rendering the Movies

step1. axios를 이용해서 데이터를 가져오자! --> state안에 넣어주자!
#### case1
~~~js
  getMovies = async () => {
    const movies = await axios.get("http://yts-proxy.now.sh/list_movies.json")
    console.log(movies.data.data.movies);
  };
~~~

#### case2
~~~js
  getMovies = async () => {
    const {data:{data:{movies}}} = await axios.get("http://yts-proxy.now.sh/list_movies.json")
    console.log(movies)
    this.setState({movies:movies, isLoading: false})
  };
~~~

step2. movie.js파일을 만들어서

movies component는 state를 필요로 하지 않는다
component가 state가 필요없을 경우에는 class component가 될 필요가 없다.
function component이용~

중요한 건 우리가 얻어 올 props를 찾기 시작하는 거야!

step3. rendering 해줘야됨
두가지 방법이 있다!
case1
그냥 false부분에 넣어주거나
~~~js
return <div>{isLoading? "Loading..." : movies.map()}</div>
~~~
case2
또는 renderMovies라는 다른 function을 만들 수 있다.
**우리는 state로 부터 movies를 가져와야되!!dont forget!!**
**항상 map으로부터 뭔가를 return해야되**

step4.import해주자!
step5.key값이 필요함!

