import React, {Component} from 'react'

import { login } from './UserFunctions'
import '../App.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            idMatricule:'',
            motDePasse:'',
            isOKidMat: true,
            isOKpswd: true,
            messageErreur1:'',
            messageErreur2:'',
            valueHref: "",
            submitResult: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        const user = {
            idMatricule: this.state.idMatricule,
            motDePasse:  this.state.motDePasse
        }

        login(user).then(res => {
            if (res.message !== "id / mdp incorrects.") {
                localStorage.setItem("idMatriculeLS", user.idMatricule)
                localStorage.setItem("fonction", res.data.fonction)
                this.props.history.push('/menu')
            } else {
                this.setState({
                        submitResult: 'id / mdp incorrects.'})
            }
          })
    }


    render (){
        return(

            <form onSubmit={this.onSubmit} className="body">
                <div className="login">

                    <div className="login-screen">

                    <div className="app-title"><h1>Login</h1></div>

                    <div className="login-form">

                    <div className="control-group">
                                    <input type="text" className="login-field" value={this.state.idMatricule}
                                    onChange={this.onChange} placeholder="username" name="idMatricule"
                                     />

                   <span>{ this.state.messageErreur1 }  </span>

                    <label className="login-field-icon fui-user" htmlFor="login-name"></label></div>

                    <div className="control-group">
                                    <input type="password" className="login-field" value={this.state.motDePasse}
                                    onChange={this.onChange} placeholder="password" name="motDePasse" />
                    <label className="login-field-icon fui-lock" htmlFor="login-pass"></label></div>

                   <span>{ this.state.messageErreur2 }  </span>


                    <p>{this.state.submitResult}</p>

                    <input type="submit" value="Log in" className="btn btn-primary btn-large btn-block" />
                    </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login

// si c'était à refaire
// https://scotch.io/tutorials/validating-a-login-form-with-react#toc-adding-validation-messages-logic
