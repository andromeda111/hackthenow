import React from 'react'

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
				<input type="file" onChange={e => this.onChange(e)} />
			</div>
		)
	}
}

export default App
