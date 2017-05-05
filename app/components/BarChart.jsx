// Required libraries
import React from 'react'
import { connect } from 'react-redux'

// ------------- Component
const BarChart = (props) => {
  let barChart = require("../../barChart.js")
    return (
        <div>
            'export something from barChart.js and modify BarChart.jsx to get it to display here'
        </div>
    );
};

// ------------- Container
const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);




