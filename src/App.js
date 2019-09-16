import React from 'react';
import axios from 'axios';
import Movie from "./Movie";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {data:{data:{movies}}} = await axios.get("http://yts-proxy.now.sh/list_movies.json")
    console.log(movies);
    this.setState({movies, isLoading: false})
    //this.setState({movies:movies})라고 해도됨 : 앞의 movies는 state에서 왔고 뒤의 movies는 axios에서 왔다.
    //{movies}로 합쳐서써도 js는 알아들음~굿ㅎ
    
  };
  componentDidMount() {
    this.getMovies(); 
  };

  render(){
    const { isLoading, movies } = this.state;

    return(
      <div>
        {isLoading ? "Loading..." : movies.map(movie => {
          return(
              <Movie
                key={movie.id} 
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image}
              />
        )
        })}
      </div>
    );
  }
}

export default App;