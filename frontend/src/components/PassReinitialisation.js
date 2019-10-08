import React, {Component} from 'react'

import { reinit } from './UserFunctions'
import '../App.css'

const SERVER_URL = 'http://localhost:5000'
const API_URL = SERVER_URL + '/api'
export const STATIC_URL = SERVER_URL + '/static'



const majUser = async (idMatricule, motDePasse1) => {
return fetch(API_URL + '/passinitialisation/' + idMatricule,
{
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(
    {'idMatricule': idMatricule, 'motDePasse': motDePasse1})
}).then(response => response.json())
}

const validate = mdp => {
        const passwordRegex = /(?=.*[0-9])/;
        let errors =''
        if (mdp.motDePasse1 === '' | mdp.motDePasse2 ==='') {
            return (errors= 'les mots de passe doivent être renseignés',
                    console.log("MDP non renseignés"))
        }
        else if (mdp.motDePasse1 !== mdp.motDePasse2) {
            return  (errors= 'les mots de passe ne sont pas identiques',
                    console.log("les mots de passe ne sont pas identiques"))
        }
        else if (mdp.motDePasse1.length < 8) {
            return  (errors= 'le mot de passe ne comporte pas 8 caractères',
                    console.log("le mot de passe ne comporte pas 8 caractères"))
            }
        else if (!passwordRegex.test(mdp.motDePasse1)) {
            return  errors= 'le mot de passe ne comporte pas pas 1 nombre'
        }
        else {
            return errors = "None"
            }
        return errors;
}

class PassReinitialisation extends Component {
    constructor() {
        super()
        this.state = {
            idMatricule:'',
            motDePasse:'',
            motDePasse1:'',
            motDePasse2:'',
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

        reinit(user).then(res => {
            let idMatricule = user.idMatricule
            let motDePasse = user.motDePasse
            if (res.message === "id / mdp incorrects.") {
                this.setState({
                        submitResult: 'id / mdp incorrects.'})
            } else {
                const mdp = {
                    motDePasse1: this.state.motDePasse1,
                    motDePasse2: this.state.motDePasse2
                }
                console.log(mdp)

                if (validate(mdp) === "None") {
                    let motDePasse = mdp.motDePasse1;
                    console.log(motDePasse, idMatricule)
                    majUser(idMatricule, motDePasse)
                }

            }
          })
    }

    render (){
        return(


            <form onSubmit={this.onSubmit} className="body">
                <div className="login">

                    <div className="login-screen">

                    <div className="app-title"><h1>Password reinitialization</h1></div>

                    <div className="login-form">

                    <div className="control-group">
                                    <input type="text" className="login-field" value={this.state.idMatricule}
                                    onChange={this.onChange} placeholder="idMatricule" name="idMatricule"
                                     />

                   <span>{ this.state.messageErreur1 }  </span>

                    <label className="login-field-icon fui-user" htmlFor="login-name"></label></div>

                    <div className="control-group">
                                    <input type="password" className="login-field" value={this.state.motDePasse}
                                    onChange={this.onChange} placeholder="old password" name="motDePasse" />
                    <label className="login-field-icon fui-lock" htmlFor="login-pass"></label></div>

                    <label>saisir 2 fois le nouveau mot de passe à l'identique : 8 lettres minimum </label>

                    <div className="control-group">
                                    <input type="password" className="login-field" value={this.state.motDePasse1}
                                    onChange={this.onChange} placeholder="new password" name="motDePasse1" />
                    <label className="login-field-icon fui-lock" htmlFor="login-pass"></label></div>

                    <div className="control-group">
                                    <input type="password" className="login-field" value={this.state.motDePasse2}
                                    onChange={this.onChange} placeholder="confirm new password" name="motDePasse2" />
                    <label className="login-field-icon fui-lock" htmlFor="login-pass"></label></div>

                   <span>{ this.state.messageErreur2 }  </span>

                    <p>{this.state.submitResult}</p>

                    <input type="submit" value="Re-initialize password" className="btn btn-primary btn-large btn-block" />
                    </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default PassReinitialisation

// si c'était à refaire
// https://scotch.io/tutorials/validating-a-login-form-with-react#toc-adding-validation-messages-logic
