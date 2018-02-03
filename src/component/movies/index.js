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
        <div />
      </div>
    )
  }
}

export default Movies
