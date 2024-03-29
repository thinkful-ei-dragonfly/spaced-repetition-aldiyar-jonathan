import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { TestProvider } from '../../contexts/TestContext'
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
    hasError: false
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
        <main role='main'>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
              <PrivateRoute
              exact
              path={'/'}
              component={() => {
                return (
                  <TestProvider>
                    <DashboardRoute />
                  </TestProvider>
                )
              }} />
              <PrivateRoute
                path={'/learn'}
              component={() => {
                return (
                  <TestProvider>
                    <LearningRoute/>
                  </TestProvider>
                  )
                }}
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
