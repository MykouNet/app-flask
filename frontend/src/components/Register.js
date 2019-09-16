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
                    <h1>Please sign in</h1>
                        <div>
                            <label htmlFor="idMatricule">idMatricule</label>
                            <input type="text" name="idMatricule" value={this.state.idMatricule} onChange={this.onChange} />
                        </div>
                        <div>
                            <label htmlFor="motDePasse">MotDePasse</label>
                            <input type="text" name="motDePasse" value={this.state.motDePasse} onChange={this.onChange} />
                        </div>
                         <div>
                            <label htmlFor="fonction">fonction</label>
                            <input type="text" name="fonction" value={this.state.fonction} onChange={this.onChange} />
                        </div>
                        <button type="submit">Register </button>
                </form>
            </div>
        )
    }
}

export default Register