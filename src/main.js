import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import App from './component/app'
import { Provider } from 'react-redux'
import thunk from './lib/redux-thunk.js'
import reporter from './lib/redux-reporter.js'
import storage from 'redux-persist/es/storage'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { compose, createStore, applyMiddleware } from 'redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
	persistStore,
	persistCombineReducers,
	autoRehydrate
} from 'redux-persist'

const config = {
	key: 'oficianado',
	storage
}

let reducer = persistCombineReducers(config, {
})

let store = createStore(
	reducer,
	undefined,
	compose(applyMiddleware(thunk, reporter))
)
let persistor = persistStore(store)

class Main extends React.Component {
	componentWillMount() {
		// if (localStorage.access_token) {
		// 	store.dispatch(authActions.login(localStorage.access_token))
		// }
	}

	render() {
		const muiTheme = getMuiTheme({
			palette: {

			}
		})
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<MuiThemeProvider muiTheme={muiTheme}>
						<App />
					</MuiThemeProvider>
				</PersistGate>
			</Provider>
		)
	}
}

ReactDom.render(<Main />, document.getElementById('root'))