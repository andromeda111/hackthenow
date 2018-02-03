import React from 'react'
import Camera from '../camera'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	onChange = e => {
		e.preventDefault()
	}

	render() {
		return (
			<div className="app">
				<Camera />
			</div>
		)
	}
}

export default App
