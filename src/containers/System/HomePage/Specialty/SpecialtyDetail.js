import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../Section/HomeHeader";
import "./SpecialtyDetail.scss";
import { getSpecialtyByIdService } from "../../../../services/specialtyService";
import ProfileDoctor from "../Client/ProfileDoctor";
import DoctorSchedule from "../Client/DoctorSchedule";
import * as actions from "../../../../store/actions"
import {LANGUAGES} from "../../../../utils"

class SpecialtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFull: false,
      specialtyData: {},
      arrDoctorId: [],
      listProvince:[],
      selectedProvince:""
    };
  }
  async componentDidMount() {
    this.props.getAllInfoDoctors()
    let specialtyId = this.props.match.params.id;
    if (specialtyId) {
      let resSpecialty = await getSpecialtyByIdService({
        id: +specialtyId,
        location: "ALL",
      });
      if (resSpecialty && resSpecialty.errCode === 0) {
        let arrDoctorId = [];
        if (resSpecialty.data && resSpecialty.data.doctorSpecialty.length > 0) {
          resSpecialty.data.doctorSpecialty.map((item) => {
            arrDoctorId.push(item.doctorId);
            return item;
          });
        }
        this.setState({
          specialtyData: resSpecialty.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.listInfoDoctors !== prevProps.listInfoDoctors){
      let listInfoDoctors=this.props.listInfoDoctors
      console.log("Check list province",listInfoDoctors)
      if(listInfoDoctors && listInfoDoctors.listProvince.length>0){
        listInfoDoctors.listProvince.unshift({
          keyMap:"ALL",valueEn:"Nationwide",valueVi:"Toàn quốc"
        })
        this.setState({
          listProvince:listInfoDoctors.listProvince
        })
      }
    }
    
  }
  handleShowContent = () => {
    this.setState({
      isShowFull: !this.state.isShowFull,
    });
  };
  handleOnchangeSelect=async(e)=>{
    let selected=e.target.value
    console.log("Check selected",selected)
    let specialtyId = this.props.match.params.id;
    if (specialtyId) {
      let resSpecialty = await getSpecialtyByIdService({
        id: +specialtyId,
        location: selected,
      });
      if (resSpecialty && resSpecialty.errCode === 0) {
        let arrDoctorId = [];
        if (resSpecialty.data && resSpecialty.data.doctorSpecialty.length > 0) {
          resSpecialty.data.doctorSpecialty.map((item) => {
            arrDoctorId.push(item.doctorId);
            return item;
          });
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          selectedProvince:selected
        });
      }
    }
   
    console.log("Check state",this.state)
  }

  render() {
 

    let { isShowFull, specialtyData, arrDoctorId,selectedProvince ,listProvince} = this.state;
    let {language}=this.props
  
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
          <div className="info-doctor-container">
            <div className="location-doctor">
              <select className="location-selected"
              value={selectedProvince}
              onChange={(e)=>{this.handleOnchangeSelect(e)}}
              >
                {listProvince && listProvince.length>0 &&
                listProvince.map((item,index)=>{
                  return (
                    <option key={index} value={item.keyMap}>{language===LANGUAGES.VI?item.valueVi:item.valueEn}</option>
                  )
                })
                }
              </select>
            </div>
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
              <div>Chưa có bác sĩ trong chuyên khoa này</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
