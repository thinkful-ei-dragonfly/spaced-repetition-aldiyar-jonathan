import React, { Component } from 'react';
import config from '../config';
import TokenService from '../services/token-service'
const TestContext = React.createContext({

})

export default TestContext;

export class TestProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      userLanguage: {},
      userWords: [],
      nextWord: {},
    }

    this.state = state;
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(languageRes => {
        if (!languageRes.ok) {
          return languageRes.json()
            .then(e => Promise.reject(e));
        }
        return languageRes.json();
      })
      .then(response => {
        this.setState({
          userLanguage: response.language,
          userWords: response.words
        })
      })
      .catch(error => {
        console.error(error);
      });
      
      fetch(`${config.API_ENDPOINT}/language/head`, {
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
      .then(nextWordRes => {
        if(!nextWordRes.ok) {
          return nextWordRes.json()
          .then(e => Promise.reject(e))
        }
        return nextWordRes.json()
      })
      .then(nextWord => {
        this.setState({
          nextWord
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  updateState = response => {
    this.setState({
      nextWord: {...this.state.nextWord, totalScore: response.totalScore, wordCorrectCount: response.wordCorrectCount, wordIncorrectCount: response.wordIncorretCount}
    })
  }

  updateTotalScore = () => {
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(languageRes => {
        if (!languageRes.ok) {
          return languageRes.json()
            .then(e => Promise.reject(e));
        }
        return languageRes.json();
      })
      .then(response => {
        this.setState({
          userLanguage: response.language,
          userWords: response.words
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateNextWord = (value) => { 
    this.setState({
      nextWord: {...this.state.nextWord, nextWord: value}
    })
  }
  render() {
    const value = {
      userLanguage: this.state.userLanguage,
      userWords: this.state.userWords,
      nextWord: this.state.nextWord,
      updateState: this.updateState,
      updateNextWord: this.updateNextWord
    }
    return (
      <TestContext.Provider value={value}>
        {this.props.children}
      </TestContext.Provider>
    )
  }
}