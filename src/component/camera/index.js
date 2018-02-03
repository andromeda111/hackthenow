import React from 'react'

let capturedImage
let highestEmo
let emotions

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
				this.emotions(blob)
			})
		})

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
				video.src = window.URL.createObjectURL(stream)
				video.play()
			})
		}
	}

	createImageBlob = canvas => {
		return new Promise(resolve => {
			let file = canvas.toBlob(blob => {
				resolve(blob)
			})
		})
	}

	emotions = blob => {
		console.log('triggered emotions', blob)
		$.ajax({
			url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
			beforeSend: function(xhrObj) {
				xhrObj.setRequestHeader('Content-Type', 'application/octet-stream')
				xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'e7afc5c83a4e4ef8adb3859baf2d10a6')
			},
			type: 'POST',
			processData: false,
			data: blob
		})
			.done(function(data) {
				emotions = data[0].scores
				let keys = Object.keys(emotions)
				let highestVal = emotions[keys[0]]
				let highest
				for (let i = 1; i < keys.length; i++) {
					if (emotions[keys[i]] > highestVal) {
						highestVal = emotions[keys[i]]
						highest = keys[i]
					}
				}
				highestEmo = highest
				console.log(highestEmo, emotions)
			})
			.fail(function(err) {
				console.log('nope', err)
			})
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
