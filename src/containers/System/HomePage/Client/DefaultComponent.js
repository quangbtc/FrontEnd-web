import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class DefaultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  async componentDidMount() {
  
  }
  componentDidUpdate() {}
  render() {
    return (
      <>
     <div className=""></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultComponent);
