import React, { Component } from 'react'
import { register } from './Userfunction'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      email: '',
      password: '',
      errors: ""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      first_name: this.state.first_name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
      if(res.success){
        this.props.history.push(`/profile`)
      }else{
        this.setState({errors: res.msg});
      }
      
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>

            {(this.state.errors.length>0)?<div class="alert alert-warning" role="alert">
            <h3>{this.state.errors?this.state.errors:""}</h3>
            </div>:""}
            
          </div>
        </div>
      </div>
    )
  }
}

export default Register