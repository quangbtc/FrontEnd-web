import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../Section/HomeHeader";
import "./SpecialtyDetail.scss";
import { getSpecialtyByIdService } from "../../../../services/specialtyService";

class SpecialtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFull: false,
      specialtyData: {},
    };
  }
  async componentDidMount() {
    let specialtyId = this.props.match.params.id;
    if (specialtyId) {
      let resSpecialty = await getSpecialtyByIdService({
        id: +specialtyId,
        location: "ALL",
      });
      console.log("Check respSpecialty", resSpecialty);
      if (resSpecialty && resSpecialty.errCode === 0) {
        this.setState({
          specialtyData: resSpecialty.data,
        });
      }
    }
  }
  componentDidUpdate() {}
  handleShowContent = () => {
    this.setState({
      isShowFull: !this.state.isShowFull,
    });
  };

  render() {
    let { isShowFull, specialtyData } = this.state;
    console.log("Check State", isShowFull);
    let none = isShowFull ? "hidden" : "scroll",
      auto = isShowFull ? "auto" : "130px";
    return (
      <>
        <HomeHeader></HomeHeader>
        <div className="specialty-container">
          <div className="introduce-specialty">
            <div className="specialty-name">
              {specialtyData.specialtyName ? specialtyData.specialtyName : ""}
            </div>
            {specialtyData.descriptionHtml && (
              <>
                <div
                  className="specialty-description"
                  style={{ overflow: `${none}`, height: `${auto}` }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: specialtyData.descriptionHtml,
                    }}
                  ></div>
                </div>
              </>
            )}

            <div className="view-more">
              <button onClick={() => this.handleShowContent()}>
                {isShowFull ? "Ẩn nội dung" : "Xem thêm"}
              </button>
            </div>
          </div>
          <div className="info-doctor-container"></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
