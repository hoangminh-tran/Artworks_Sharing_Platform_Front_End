'use client';
import styles from "../ui/Dashboard/dashboard.module.css";
import CardMoney from "../ui/Dashboard/CardMoneys/CardMoney";
import CardAccounts from "../ui/Dashboard/CardAccounts/CardAccounts";
import CardArtworks from "../ui/Dashboard/CardArtworks/CardArtworks";
import Chart from "../ui/Dashboard/Chart/Chart";

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <CardMoney />
                    <CardAccounts />
                    <CardArtworks />
                </div>
                {/* <Transactions /> */}
                <Chart />
            </div>
            {/* <div className={styles.side}>
                <RightBar />
            </div> */}
        </div>
    );
}
