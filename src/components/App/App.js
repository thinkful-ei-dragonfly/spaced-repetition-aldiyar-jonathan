import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'

export default class App extends Component {
  state = {
    userLanguage: {},
    userWords: [],
    nextWord: {},
    hasError: false
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/language`, {
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      }),
      fetch(`${config.API_ENDPOINT}/language/head`, {
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
    ])
      .then(([languageRes,nextWordRes]) => {
        if (!languageRes.ok) {
          return languageRes.json()
            .then(e => Promise.reject(e));   
        }
        if(!nextWordRes.ok) {
          return nextWordRes.json()
          .then(e => Promise.reject(e))
        }
        return Promise.all([
          languageRes.json(),
          nextWordRes.json()
        ]);
      })
      .then(([response, nextWord]) => {
        this.setState({
          userLanguage: response.language,
          userWords: response.words,
          nextWord
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <div className='App'>
        <Header className='header' />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={() => <DashboardRoute state={this.state} />}
            />
            <PrivateRoute
              path={'/learn'}
              component={() => <LearningRoute state={this.state} />}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
