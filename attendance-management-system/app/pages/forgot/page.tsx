"use client";
import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import logo from "@/public/assets/Logo-Schedura.png";
import emailIcon from "@/public/assets/icons8-email-48.png";
import { TEXT } from "../forgot/constants/constant";
import { handleSubmit } from "../forgot/actions/action";
import { CONSTANT } from "../forgot/constants/constant";
import Style from "../forgot/style/index.module.scss";

const forgotPassword = () => {

    return (
        <div className={Style.parentContainer}>
            <div className={Style.logoContainer}>
                <Image src={logo} alt='logo' width={2000}
                    height={600} className={Style.logo}></Image>
            </div>
            <Formik initialValues={CONSTANT.INITIAL_VALUES}
                validationSchema={CONSTANT.VALIDATION_SCHEMA}
                onSubmit={handleSubmit}>
                <Form>
                    <div className={Style.formContainer}>
                        <h1>{TEXT.forgotPassword}</h1>
                        <p>{TEXT.ifYouForgotYourPassword}</p>
                        <div className={Style.email}>
                            <label>{TEXT.emailAddress}</label>
                            <Field data-test="email" type="email" name="email"></Field>
                            <Image src={emailIcon} alt="emailIcon" className={Style.emailIcon}></Image>
                            <div className={Style.error}>
                                <ErrorMessage name="email" component="div" className={Style.emailError} />
                            </div>
                        </div>
                        <button data-test="Submit" className={Style.button} type='submit'>{TEXT.submit}</button>
                        <div className={Style.returnToSignin}>
                            {TEXT.returnTo}
                            <a href="/pages/signin" data-test="signin">{TEXT.SignIn}</a>
                        </div>
                    </div>
                </Form>
            </Formik>
            <div className={Style.copyrightContainer}>
                <div>{TEXT.copyright}</div>
            </div>
        </div>
    );
}

export default forgotPassword;