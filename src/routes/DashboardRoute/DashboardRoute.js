import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../config';
import TokenService from '../../services/token-service';
import Button from '../../components/Button/Button';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  // state = {
  //   userLanguage: {},
  //   userWords: []
  // }

  // componentDidMount() {
  //   fetch(`${config.API_ENDPOINT}/language`, {
  //     headers: {
  //       'authorization': `Bearer ${TokenService.getAuthToken()}`,
  //     }
  //   })
  //     .then(languageRes => {
  //       if (!languageRes.ok) {
  //         return languageRes.json()
  //           .then(e => Promise.reject(e));
  //       }
  //       return languageRes.json();
  //     })
  //     .then(response => {
  //       console.log(response);
  //       this.setState({
  //         userLanguage: response.language,
  //         userWords: response.words
  //       })
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }




  
  render() {
    let options = this.props.state.userWords.map((word, index) => {
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
          <h2>{this.props.state.userLanguage.name}</h2>
        </div>
        <div>
          <p>Total correct answers: {this.props.state.userLanguage.total_score}</p>
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
