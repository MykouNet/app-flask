import axios from 'axios'

export const catalogue = newProduit => {
    console.log(newProduit)
    return axios
    .post('http://localhost:5000/api/catalogue', {
        nom  : newProduit.nom,
        gamme    : newProduit.gamme,
        puissance : newProduit.puissance,
        image  : newProduit.image
    })
    .then(res => {
        console.log(res)
    })
}

export const register = async newUser => {
    const { idMatricule, fonction, motDePasse } = newUser
    console.log(newUser)
    if (!(idMatricule && fonction))
        return {status: 'error'}
    console.log('Je passe')
    return axios
    .post('http://localhost:5000/api/register', {
        idMatricule,
        motDePasse,
        fonction
    })
    .then(response => {
        return response
    })
}

export const login = user => {
    return axios
    .post('http://localhost:5000/api/login', {
        idMatricule:    user.idMatricule,
        motDePasse:     user.motDePasse
    })
    .then(res => {
        const data = res.data
        console.log(data)
        if (data.message !== "id / mdp incorrects.") {
                    console.log("ici")
            localStorage.setItem("fonction", res.data.fonction)
            localStorage.setItem('usertoken', res.data.token)
        }
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
 }

 export const profile = user => {
    return axios
    .get('http://localhost:5000/api/login' + user, {
        idMatricule:    user.idMatricule,
        motDePasse:     user.motDePasse,
        fonction:       user.fonction
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data.token)
        console.log(res)
        return res.data
    })
//    .catch(err => {
//        console.log(err)
//    })
 }

export const recupMDP = () => {
    return axios
    .get('http://localhost:5000/api/register', {
    })
    .then(res => {
        console.log(res)
        return res.data
    })
}

export const reinit = user => {
    return axios
    .post('http://localhost:5000/api/passinitialisation', {
        idMatricule:    user.idMatricule,
        motDePasse:     user.motDePasse
    })
    .then(res => {
        const data = res.data
        console.log(data)
        if (data.message !== "id / mdp incorrects.") {
                    console.log("ici")
        }
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
 }
