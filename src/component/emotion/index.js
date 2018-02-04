import React from 'react'

class Emotion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let { emotion } = this.props
    return (
      <div className='emotion'>
        <canvas id='emotion-canvas' width='320' height='240' />
      </div>
    )
  }
}

export default Emotion
