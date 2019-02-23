import React, { Component } from 'react';
//using hashrouter to deploy to github pages, known issues with browser router?
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Header from './components/layout/Header';
import About from './components/pages/About';
// import Test from './components/test/Test';
import NotFound from './components/pages/NotFound';

import { Provider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
        {/* <Router basename="process.env.PUBLIC_URL"> */}
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contacts/add" component={AddContact} />
                <Route
                  exact
                  path="/contacts/edit/:id"
                  component={EditContact}
                />
                <Route exact path="/about" component={About} />
                {/* <Route exact path="/test" component={Test} /> */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

/** NOTE
 ** 1. Provider is the outermost element, appended to root.
 ** 2. Router wraps our App component
 ** 3. Header is not wrapped in Switch, bc it appears on each page.
 ** 4. Switch is placed inside of a container which will then render each route.
 */

/**  NOTE 
**  Adding Routes:
**  1. Create Route inside Switch with 3 attributes:
        a. exact - matches the path exactly.
        b. path="/path" - sets the path
        c. component={componentName} - refers to the component to be rendered.
*/

/**  NOTE 
**  for deployment: we exchanged browserRouter for hashRouter, because of known issues:
    https://github.com/facebook/create-react-app/issues/1765
**  suggested fixes:
**  Two solutions:

**  1. Don’t use HTML5 history on GitHub pages. Use [`hashHistory`](https://github.com/   ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory) instead. Your URLs will look like `https://rockchalkwushock.github.io/rcws-development/#path/inside/the/app`.

** 2. Use `process.env.PUBLIC_URL` in your route definitions so that they work both in development and after deployment. For example: `<Route path={process.env.PUBLIC_URL + '/'}>`. This will be empty in development and `rcws-development` (inferred from `homepage`) in production.
*
*/
