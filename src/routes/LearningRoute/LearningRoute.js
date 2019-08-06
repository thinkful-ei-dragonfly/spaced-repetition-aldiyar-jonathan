import React, { Component } from 'react'
import LearningForm from '../../components/LearningForm/LearningForm'

class LearningRoute extends Component {
  render() {
    console.log(this.props)
    return (
      <main>
        <h2>Translate the word:</h2>
        <span>{this.props.state.nextWord.nextWord}</span>
        <p>Your total score is: {this.props.state.nextWord.totalScore}</p>
        <LearningForm correct={this.props.state.nextWord.wordCorrectCount} incorrect={this.props.state.nextWord.wordIncorrectCount}/>
      </main>
    );
  }
}

export default LearningRoute
