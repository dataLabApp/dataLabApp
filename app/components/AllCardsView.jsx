import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteCard} from '../reducers/cardReducer'
import AllCard from './AllCard.jsx'

const AllCardsView = (props) => {
  console.log('~~props in AllCardsView ', props)
  return (
    <div className="container-fluid">
      <div className="row">
            { props.cards.map(card => (
              <li key={card.id} >
                <div className="col-sm-4 text-center" >
                  <AllCard title={card.title} chart={card.chart()} />
                  <button onClick= { () => props.deleteCard(card.id)}>  Delete </button>
                </div>
              </li>
          )) }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  {
    cards: state.cards
  }
)

const mapDispatchToProps = (dispatch) => ({
  deleteCard: (cardId) => {
    dispatch(deleteCard(cardId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsView)
