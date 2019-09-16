import React, {Component} from 'react'
/*import jwt-decode from 'jwt-decode';*/

class Profile extends Component{
    constructor(){
        super()
        this.state = {
            idMatricule: '',
            motDePasse: '',
            fonction: ''
        }
    }

    componentDidMount() {
/*        const token = localStorage.usertoken
          const decoded = jwt-decode(token)
*/
        this.setState({
            idMatricule: this.idMatricule,
            motDePasse: this.motDePasse,
            fonction: this.fonction
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <h1>Profile</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>idMatricule</td>
                                <td>{this.state.idMatricule}</td>
                            </tr>
                            <tr>
                                <td>mot De Passe</td>
                                <td>{this.state.motDePasse}</td>
                            </tr>
                            <tr>
                                <td>Fonction</td>
                                <td>{this.state.fonction}</td>
                            </tr>
                       </tbody>
                    </table>
                </div>
            </div>
        )
    }



}
export default Profile