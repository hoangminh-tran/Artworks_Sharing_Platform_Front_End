"use client"
import React from 'react';
import styles from './chart.module.css';
import { useEffect, useState } from "react";

import { GetAccountRegisterAsync } from "@/app/component/api/GetAccountRegisterAsync";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RegistrationStats, MonthlyRegistrationStatistics } from "@/app/component/lib/Interface";


const Chart = () => {

    const [RegistrationStatistics, setRegistrationStatistics] = useState<MonthlyRegistrationStatistics>({});
    const [error, setError] = useState<string>("");


    useEffect(() => {
        const fetchUserInformation = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await GetAccountRegisterAsync(token);
                if (response.status === "SUCCESS" && response.data) {
                    setRegistrationStatistics(response.data);
                } else {
                    setError(response.error ?? "Unknown error");
                }
            } else {
                setError("Token is missing");
            }
        };

        fetchUserInformation();
    }, []);

    //console.log(RegistrationStatistics);
    const Data = Object.keys(RegistrationStatistics).map((key) => {
        return {
            name: key,
            Creator: RegistrationStatistics[key].creatorRegisterInMonth,
            Member: RegistrationStatistics[key].memberRegisterInMonth,
            Moderator: RegistrationStatistics[key].moderatorRegisterInMonth
        }
    });
    // console.log(newData);
    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}> Register Account Revenue</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={Data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <CartesianGrid strokeDasharray="1 1" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Creator" stroke="#008080" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="Member" stroke="#436EEE" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="Moderator" stroke="#CD8500" strokeDasharray="3 4 5 2" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};
export default Chart;