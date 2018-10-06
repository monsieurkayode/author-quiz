import React from 'react';
import { connect } from 'react-redux';
import { getTurnDataAction } from '../actions/quizActions';

const Continue = ({ getTurnDataAction, highlight }) => (
  <div className="row continue"
    style={{visibility: highlight === 'right' ? '' : 'hidden'}}
  >
    <div className="col-11">
      <button
        onClick={() => getTurnDataAction()}
        className="btn btn-lg float-right btn-primary">Continue</button>
    </div>
  </div>
);

const mapStateToProps = ({ turnData: { highlight }}) => ({
  highlight
});

export default connect(mapStateToProps, { getTurnDataAction })(Continue);
