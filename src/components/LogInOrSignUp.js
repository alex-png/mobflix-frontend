import React from 'react'
import SignUpForm from "./SignUpForm"
import "./LogIn.css"

class LogInOrSignUp extends React.Component {

    state = ({
        name: "",
        password: "",
        wrongPassword: false,
        nameNotFound: false,
        signUpClicked: false,
        users: []
    })

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleSubmit = (event) => {
      event.preventDefault()
      let user =  this.state.users.find(user => {return user.username === (this.state.name.replace(/\s/g,'') )})
      debugger
      if(user){
        if(user.password === this.state.password){
          console.log("INSIDE LOGINORSIGNUP",user)
          
            this.props.logInContainer(user)
        }else{
            this.setState({wrongPassword: true})
        }
      }else{
          this.setState({nameNotFound: true})
      }
  }

  handleSignUpClick = ()=>{
    this.setState(prevProps=>({signUpClicked: !prevProps.signUpClicked}))
    
    return fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => this.setState({users: data}))
  }


  render() {
    return this.state.signUpClicked? <SignUpForm users={this.state.users} handleSignUpClick={this.handleSignUpClick}/>: ( 
      <div style={{
        position: "absolute",
        bottom: "40%",
        left: "40%"
    }}>
      <h1>Log in!</h1>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.name}
          name="name"
          placeholder="Name..."
          onChange={this.handleChange} /><div />
        <input
          type="text"
          value={this.state.password}
          name="password"
          placeholder="Password..."
          onChange={this.handleChange} />
          <div />
            <input type="submit" value="Submit"/>
        {this.state.nameNotFound? (< div style={{color: "red"}}>User not found. Please try again.</div>):null }
        {this.state.wrongPassword? (< div style={{color: "red"}}>Invalid Password. Please try again.</div>):null}
      </form>
      <br />
      <h3>Don't have an account?</h3>
      <button onClick={this.handleSignUpClick}>click here to sign up!</button>

      </div>
    )  

  }
  componentDidMount(){

    return fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => this.setState({users: data}))
}

}//


export default LogInOrSignUp
