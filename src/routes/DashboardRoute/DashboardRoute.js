import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button';
import './DashboardRoute.css';
import TestContext from '../../contexts/TestContext';

class DashboardRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  static contextType = TestContext;

  render() {
    let options = this.context.userWords.map((word, index) => {
      return (
        <div key={index} className='wordComponent'>
          <li>
            <div className='word-title'>
              <h4>{word.original}</h4>
            </div>
            <div className='word-counters'>
              <span>correct answer count: {word.correct_count}</span>
              <br/>
              <span>incorrect answer count: {word.incorrect_count}</span>
            </div>
          </li>
        </div>
          
       
      )
    })
    return (
      <section>
        <div className='language'>
          <h2>{this.context.userLanguage.name}</h2>
        </div>
        <div>
          <p>Total correct answers: {this.context.userLanguage.total_score}</p>
        </div>
        <div className='words'>
          <h3>Words to practice</h3>
          <ul>
            {options}
          </ul>
        </div>
        <div className='controls'>
          <Link to='/learn'>
            <Button type='button'>
              Start practicing
            </Button>
          </Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute
