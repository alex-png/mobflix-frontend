import React from 'react'

class SignUpForm extends React.Component {
    state = ({
        name: "",
        password:"",
        userExistsError: false

    })


    handleChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleSubmit = (e)=>{
        e.preventDefault()  
        const name = this.state.name.replace(/\s/g,'')
        const password = this.state.password.replace(/\s/g,'')
        if(this.props.users.find(user => {return user.username === name})){
            this.setState({userExistsError: true})
            console.log(`${name} already exists!`)
        }else{
            console.log("POST TO DATABASE!")

            let formData = {
                name: name,
                password: password
              };
               
              let configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(formData)
              };
               
              fetch("http://localhost:3000/users", configObj)
              .then(res => res.json())
              .then(console.log);
        }
    this.props.handleSignUpClick()
    }
    

    render(){
        return  (
            <>
            <h1>Create Account:</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.name}
                name="name"
                placeholder="Name..."
                onChange={this.handleChange} />
                <br />
              <input
                type="text"
                value={this.state.password}
                name="password"
                placeholder="Password..."
                onChange={this.handleChange} />
                <br />
            {this.state.userExistsError ? (<div style={{color: "red"}}> That name already exists! Please enter a different name. </div>) : null}
            <input type="submit" value="Submit"/>
            </form>
            
            </>
          ) 
    }
  
}

export default SignUpForm