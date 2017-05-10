import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteCard} from '../reducers/cardReducer'

const AllCardsView = (props) => {
  console.log('~~props in AllCardsView ', props)
  return (
    <ul className="text-center">
      <div className="col-md-3 text-center" >
        { props.cards.map(card => (
          <li key={card.id} >
            <h3>{card.title}</h3>
              {card.chart}
            <button onClick= { () => props.deleteCard(card.id)}>  Delete </button>
          </li>
      )) }
      </div>
    </ul>

  )
}
// <Link to={`/card/${card.title}`}>

const mapStateToProps = (state)=>(
  {
    cards: state.cards
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCard: (cardId) => {
      dispatch(deleteCard(cardId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCardsView)
