import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../Section/HomeHeader";
import "./ClinicDetail.scss";
import { getClinicDetailById } from "../../../../services/clinicService";
import ProfileDoctor from "../Client/ProfileDoctor";
import DoctorSchedule from "../Client/DoctorSchedule";
import * as actions from "../../../../store/actions"
import {LANGUAGES} from "../../../../utils"

class ClinicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFull: false,
      clinicData: {},
      arrDoctorId: [],
      listProvince:[],
      selectedProvince:""
    };
  }
  async componentDidMount() {
    this.props.getAllInfoDoctors()
    let clinicId = this.props.match.params.id;
    if (clinicId) {
      let resClinic = await getClinicDetailById(clinicId);
      console.log("Check resClinic",resClinic)
      if (resClinic && resClinic.errCode === 0) {
        let arrDoctorId = [];
        if (resClinic.data && resClinic.data.doctorClinic.length > 0) {
          resClinic.data.doctorClinic.map((item) => {
            arrDoctorId.push(item.doctorId);
            return item;
          });
        }
        this.setState({
          clinicData: resClinic.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  componentDidUpdate(prevProps) {
    
  }
  handleShowContent = () => {
    this.setState({
      isShowFull: !this.state.isShowFull,
    });
  };
  

  render() {
 

    let { isShowFull, clinicData, arrDoctorId,selectedProvince ,listProvince} = this.state;
    let {language}=this.props
  
    let none = isShowFull ? "hidden" : "scroll",
      auto = isShowFull ? "auto" : "130px";
    return (
      <>
        <HomeHeader></HomeHeader>
        <div className="specialty-container">
          <div className="introduce-specialty">
            <div className="specialty-name">
              {clinicData.clinicName ? clinicData.clinicName : ""}
            </div>
            {clinicData.descriptionHtml && (
              <>
                <div
                  className="specialty-description"
                  style={{ overflow: `${none}`, height: `${auto}` }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: clinicData.descriptionHtml,
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
          <div className="info-doctor-container">
            {arrDoctorId && arrDoctorId.length > 0 ? (
              arrDoctorId.map((item, index) => {
                return (
                  <>
                    <div className="row info-doctor" key={index}>
                      <div className="col-6">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowPrice={false}
                          isShowLink={true}
                          //   dataTime={dataScheduleTime}
                        />
                      </div>
                      <div className="col-6 doctor-schedule">
                        <DoctorSchedule detailDoctor={item} />
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="title text-danger">Chưa có bác sĩ trong chuyên khoa này</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    listInfoDoctors:state.admin.listInfoDoctors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllInfoDoctors:()=>dispatch(actions.fetchAllInfoDoctor())
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail);
