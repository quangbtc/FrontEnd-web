import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import {FormattedMessage} from "react-intl"
import {LANGUAGES} from '../../../../utils/constant'
import {changeLanguage} from "../../../../store/actions"

class HomeHeader extends Component {

  //TRANSFER VARIABLES LANG TO REDUX BY CLICK ICON LANG
  handleOnClick=(language)=>{
    //CALL FUNTION FROM REDUX AND TRANSFER LANG TO FUNCTION
    this.props.changeLanguageApp(language)
  }
  render() {
    let language=this.props.language; // lấy biên ngôn ngữ nhận từ redux trả về
    console.log("Check user info",this.props.userInfo)
    return (
      <div className="home__header__container">
        <div className="home__header__content">
          <div className="home__header__content-left">
            <span className="home__header-icon">
              <i className="fas fa-bars"></i>
            </span>
            <div className="home__header-logo"></div>
          </div>
          <div className="home__header__content-middle">
            <div className="header__option">
              <div className="header__option-title"> <FormattedMessage id="homeHeader.specialty" /></div>
              <div className="header__option-sub-title">
              <FormattedMessage id="homeHeader.searchDoctor" />
                {" "}
              </div>
            </div>
            <div className="header__option">
              <div className="header__option-title">
              <FormattedMessage id="homeHeader.healthFacility" />
              </div>
              <div className="header__option-sub-title">
              <FormattedMessage id="homeHeader.chooseHospital" />{" "}
              </div>
            </div>
            <div className="header__option">
              <div className="header__option-title">  <FormattedMessage id="homeHeader.doctor" /></div>
              <div className="header__option-sub-title"> <FormattedMessage id="homeHeader.chooseDoctor" /></div>
            </div>
            <div className="header__option">
              <div className="header__option-title"><FormattedMessage id="homeHeader.examinationPackage" /></div>
              <div className="header__option-sub-title">
              <FormattedMessage id="homeHeader.generalExamination" />{" "}
              </div>
            </div>
          </div>
          <div className="home__header__content-right">
            <div className="home__header-support">
              <span className="home__header-support-icon">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeHeader.support" />
              </span>
            </div>
            <div className="home__header-lang">
              <span className={language===LANGUAGES.VI?"home__header-lang-vi active":"home__header-lang-vi"}//""
              onClick={()=>this.handleOnClick(LANGUAGES.VI)}
              >VI</span>
              <span className={language===LANGUAGES.EN?"home__header-lang-en active":"home__header-lang-en"} //home__header-lang-en "
               onClick={()=>this.handleOnClick(LANGUAGES.EN)}
              >EN</span>
            </div>
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
    userInfo:state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //CALL ACTION FROM APPACTION REDUX INPUT LANGUAGE
    changeLanguageApp:(language)=>dispatch(changeLanguage(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
