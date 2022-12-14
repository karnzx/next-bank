import React from "react";
import Navbar from "../components/navbar";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next Bank</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>

      <main className="px-5 pb-10">{children}</main>

      <footer className={styles.footer}>
        <a href="" target="_blank" rel="noopener noreferrer">
          Powered by Piravit Chenpittaya{" "}
          <span className={styles.logo}>
            <Image src="/favicon.ico" alt="icon" width={16} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
};

export default Layout;
