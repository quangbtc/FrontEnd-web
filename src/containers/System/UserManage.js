import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    //   when compent mounted or mounting component wil render
    //get all user
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleClickAddUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggleModalEditUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      //CALL API FROM USER SERVICE
      let response = await createNewUserService(data);
      //CHECK ERROR API
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        //REFRESH DISPLAY USER
        await this.getAllUserFromReact();
        //CLOSE MODAL WHEN SUCCESS
        this.setState({
          isOpenModal: false,
        });
        //EMIT SIGNAL TO CLEAR MODAL DATA TO MODAL CHILD COMPONENT
        emitter.emit("CLEAR_MODAL_DATA"); //emit signal to children
      }
    } catch (e) {
      console.log(e);
    }
  };
  // ACTION WHEN CLICK DELETE BUTTON ICON
  handleClickDeleteUser = async (user) => {
    try {
      // CALL API FORM USER SERVICE AND TRANSFER USER-ID TO SERVER NODE
      let response = await deleteUserService(user.id);
      //CHECK ERROR API FROM SERVER
      if (response && response.errCode === 0) {
        //NO ERROR CALL DISPLAY USER TO REFRESH IF DELETE SUCCESS
        await this.getAllUserFromReact();
      } else {
        alert(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //ACTION WHEN CLICK DELETE BUTTON ICON
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  // FUNCTION WAS SENT TO EDITMODAL CHILD AND RECEVICE DATA USER FROM MODAL WHEN CLICK SAVE MODAL
  saveEditUser = async (user) => {
    //receive data user from modal edit user
    console.log("Data user from modal", user);
    try {
      //CALL API
      let response = await editUserService(user);
      if (response && response.errCode === 0) {
        // CLOSE MODAL FROM PARENT
        this.setState({
          isOpenModalEditUser: false,
        });
        //REFRESH DISPLAY DATA
        await this.getAllUserFromReact();
      } else {
        alert(response.message);
      }
      console.log("Click save user ", response);
    } catch (error) {
      console.log(error);
    }
  };
  //======================RENDER====================
  render() {
    //RECIVE DATA USER FROM STATE AND RENDER TO HTML
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={() => this.toggleModal()}
          createNewUser={this.createNewUser} // tryen function den con modal
        ></ModalUser>

        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={() => this.toggleModalEditUser()}
            currentUser={this.state.userEdit}
            editUser={this.saveEditUser} // tryen function den con modal
          ></ModalEditUser>
        )}
        <div className="title">LIST USER </div>
        <div className="mx-2">
          <button
            className="btn btn-primary px-2"
            onClick={() => this.handleClickAddUser()}
          >
            <i className="fas fa-plus-circle"></i>
            Add new user
          </button>
        </div>
        <div className="user-table mt-3 mx-2">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, id) => {
                  return (
                    <tr key={id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        {item.roleId === "1"
                          ? "Doctor"
                          : item.roleId === "2"
                          ? "Patient"
                          : "Admin"}
                      </td>
                      <td>{item.gender === 0 ? "Male" : "Female"}</td>
                      <td>{item.address}</td>
                      <td style={{ width: "180px" }}>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleClickDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
