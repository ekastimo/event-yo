import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import store from "./data/store";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}>
        <App/>
</Provider>, document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
