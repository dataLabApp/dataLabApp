// Required libraries
import React from 'react'
import { connect } from 'react-redux'

// ------------- Component
const BarChart = (props) => {

    return (
        <div>
            <script> {require("../../barChart.js")}</script>
        </div>
    );
};

// ------------- Container
const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);




