import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends Component {

  constructor(props){
    super(props);
    this.state= {dashboards: props.dashboards};
  }
  
  render(){
    return (
      <div className="container">
          { this.state.dashboards &&
            this.state.dashboards.map((dashboard, i)=><div key={i}>{dashboard.title}</div>)
          }
      </div>
    );
  }

}



// ----------------------- Container -----------------------

const mapStateToProps = (state, ownProps) => {
  return {
      dashboards: state.dashboards.dashboards
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Home);