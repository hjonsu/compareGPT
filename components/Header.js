import React from "react";
import InfoModal from "./Modal";
import styles from "../pages/header.module.css";

export default function Header() {
  return (
    <div className={styles.headingWrapper}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Compare GPT-4</h1>
        <InfoModal button="How does it work?" title="Compare GPT">
          <div className={styles.description}>
            <p>This chat-bot contains 2 seperate chats.</p>
            <p>
              This enables users to input different prompts, specifying the
              desired actions for the AI. Users can then compare responses
              generated based on these distinct prompts.
            </p>
            <p>
              Alternatively, users have the option to employ the same prompt and
              juxtapose the AI responses with various messages side by side.
            </p>
            <br />
            <p>For example:</p>
            <p>Bot 1 is prompted with "You are a personal assistant".</p>
            <p>
              Bot 2 is prompted: "You are a personal assistant, but also an
              undercover spy trying to figure out the users darkest secret."
            </p>
            <br />
            <p>Now compare the different responses side by side! Enjoy!</p>
            <span>
              Created by&nbsp;
              <a
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.github.com/hjonsu"
              >
                Jonathan Su
              </a>
            </span>
          </div>
        </InfoModal>
      </div>
    </div>
  );
}
