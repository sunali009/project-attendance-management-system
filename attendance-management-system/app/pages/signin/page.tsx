"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import emailIcon from "@/public/assets/icons8-email-48.png";
import hideIcon from "@/public/assets/hide.png";
import showIcon from "@/public/assets/show.png";
import logo from "@/public/assets/Logo-Schedura.png";
import Image from 'next/image';
import Styles from './style/index.module.scss';
import { SubmitHandler } from "./actions/action";
import { useRouter } from 'next/navigation';
import { TEXT, CONSTANT } from "@/app/pages/signin/constants/constant";
import Loader from '@/app/components/loader/loader';

const SignInForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handler = new SubmitHandler(setLoading, router); 

    return (
        <>
            {loading && <Loader />}
        <div className={Styles.parentContainer}>
            <div className={Styles.leftSide}>
                <div className={Styles.background}>
                    <Image src="https://smarthr.co.in/demo/html/template/assets/img/bg/bg-01.png" alt="background" width={2000}
                        height={600} className={Styles.spiral}>
                    </Image>
                    <div className={Styles.paragraphPart}>
                        <h1>{TEXT.bigHeading}</h1>
                        <div><Image src='https://smarthr.co.in/demo/html/template/assets/img/bg/bg-03.png'
                            alt="circle-image" width={2000}
                            height={600} className={Styles.circle}></Image>
                        </div>
                        <div><Image src="https://smarthr.co.in/demo/html/template/assets/img/bg/authentication-bg-01.png"
                            alt="background-image" width={2000}
                            height={600} className={Styles.people}></Image>
                        </div>
                        <p className={Styles.whiteText}>{TEXT.imagetext}</p>
                    </div>
                    <div><Image src="https://smarthr.co.in/demo/html/template/assets/img/bg/bg-02.png"
                        alt="circle-image2" width={2000}
                        height={600} className={Styles.circle_2}></Image>
                    </div>
                </div>
            </div>

            <div className={Styles.rightSide}>
                <div className={Styles.logoIcon}>
                    <Image src={logo} alt='logo' width={2000}
                        height={600} className={Styles.logo}></Image>
                </div>
                <Formik
                    initialValues={CONSTANT.INITIAL_VALUES}
                    validationSchema={CONSTANT.VALIDATION_SCHEMA}
                    onSubmit={handler.handleSubmit.bind(handler)}>
                    <Form>
                        <h2 className={Styles.heading}>{TEXT.signIn}</h2>
                        <p className={Styles.formHeading}>{TEXT.signInDetails}</p>
                        <div className={Styles.mailPass}>
                            <div className={Styles.mail}>
                                <label>{TEXT.labelEmail}</label>
                                <Field data-test="email" type="email" name="email" className={Styles.emailfield}></Field>
                                <Image src={emailIcon} alt="emailIcon" className={Styles.emailIcon}></Image>
                                <div className={Styles.error}>
                                    <ErrorMessage name="email" component="div" className={Styles.emailError}/*style={{ color: 'red', fontSize: '12px', marginTop:'3px' }}*/ />
                                </div>
                            </div>
                            <div className={Styles.password}>
                                <label>{TEXT.labelPassword}</label>
                                <Field data-test="password" name="password" type={showPassword ? 'text' : 'password'} className={Styles.passwordInput} />
                                <Image data-test="passwordIcon" src={showPassword ? showIcon : hideIcon} alt="passwordIcon" className={Styles.hide} onClick={togglePassword} ></Image>
                                <div className={Styles.error2}>
                                    <ErrorMessage name="password" component="div" className={Styles.passwordError}/*style={{ color: 'red', fontSize: '12px', marginTop:'3px' }}*/ />
                                </div>
                            </div>
                        </div>
                        <div className={Styles.checkbox}>
                            <label className={Styles.remember}>
                                <Field data-test="checkbox" type="checkbox" name="rememberMe" className={Styles.accent} />{TEXT.rememberMe}

                            </label>
                            <a href="/pages/forgot" data-test="forgotPassword">{TEXT.forgotPassword}</a>
                        </div>
                        <button data-test="Submit" className={Styles.button} type='submit' disabled={loading}>{TEXT.signIn}</button>

                        {/* <div className={Styles.account}>
                            <p className={Styles.createAcc}>Don't have an account? <a href="#" className={Styles.underline}>Create Account</a></p>
                        </div> */}

                        {/* <div id={Styles.or}>
                            <hr style={{ width: "45%", height: "0.01px", color: "rgb(255, 255, 255)" }} />
                            <p>Or</p>
                            <hr style={{ width: "45%", height: "0.1px" }}></hr>
                        </div>

                        <div id={Styles.icons}>
                            <button id={Styles.fb}><Image src={fbIcon} alt="facebookIcon" /></button>
                            <button id={Styles.google}><Image src={googleIcon} alt="googleIcon" /></button>
                            <button id={Styles.apple}><Image src={appleIcon} alt="googleIcon" /></button>
                        </div> */}

                    </Form>
                </Formik>
                <div className={Styles.copyright}>{TEXT.copyright}</div>
            </div>
        </div>
        </>
    );
}

export default SignInForm;
