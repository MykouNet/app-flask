import React, {Component} from 'react'
import { login } from './UserFunctions'
import '../App.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            idMatricule:'',
            motDePasse:''
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
            if (res.message === 'bien loggué.') {
                this.props.history.push('/menu')
            } else {
                this.props.history.push('/login')
            }
          })
    }

    render (){
        return(

            <form onSubmit={this.onSubmit} >
                <div className="login">

                    <div class="login-screen">

                    <div class="app-title"><h1>Login</h1></div>

                    <div class="login-form">

                    <div class="control-group">
                                    <input type="text" class="login-field" value={this.state.idMatricule}
                                    onChange={this.onChange} placeholder="username" name="idMatricule"
                                     />
                    <label class="login-field-icon fui-user" for="login-name"></label></div>

                    <div class="control-group">
                                    <input type="password" class="login-field" value={this.state.motDePasse}
                                    onChange={this.onChange} placeholder="password" name="motDePasse" />
                    <label class="login-field-icon fui-lock" for="login-pass"></label></div>

                    <input type="submit" value="Log in" class="btn btn-primary btn-large btn-block" />

                    </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login
