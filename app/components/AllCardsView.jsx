import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteCard} from '../reducers/cardReducer'
import AllCard from './AllCard.jsx'

const AllCardsView = (props) => (
    <div className="container-fluid">
      <div className="row">
            <ul style={{listStyle: 'none'}}>
              { props.cards.map(card => (
                <li key={card.id} >
                  <div className="col-sm-6 col-md-4 col-lg-3 text-center" >
                    <AllCard title={card.title} chart={card.chart()} onRemove= { () => props.deleteCard(card.id)}/>
                  </div>
                </li>
            )) }
           </ul>
      </div>
    </div>
  )

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
