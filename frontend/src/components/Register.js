import React, {Component} from 'react'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            idMatricule:'',
            motDePasse:'',
            fonction:''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        const newUser = {
            idMatricule: this.state.idMatricule,
            motDePasse:  this.state.motDePasse,
            fonction:    this.state.fonction
        }

        register(newUser).then(res => {
                this.props.history.push('/register')
        })
    }

    render (){
        return(
            <div>
                <form noValidate onSubmit={this.onSubmit}>

                        <div className="login">
                        <div class="login-screen">
                        <div class="app-title"><h1>Please sign in</h1></div>
                        <div class="login-form">

                            <div class="control-group">
                            <label htmlFor="idMatricule" class="login-field-icon fui-lock"></label>
                            <input type="text" name="idMatricule" value={this.state.idMatricule}
                            onChange={this.onChange} placeholder="idMatricule" class="login-field"/>
                            </div>

                            <div class="control-group">
                            <label htmlFor="motDePasse" class="login-field-icon fui-lock"></label>
                            <input type="text" name="motDePasse" value={this.state.motDePasse}
                            onChange={this.onChange} placeholder="Mot De Passe" class="login-field" />
                            </div>

                            <div class="control-group">
                            <label htmlFor="fonction" class="login-field-icon fui-lock"></label>
                            <input type="text" name="fonction" value={this.state.fonction}
                            onChange={this.onChange} placeholder="fonction" class="login-field"/>
                            </div>

                            <input type="submit" value="Register" class="btn btn-primary btn-large btn-block" />
                        </div>
                        </div>
                        </div>
                </form>
            </div>
        )
    }
}

export default Register