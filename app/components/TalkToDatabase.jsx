import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styles from '../../assets/css/TalkToDatabase.css';

export default class TalkToDatabase extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>TalkToDb</h2>
          {/*<Link to="/counter">to Counter</Link>*/}
        </div>
      </div>
    );
  }
}
