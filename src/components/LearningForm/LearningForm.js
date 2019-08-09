import React from 'react'
import { Input, Label} from '../Form/Form'
import Button from '../Button/Button'
import config from '../../config'
import TokenService from '../../services/token-service';
import TestContext from '../../contexts/TestContext';

export default class LearningForm extends React.Component {
  state = {
    error: null,
    value: null,
    isCorrect: null,
    answer: null,
  }

  static contextType = TestContext
  firstInput = React.createRef()

  handleGuessSubmit = (e) => {
    e.preventDefault();
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ guess: this.state.value }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
    )
      .then((res) => {
        this.setState({
          answer: res.answer,
          isCorrect: res.isCorrect,
          nextWord: res.nextWord
        })
        this.context.updateState(res)
      })
  }
   

  handleChange = e => {
    this.setState({ value: e.target.value.toLowerCase() })
    console.log(this.state.value)
  }

  handleNextClick = () => {
    this.setState({
      isCorrect: null,
      answer: null,
    })
    this.context.updateNextWord(this.state.nextWord)
  }

  renderIncorrect() {
    return (
      <>
        <div className='DisplayScore'>
          <p>Your total score is: {this.context.nextWord.totalScore}</p>
          <h2>Good try, but not quite right :(</h2>
        </div>
        <div className='DisplayFeedback'>
          <p>The correct translation for {this.context.nextWord.nextWord} was {this.state.answer} and you chose {this.state.value}!</p>
          <Button type='button' onClick={this.handleNextClick}>
            Try another word!
          </Button>
        </div>
      </>
    )
  }

  renderCorrect() {
    return (
      <>
      <div className='DisplayScore'>
        <p >Your total score is: {this.context.nextWord.totalScore}</p>
        <h2>You were correct! :D</h2>
      </div>
      <div className='DisplayFeedback'>
        <p>The correct translation for {this.context.nextWord.nextWord} was {this.state.answer} and you chose {this.state.value}!</p>
        <Button type='button' onClick={this.handleNextClick}>
          Try another word!
        </Button>
        </div>
      </>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleGuessSubmit}>
        <p>Your total score is: {this.context.nextWord.totalScore}</p>
        <h2>Translate the word:</h2>
        <span>{this.context.nextWord.nextWord}</span>
          <div role='alert' className='error'>
            {this.state.error && <p>{this.state.error}</p>}
          </div>
          <div>
            <Label htmlFor='learn-guess-input'>
              What's the translation for this word?
          </Label>
            <br />
            <Input
              ref={this.firstInput}
              id='learn-guess-input'
              name='learn-guess-input'
              required
              onChange={e => this.handleChange(e)}
            />
          </div>
          <main>
            You have answered this word correctly {this.context.nextWord.wordCorrectCount} times.
          <br />
            You have answered this word incorrectly {this.context.nextWord.wordIncorrectCount} times.
        </main>

          <Button type='submit'>
            Submit your answer
        </Button>
        </form>
    )
  }

  render() {
    console.log(this.context.nextWord.wordIncorrectCount)
    return (
        <div className='form'>
        {(!this.state.answer && !this.state.isCorrect) && this.renderForm()}
        {this.state.isCorrect && this.renderCorrect()}
        {(!this.state.isCorrect && this.state.answer) && this.renderIncorrect()}
      </div>
    )
  }
}