import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Next Bank</h1>

      <p className={styles.description}>about the Bank</p>
    </main>
  );
};

export default Home;
