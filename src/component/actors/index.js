import React from 'react'

class Actors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let actors = this.props.actors ? this.props.actors : []
    return (
      <div className='actors'>
        <div />
      </div>
    )
  }
}

export default Actors
