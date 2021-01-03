import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from './store';

//components
import Principal from './components/Principal';
import CrearBatido from './components/CrearBatido';
import VerBatidos from './components/Verbatidos';


function App() {

  return (
    <Router>

      <Provider store={store}>
        <div className="container">
          <Switch>
            
            <Route exact path='/' component={Principal} />

            <Route exact path='/batidos' component={VerBatidos} />

            <Route exact path='/batidos/nuevo' component={CrearBatido} />

            

          </Switch>

        </div>
      </Provider>

    </Router>
  );
}

export default App;
