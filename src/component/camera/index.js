import React from 'react'

class Camera extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount = () => {
		let canvas = document.getElementById('canvas')
		let context = canvas.getContext('2d')
		let video = document.getElementById('video')

		document.getElementById('snap').addEventListener('click', function() {
			context.drawImage(video, 0, 0, 640, 480)
		})

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
				video.src = window.URL.createObjectURL(stream)
				video.play()
			})
		}
	}

	onChange = e => {
		e.preventDefault()
	}

	render() {
		return (
			<div className="app">
				<video id="video" width="640" height="480" autoplay />
				<button id="snap">Snap Photo</button>
				<canvas id="canvas" width="640" height="480" />
			</div>
		)
	}
}

export default Camera
