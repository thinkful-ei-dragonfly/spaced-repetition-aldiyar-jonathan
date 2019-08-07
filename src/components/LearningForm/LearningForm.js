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
  }
   

  handleChange = e => {
    this.setState({ value: e.target.value })
    console.log(this.state.value)
  }


  render() {
    console.log(this.context)
    const { error } = this.state
    return (
      <div>
        <form onSubmit={this.handleGuessSubmit} className='form'>
          <div role='alert' className='error'>
            {error && <p>{error}</p>}
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
      </div>
    )
  }
}