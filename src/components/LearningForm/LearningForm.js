import React from 'react'
import { Input, Label, Required } from '../Form/Form'
import Button from '../Button/Button'
import config from '../../config'
import TokenService from '../../services/token-service';

export default class LearningForm extends React.Component {
  state = {
    error: null,
    value: null,
  }
  firstInput = React.createRef()

  handleSubmit = e => { 
    e.preventDefault()
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ guess: this.state.value}),
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
    const { error } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='form'>
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
            You have answered this word correctly {this.props.correct} times.
          <br />
            You have answered this word incorrectly {this.props.incorrect} times.
        </main>

          <Button type='submit'>
            Submit your answer
        </Button>
        </form>
      </div>
    )
  }
}