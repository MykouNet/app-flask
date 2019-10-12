import React from 'react';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';

const ValidateLoginForm = () => (
    <Formik
        initialValues ={{idMatricule:"", motDePasse:""}}
        onSubmit={ (values, { setSubmitting }) => {
        console.log("formik")
        }}
        validationSchema={Yup.object().shape({
            idMatricule: Yup.string()
                .required("Required")
                .matches(/(?=[U].*[0-9])/, "Matricule ID is not matching" ),
            motDePasse: Yup.string()
                .required("Required")
                .min(8, "Password is wrong")
                .matches(/(?=.*[0-9])/, "Password is not matching" )

        })}

 /*       validate = { values => {
            let errors ={};
            if (!values.idMatricule) {errors.idMatricule = "Required";
            }
            else if (!EmailValidator.validate(values.idMatricule)){
                errors.idMatricule = "Invalid Matricule ID"
            }
            const passwordRegex = /(?=.*[0-9])/;

            if (!values.motDePasse) {errors.motDePasse = "Required";
            }
            else if (values.motDePasse.length < 8){
                errors.motDePasse = "Password must be 8 characters long"
            }
            else if (!passwordRegex.test(values.motDePasse)) {
                errors.motDePasse = "Invalid password. Must contain one number."
            }
            return errors;
        }}*/
    >

        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;

            return (
                <form onSubmit={handleSubmit} className="body">
                <div className="login">

                    <div className="login-screen">

                    <div className="app-title"><h1>Login</h1></div>

                    <div className="login-form">

                    <div className="control-group">
                                    <input type="text" className={errors.idMatricule && touched.idMatricule && "error"}
                                    value={values.idMatricule}
                                    onChange={handleChange} placeholder="username" name="idMatricule"
                                    onBlur={handleBlur}  />

                    {errors.idMatricule && touched.idMatricule && (
                        <div className="input-feedback"> {errors.idMatricule}</div>
                    )}

                    <label className="login-field-icon fui-user" for="login-name"></label></div>

                    <div className="control-group">
                                    <input type="password"
                                    value={values.motDePasse}
                                    onChange={handleChange} placeholder="password" name="motDePasse"
                                    onBlur={handleBlur} />
                    <label className="login-field-icon fui-lock" for="login-pass"></label></div>

                    {errors.motDePasse && touched.motDePasse && (
                        <div className="input-feedback"> {errors.motDePasse}</div>
                    )}

                    <input type="submit" value="Log in" className="btn btn-primary btn-large btn-block" />



                    </div>
                    </div>
                </div>
            </form>
            )
        }}
    </Formik>

);

export default ValidateLoginForm;