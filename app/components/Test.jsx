import React from 'react'
import { connect } from 'react-redux';
import {addCard, deleteCard} from '../reducers/cardReducer'


const Test = (props) => {
  console.log('~~props in test ', props)
  // if(!props.cards.cards.c)
  //   props.addCard({c: {left: 300, top:20}})
  if(props.cards.cards.b)
    props.deleteCard('b')
  return (
    <h1>Test</h1>
  )
}

// ------------- Container
const mapStateToProps = (state) => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => {
      dispatch(addCard(card));
    },
    deleteCard: (card) => {
      dispatch(deleteCard(card));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
