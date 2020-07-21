import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {getProfile,uploadImage} from './Userfunction'
//import WebcamCapture  from './cameraimg'
import  CameraFeed  from './CameraFeed';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      email: '',
      errors: "",
      campermission:false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const token = localStorage.usertoken
    getProfile(token).then(res => {
      if(res.success){
        this.setState({first_name: res.data.name,email: res.data.email});
      }else{
        this.setState({errors: res.msg});
        this.props.history.push(`/login`)
      }
      
    })

    // const token = localStorage.usertoken
   
    // const decoded = jwt_decode(token)
    // console.log("as",decoded)
    // this.setState({
    //   first_name: decoded.name,
    //   email: decoded.email
    // })
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({campermission: !this.state.campermission});
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.onSubmit}>Allow webcam access</button>
          {(this.state.errors.length>0)?<div class="alert alert-warning" role="alert">
            <h3>{this.state.errors?this.state.errors:""}</h3>
            </div>:""}
          
        </div>
        {this.state.campermission?<CameraFeed sendFile={uploadImage} />:""}
        
      </div>
    )
  }
}

export default Profile