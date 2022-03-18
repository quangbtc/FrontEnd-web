import React, { Component } from "react";
import { connect } from "react-redux";
import "./Banner.scss";
import googleStore from "../../../../assets/images/google-store.svg";
import appleStore from "../../../../assets/images/apple-store.svg";
import { FormattedMessage } from "react-intl";
import { Ref } from "react";

class Banner extends Component {
  componentDidMount = () => {};

  handleOnclickSearch = (e) => {
    e.preventDefault();
    this.nameInput.focus();
  };
  render() {
    return (
      <div className="banner__container">
        <div className="banner__title-item-1">
          <FormattedMessage id="headerBanner.medicalBackground" />
        </div>
        <div className="banner__title-item-2">
          <FormattedMessage id="headerBanner.healthCare" />
        </div>
        <div className="banner__search">
          <span onClick={(e) => this.handleOnclickSearch(e)}>
            <i className="fas fa-search banner__search-icon"></i>
          </span>
          <FormattedMessage id="headerBanner.findSpecialty" defaultMessage="">
            {(placeholder) => (
              <input
                className="banner__search-input"
                type="text"
                placeholder={placeholder}
                ref={(input) => {
                  this.nameInput = input;
                }}
              />
            )}
          </FormattedMessage>
        </div>
        <div className="banner__app">
          <div className="banner__app-google">
            <img src={googleStore} alt="google-store" />
          </div>
          <div className="banner__app-apple">
            <img src={appleStore} alt="google-store" />
          </div>
        </div>
        <div className="banner__menu">
          <ul className="menu__list">
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-hospital-alt"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.specialtyExamination" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.remoteExamination" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-hospital"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.generalExamination" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-hospital"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.medicalTest" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.healthyMind" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-briefcase-medical"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.dentalExamination" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-procedures"></i>
              </div>
              <div className="menu__list-item-title">
                {" "}
                <FormattedMessage id="headerBanner.surgeryPackage" />
              </div>
            </li>
            <li className="menu__list-item">
              <div className="menu__list-item-icon">
                <i className="fas fa-briefcase-medical"></i>
              </div>
              <div className="menu__list-item-title">
                <FormattedMessage id="headerBanner.medicalProduct" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
