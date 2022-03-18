import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUser = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleOnclick = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLogin(this.state.username, this.state.password);
      console.log("Check data", data);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      console.log("Check data", data);
      if (data && data.errCode === 0) {
        //To do
        this.props.userLoginSuccess(data.userData);
        console.log("Login success", data);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log(e);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleOnclick();
    }
  };
  render() {
    return (
      <>
        <div className="bg-login">
          <div className="container-login">
            <div className="content-login">
              <h1 className="text-center">Login</h1>

              <div className="form-group mt-5">
                <input
                  type="text"
                  className="form-control input-style"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={(e) => this.handleOnChangeUser(e)}
                />
              </div>
              <div className="form-group mt-4 password-input">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control input-style"
                  placeholder="Enter password"
                  onChange={(e) => this.handleOnchangePassword(e)}
                  onKeyDown={(e) => this._handleKeyDown(e)}
                />
                <span
                  className="icon-showHide"
                  onClick={() => this.handleShowHidePassword()}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
              <div className="text-danger">{this.state.errMessage}</div>
              <div className="form-group">
                <input
                  type="submit"
                  value="LOGIN"
                  className="form-control mt-4 btn-login"
                  onClick={() => this.handleOnclick()}
                />
              </div>
              <div className="text-center mt-5">
                <span>Or Login with:</span>
              </div>
              <div className="social-login">
                <i className="fab fa-facebook-f facebook-login"></i>
                <i className="fab fa-google-plus-g google-login"></i>
              </div>
              <div className="sigup">
                Not a member ?<a href="">Sigup Now</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
