import React, { Component } from 'react'
import LearningForm from '../../components/LearningForm/LearningForm'
import TestContext from '../../contexts/TestContext';

class LearningRoute extends Component {
  static contextType = TestContext;
  render() {
    return (
      <main>
        <h2>Translate the word:</h2>
        <span>{this.context.nextWord.nextWord}</span>
        <p className='DisplayScore'>Your total score is: {this.context.nextWord.totalScore}</p>
        <LearningForm/>
      </main>
    );
  }
}

export default LearningRoute
