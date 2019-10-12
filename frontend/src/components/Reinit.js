import React, {Component} from 'react'
import { register, recupMDP } from './UserFunctions'
import axios from 'axios'

class Reinit extends Component {
    constructor() {
        super()
        this.state = {
            idMatricule:'',
            motDePasse1:'',
            motDePasse2:'',
            submitResult: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(id) {
            return axios
                get('http://localhost:5000/api/reinit' + id, {
                        console.log('get')
                    })
                    .then(response => {
                        return response
                    })
    }

    modifierMDP(id) {
        return fetch('http://localhost:5000/api/reinit' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
            {'motDePasse': this.state.motDePasse1})
        }).then(response => response.json())
        .then(data => {
            this.getNewMDP().then(() => {
                this.setState({
                    motDePasse1: this.state.
                });
              });
            })
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

        register(newUser).then(data => {
            if (data.status === 200) {
                this.setState({
                    idMatricule: '',
                    motDePasse: '',
                    fonction: '',
                    submitResult: 'Le nouvel utilisateur a bien été ajouté.'
                })
            } else {
                this.setState({
                    submitResult: 'Un problème est survenu - l\'utilisateur n\'a pas pu être enregistré'
                })
            }
                //this.props.history.push('/register')
        })
    }

    render (){
    //console.log(this.state)
        return(
            <div>
                <form noValidate onSubmit={this.onSubmit}>

                        <div className="login">
                        <div className="login-screen">
                        <div className="app-title"><h1>Ré-initialisez votre mot de passe</h1></div>
                        <div className="login-form">

                            <div className="control-group">
                            <label htmlFor="idMatricule" className="login-field-icon fui-lock"></label>
                            <input type="text" name="idMatricule" value={this.state.idMatricule}
                            onChange={this.onChange} placeholder="idMatricule" className="login-field"/>
                            </div>

                            <div className="control-group">
                            <label htmlFor="motDePasse" className="login-field-icon fui-lock"></label>
                            <input type="password" name="motDePasse" readOnly value={this.state.motDePasse}
                            placeholder="MotDePasse" className="login-field" />
                            </div>

                            <p>{this.state.submitResult}</p>
                            <input type="submit" value="Ré-initialisation" className="btn btn-primary btn-large btn-block" />
                        </div>
                        </div>
                        </div>
                </form>
            </div>
        )
    }
}

export default Reinit
