import React from 'react'

let capturedImage

class Camera extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount = () => {
		let canvas = document.getElementById('canvas')
		let context = canvas.getContext('2d')
		let video = document.getElementById('video')

		document.getElementById('snap').addEventListener('click', () => {
			context.drawImage(video, 0, 0, 320, 240)
			this.createImageBlob(canvas).then(blob => {
				capturedImage = blob
				console.log(capturedImage)
			})
		})

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(stream => {
					video.src = window.URL.createObjectURL(stream)
					video.play()
				})
		}
	}

	createImageBlob = canvas => {
		return new Promise(resolve => {
			let file = canvas.toBlob(blob => {
				resolve(URL.createObjectURL(blob))
			})
		})
	}

	onChange = e => {
		e.preventDefault()
	}

	render() {
		return (
			<div className="">
				<video id="video" width="320" height="240" autoPlay />
				<button id="snap">Snap Photo</button>
				<canvas id="canvas" width="320" height="240" />
			</div>
		)
	}
}

export default Camera
