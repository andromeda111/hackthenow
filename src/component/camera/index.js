import React from 'react'
import superagent from 'superagent'

let movieAPIKey = 'a6de91618bcf933ac45ea50b3a3eda26'
let getMoviesRootURL = `https://api.themoviedb.org/3/discover/movie?api_key=${movieAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
let capturedImage
let highestEmo
let emotions
let personResults = []
let ids

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
				console.log(capturedImage)
				this.getSimilarPeople()
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
				resolve(blob)
			})
		})
	}

	emotions = blob => {
		console.log('triggered emotions', blob)
		$.ajax({
			url:
				'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
			beforeSend: function(xhrObj) {
				xhrObj.setRequestHeader(
					'Content-Type',
					'application/octet-stream'
				)
				xhrObj.setRequestHeader(
					'Ocp-Apim-Subscription-Key',
					'e7afc5c83a4e4ef8adb3859baf2d10a6'
				)
			},
			type: 'POST',
			processData: false,
			data: blob,
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

	getSimilarPeople = () => {
		let blob = capturedImage
		let sourceImg = new FormData(document.forms[0])

		sourceImg.append('sourceImg', blob)

		$.ajax({
			url:
				'https://api.cognitive.microsoft.com/bing/v7.0/images/details?modules=RecognizedEntities',
			beforeSend: xhrObj => {
				// Request headers
				xhrObj.setRequestHeader('Content-Type', 'multipart/form-data')
				xhrObj.setRequestHeader(
					'Ocp-Apim-Subscription-Key',
					'3873387e25024b2ca2ec0ce5a31fe915'
				)
			},
			type: 'POST',
			processData: false,
			data: sourceImg,
		}).done(res => {
			let resultsArray =
				res.recognizedEntityGroups.value[1].recognizedEntityRegions[0]
					.matchingEntities

			let matches = resultsArray.filter(result => {
				return result.entity.jobTitle.toLowerCase().includes('act')
			})

			personResults = matches
			console.log(personResults)
			this.getPersonId()
		})
	}

	getPersonId = () => {
		ids = []
		let names = []
		personResults.map(actor => {
			names.push(actor.entity.name.split(' ').join('-'))
		})
		names.map(name => {
			superagent
				.get(
					`https://api.themoviedb.org/3/search/person?api_key=a6de91618bcf933ac45ea50b3a3eda26&language=en-US&query=${name}&page=1&include_adult=false`
				)
				.end((err, res) => {
					if (err) return console.log(err)
					let id = res.body.results[0].id
					ids.push(id)
				})
		})
		setTimeout(() => this.getMoviesWithPerson(), 1500)
	}

	getMoviesWithPerson() {
		let genres = '35|28'
		// let people = ids.join('|')
		let results = []
		ids.map(id => {
			$.ajax({
				url: `${getMoviesRootURL}&with_genres=${genres}&with_cast=${id}`,
				type: 'GET',
			}).done(res => {
				results.push(res.results[0])
			})
		})
		console.log(results)
	}

	/***********
		HTML
	************/
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
