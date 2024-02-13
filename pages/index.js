import Head from "next/head";
import styles from "./index.module.css";
import Chat from "../components/Chat";
import InfoModal from "../components/Modal";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Compare GPT Chatbot</title>
        <link rel="icon" href="/robo.png" />
      </Head>
      <Header></Header>
      <main>
        <div className={styles.index__wrapper}>
          <Chat bot="1" />
          <Chat bot="2" />
        </div>
      </main>
    </>
  );
}
