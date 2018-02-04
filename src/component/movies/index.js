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
        {movies.map((movie, idx) => {
          if (movie) {
            let poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            return (
              <div className='poster' key={idx}>
                <img style={{ width: '150px' }} src={poster} />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default Movies
