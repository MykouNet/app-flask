import React, {Component} from 'react'
import { register, recupMDP } from './UserFunctions'
import { Input } from 'reactstrap';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            idMatricule:'',
            motDePasse:'',
            fonction:'',
            submitResult: ''
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
 {/*       const validate = (user) => {
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
*/}
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
                        <div className="app-title"><h1>Ajoutez un nouvel utilisateur</h1></div>
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

                            <div className="control-group">
                            <label htmlFor="fonction" className="login-field-icon fui-lock"></label>
                            <Input type="select" name="fonction" value={this.state.value}
                            onChange={this.onChange} placeholder="fonction" className="login-field-select">
                                <option value="Gestionnaire" className="login-field-option">Gestionnaire</option>
                                <option value="Utilisateur" className="login-field-option">Utilisateur</option>
                            </Input>
                            </div>
                            <p>{this.state.submitResult}</p>
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
