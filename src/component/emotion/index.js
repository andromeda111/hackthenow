import React from 'react'

class Emotion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let { emotion } = this.props
    return <div className='emotion' />
  }
}

export default Emotion
