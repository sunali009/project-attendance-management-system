'use client';
import React from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Styles from "./style/index.module.scss";
import photoIcon from "@/public/assets/photo.svg";
import DateOfBirthField from '../../components/calendar/dateOfBirth';
import { useRef, useState, useEffect } from 'react';
import ImageCropper from '@/app/components/image-cropper/imageCropper';

export default function profile() {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);


    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result as string);
            };
        }
    };

    const handleCropDone = (cropped: File) => {
        console.log('handleCropDone called with:', cropped);
        setSelectedFile(cropped);
        const objectUrl = URL.createObjectURL(cropped);
        setCroppedImageUrl(objectUrl);
        setImageSrc(null);  // Close cropper modal
    };


    useEffect(() => {
        return () => {
            if (croppedImageUrl) {
                URL.revokeObjectURL(croppedImageUrl);
            }
        };
    }, [croppedImageUrl]);


    const initialValues = {
        fullName: '',
        phone: '',
        dateofBirth: ''
    };

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Full Name is required')
            .matches(/^[a-zA-Z\s]+$/, 'Full Name must contain only letters and spaces')
            .min(2, 'Full Name must be at least 2 characters'),
        dateofBirth: Yup.date()
            .required('Date of Birth is required')
            .max(new Date(), 'Date of Birth cannot be in the future'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    });

    const onSubmit = (values: any) => {
        console.log('Form data:', values);
    };

    return (
        <div className={Styles.mainContainer}>

            <div className={Styles.card}>
                <div className={Styles.cardBody}>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit} >
                        <Form>
                            <div className={Styles.formcontainer}>
                                <h1>Profile</h1>
                                <h2>Basic Information</h2>
                                <div className={Styles.grayBackground}>
                                    <div className={Styles.profilePhoto}>
                                        {croppedImageUrl ? (
                                            <img
                                                src={croppedImageUrl}
                                                alt="Cropped Profile"
                                                className={Styles.croppedPreview}
                                            />
                                        ) : (
                                            <Image src={photoIcon} alt="photoicon" width={2000} height={600} className={Styles.photoIcon}></Image>
                                        )}

                                    </div>
                                    <div className={Styles.profileInfo}>
                                        <div className={Styles.profiletext}>Profile Photo</div>
                                        <div className={Styles.imageSize}>Recommended image size is 40px x 40px</div>
                                        <div className={Styles.buttons}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}

                                            />
                                            <button className={Styles.upload} type="button" onClick={handleUploadClick}>Upload</button>
                                            {/* <button className={Styles.cancel} type="button">Cancel</button> */}
                                        </div>
                                    </div>
                                </div>

                                <div className={Styles.nameDetails}>
                                    <div className={Styles.fullNamecontainer}>
                                        <label>Full Name</label>
                                        <div className={Styles.errorMessage}>
                                            <Field data-test="fullName" type="fullName" name="fullName" className={Styles.fullName}></Field>
                                            <div className={Styles.nameError}>
                                                <ErrorMessage name="fullName" component="div" className={Styles.error} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Styles.dateofBirth}>
                                        <label>Date of birth</label>
                                        <div className={Styles.errorMessage}>
                                            <DateOfBirthField data-test="dateofBirth" name="dateofBirth" ></DateOfBirthField>
                                            <div className={Styles.dateError}>
                                                <ErrorMessage name="dateofBirth" component="div" className={Styles.error} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={Styles.otherDetails}>
                                    <div className={Styles.phoneInput}>
                                        <label className={Styles.phoneLabel}>Phone</label>
                                        <div className={Styles.errorMessage}>
                                            <Field data-test="phone" type="tel" name="phone" className={Styles.phone}></Field>
                                            <div className={Styles.phoneError}>
                                                <ErrorMessage name="phone" component="div" className={Styles.error} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className={Styles.phone}>
                                        <label>Phone</label>
                                        <Field data-test="phone" type="tel" name="phone" className={Styles.phone}></Field>
                                    </div> */}
                                </div>

                                <div className={Styles.submitButton}>
                                    <button type="button" className={Styles.cancelButton}>Cancel</button>
                                    <button type="button" className={Styles.saveButton}>Save</button>
                                </div>


                            </div>


                        </Form>
                    </Formik>
                </div>

            </div>
            {imageSrc && (
                <ImageCropper
                    imageSrc={imageSrc}
                    onClose={() => setImageSrc(null)}
                    onCropDone={handleCropDone}
                />
            )}

        </div>
    )

}