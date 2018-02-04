import React from 'react'

class Movies extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let movies = this.props.movies ? this.props.movies : []
    return (
      <div className='movies'>
        <ul>
          {movies.map((movie, idx) => {
            if (movie) {
              console.log(movie)
              let poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
              console.log
              return (
                <li key={idx}>
                  <img style={{ width: '150px' }} className='movie-poster' src={poster} />
                  <p>
                    {movie.overview}
                  </p>
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}

export default Movies
