"use client"
import React from 'react';
import styles from './profileAccount.module.css';
import Image from "next/image";
import { AsyncResponse, User, UpdateYourAccount, ChangePasswordAuthentications } from "@/app/component/lib/Interface";
import { useEffect, useState } from "react";
import { GetInformationUserAsync } from "@/app/component/api/GetInformationUserAsync";
import { UpdateAccountAsync } from '@/app/component/api/UpdateAccountAsync';
import { ChangePasswordAuthentication } from '@/app/component/api/ChangePasswordAuthentication';

const ProfileAccountPage = () => {
    const [userInformation, setUserInformation] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        balance: ''
    });

    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string>("");
    const [errorChangePassword, setErrorChangePassword] = useState('');
    const [errorUpdateAccount, setErrorUpdateAccount] = useState('');

    useEffect(() => {
        const fetchUserInformation = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await GetInformationUserAsync(token);
                if (response.status === "SUCCESS" && response.data) {
                    setUserInformation(response.data);
                } else {
                    setError(response.error ?? "Unknown error");
                }
            } else {
                setError("Token is missing");
            }
        };

        fetchUserInformation();
    }, []);

    const handleUpdate = async () => {
        setErrorUpdateAccount('');
        console.log(userInformation);
        const dataAccountChange: UpdateYourAccount = {
            firstName: userInformation.firstName,
            lastName: userInformation.lastName,
            phoneNumber: userInformation.phoneNumber
        }
        //console.log(dataAccountChange);
        const token = localStorage.getItem("token");
        if (!token) {
            setErrorUpdateAccount('Token is missing');
            return;
        }
        const response = await UpdateAccountAsync(dataAccountChange, token);
        if (response.status === "SUCCESS") {
            // router.push(`/login`);
            window.location.reload();
        } else {
            setErrorUpdateAccount(response.error?.toString() || 'Change Information Fail');
        }
    };

    const handleChangePassword = async () => {
        setErrorChangePassword('')
        // console.log(passwordNew);
        // console.log(passwordOld);
        if (passwordNew !== confirmPassword) {
            setErrorChangePassword("Password and confirmation password are different");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setErrorChangePassword('Token is missing');
            return;
        }
        const changePassword: ChangePasswordAuthentications = {
            oldPasssword: passwordOld,
            newPassword: passwordNew,
        }
        const response = await ChangePasswordAuthentication(changePassword, token);
        if (response.status === "SUCCESS") {
            //window.location.reload();
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else {
            setErrorChangePassword(response.error?.toString() || 'Change Password Fail');
        }
    };

    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInformation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer} >
                        <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg'} alt="logo" fill />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.infoTitle}>Your Information</div>
                    <form className={styles.form} >
                        <label>First Name</label>
                        <input type="text" name="firstName" value={userInformation.firstName} onChange={handleUserInputChange} />
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={userInformation.lastName} onChange={handleUserInputChange} />
                        <label>Email</label>
                        <input type="text" name="email" value={userInformation.email} readOnly onChange={handleUserInputChange} />
                        <label>Phone</label>
                        <input type="text" name="phoneNumber" value={userInformation.phoneNumber} onChange={handleUserInputChange} />
                        <p className='text-red-500'>{errorUpdateAccount}</p>
                        <button type="button" onClick={handleUpdate}>Update</button>
                    </form>
                </div>
            </div>

            <div className={styles.containerChild}>
                <div className={styles.formContainer}>
                    <form className={styles.form} >
                        <label>Password</label>
                        <input type="password" name="passwordOld" value={passwordOld} onChange={(e) => setPasswordOld(e.target.value)} placeholder="*******" />
                        <label>New Password</label>
                        <input type="password" name="passwordNew" value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} placeholder="*******" />
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="*******" />
                        <p className='text-red-500'>{errorChangePassword}</p>
                        <button type="button" onClick={handleChangePassword}>Change Password</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileAccountPage;
