import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu ,doctorMenu} from "./menuApp";
import { LANGUAGES ,ROLE} from "../../utils/constant";
import { changeLanguage } from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus:[]
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };
  componentDidMount(){
    let roleId=this.props.userInfo.user.roleId
    if(roleId){
      if(roleId===ROLE.ADMIN){
        //DO SOMETHING
        this.setState({
          menus:adminMenu
        })
      }
      if(roleId===ROLE.DOCTOR){
        this.setState({
          menus:doctorMenu
        })
      }
    }
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    let menus=this.state.menus
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={menus} />
        </div>

        {/* nút logout */}
        <div className="language">
          <span className="user-login">
            <FormattedMessage id="homeHeader.welcome" />
            {userInfo && userInfo.user && userInfo.user.firstName
              ? userInfo.user.firstName
              : ""}
            !
          </span>
          <span
            className={language === "vi" ? "language-vi active" : "language-vi"}
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VI
          </span>
          <span
            className={language === "en" ? "language-en active" : "language-en"}
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageApp: (language) => dispatch(changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
