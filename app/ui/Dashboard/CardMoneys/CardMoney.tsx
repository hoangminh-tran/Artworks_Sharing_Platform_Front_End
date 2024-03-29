"use client"
import React from 'react';
import styles from './cardMoney.module.css';
import { useEffect, useState } from "react";
import {
    MdAttachMoney
} from 'react-icons/md';
import { GetStatisticsInformationAsync } from '@/app/component/api/GetStatisticsInformationAsync';
import { TotalStatisticalDashboard } from "@/app/component/lib/Interface";


const CardMoney = () => {

    const [StatisticalInformation, setStatisticalInformation] = useState<TotalStatisticalDashboard>({
        totalAccounts: '',
        totalArtworks: '',
        totalMoney: 0
    });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchStatisticalInformation = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await GetStatisticsInformationAsync(token);
                if (response.status === "SUCCESS" && response.data) {
                    setStatisticalInformation(response.data);
                } else {
                    setError(response.error ?? "Unknown error");
                }
            } else {
                setError("Token is missing");
            }
        };

        fetchStatisticalInformation();
    }, []);
    const formattedTotalMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(StatisticalInformation.totalMoney ?? 0);
    return (
        <div className={styles.container}>
            <MdAttachMoney size={24} />
            <div className={styles.texts} >
                <span className={styles.title} > Total Money</span>
                <span className={styles.number} >{formattedTotalMoney}</span>
                {/* <span className={styles.detail} >
                    <span className={styles.positive}>+3.7%</span> since last month
                </span> */}
            </div>
        </div>
    );
};
export default CardMoney;