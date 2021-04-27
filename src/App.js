import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from './components/MainComponent' ;
import { HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
};

export default App;