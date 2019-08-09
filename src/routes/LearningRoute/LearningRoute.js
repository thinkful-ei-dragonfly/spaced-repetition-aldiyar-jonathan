import React from 'react'
import LearningForm from '../../components/LearningForm/LearningForm'
import TestContext from '../../contexts/TestContext';

class LearningRoute extends React.PureComponent {
  static contextType = TestContext;
  render() {
    return (
      <main>
        <LearningForm/>
      </main>
    );
  }
}

export default LearningRoute
