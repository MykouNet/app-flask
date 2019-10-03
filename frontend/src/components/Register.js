import React, {Component} from 'react'
import { register, recupMDP } from './UserFunctions'

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
    componentDidMount() {
        recupMDP().then(res => this.setState({motDePasse : res}))
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
        console.log("motDePasse", newUser.motDePasse)

        register(newUser).then(res => {
                this.props.history.push('/register')
        })
    }

    render (){
    console.log(this.state)
        return(
            <div>
                <form noValidate onSubmit={this.onSubmit}>

                        <div className="login">
                        <div className="login-screen">
                        <div className="app-title"><h1>Ajoutez un nouvel utilisateur</h1></div>
                        <div className="login-form">

                            <div className="control-group">
                            <label htmlFor="idMatricule" className="login-field-icon fui-lock"></label>
                            <input type="text" name="idMatricule" value={this.state.idMatricule}
                            onChange={this.onChange} placeholder="idMatricule" className="login-field"/>
                            </div>

                            <div className="control-group">
                            <label htmlFor="motDePasse" className="login-field-icon fui-lock"></label>
                            <input type="password" name="motDePasse" value={this.state.motDePasse}
                            placeholder="MotDePasse" className="login-field" />
                            </div>

                            <div className="control-group">
                            <label htmlFor="fonction" className="login-field-icon fui-lock"></label>
                            <input type="text" name="fonction" value={this.state.fonction}
                            onChange={this.onChange} placeholder="fonction" className="login-field"/>
                            </div>

                            <input type="submit" value="Register" className="btn btn-primary btn-large btn-block" />
                        </div>
                        </div>
                        </div>
                </form>
            </div>
        )
    }
}

export default Register
