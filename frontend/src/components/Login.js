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
            valueHref: ""
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

        const validate = (user) => {
            let errors ={};
            console.log("user.idMatricule ", user.idMatricule )

            if (user.idMatricule === '') {
                this.setState({messageErreur1: "Required"});
                this.setState({isOKidMat:false})
            }
            console.log("errors.idMatricule ", user.idMatricule )

            const passwordRegex = /(?=.*[0-9])/;


            if (user.motDePasse === ''){
                this.setState({messageErreur2: "Required"});
                this.setState({isOKpswd:false})
            }
            else if (user.motDePasse.length < 8){
                this.setState({messageErreur2: "too short"});
                this.setState({isOKpswd:false})
            }
            else if (!passwordRegex.test(user.motDePasse)) {
                errors.motDePasse = "Invalid password. Must contain one number."
            }
            return errors;
        }

        validate(user)

        login(user).then(res => {
            if (res.message !== "id / mdp incorrects.") {
                localStorage.setItem("idMatriculeLS", user.idMatricule)
                localStorage.setItem("fonction", res.data.fonction)
                this.props.history.push('/menu')
            } else {
                this.props.history.push('/login')
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
