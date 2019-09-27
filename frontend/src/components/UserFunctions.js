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

export const register = newUser => {
    return axios
    .post('http://localhost:5000/api/register', {
        idMatricule : newUser.idMatricule,
        motDePasse  : newUser.motDePasse,
        fonction    : newUser.fonction
    })
    .then(res => {
        console.log(res)
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
        console.log(res.data)
        if (data.message === 'bien loggué.') {
                    console.log("ici")
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
