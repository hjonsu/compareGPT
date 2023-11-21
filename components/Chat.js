import { useEffect, useState, useRef } from "react";
import styles from "../pages/index.module.css";
import { PulseLoader } from "react-spinners";
import ResponseGrader from "./ResponseGrader";

// props = {bot: num}
export default function Chat({ bot }) {
  const [userInput, setUserInput] = useState("");
  const [prompt, setPrompt] = useState("");
  // const [freeze, setFreeze] = useState(false);
  const [chat, setChat] = useState([]); // [{userMessage: "hi", chatbotMessage: "hello"}
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [userMsg, setUserMsg] = useState([]);
  const bottomRef = useRef(null);
  const [grade, setGrade] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMsg]);

  const handleClick = () => setChecked(!checked);

  async function chatResponse() {
    try {
      const response = await fetch(`/api/generate1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat: chat,
          userMsg: userInput,
          bot: bot,
          prompt: prompt,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setChat((prevChat) => {
        return [
          ...prevChat,
          {
            user: userInput,
            assistant: data.result.message.content,
            bot: bot,
            prompt: prompt,
          },
        ];
      });
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setLoading(false);
      throw err;
    }
  }

  async function gradeResponse(data) {
    try {
      const gradeResponse = await fetch(`/api/generate2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bot: bot,
          prompt:
            "assess this response and give it a grade from 1-5 (1 being the worst and 5 being the best) in different catergories: accuracy, creativity, and overall quality. I want the response to be in the format of Accuracy: x, Creativity: y, Overall Quality: z with new lines after each result as well as the text that was graded.",
          toGrade: data.result.message.content,
        }),
      });

      const gradedData = await gradeResponse.json();
      if (gradeResponse.status !== 200) {
        throw (
          gradedData.error ||
          new Error(`Request failed with status ${gradeResponse.status}`)
        );
      }

      setGrade({ grade: gradedData.grade.message.content, bot: bot });
      // console.log(grade, "graded data");
    } catch (err) {
      console.log(err);
      throw err;
    }
    setLoading2(false);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (loading || loading2) return;
    setLoading(true);
    // setLoading2(true);
    if (checked) {
      setLoading2(true);
    }

    setUserMsg((userMsg) => [...userMsg, userInput]);
    try {
      const chatResponseData = await chatResponse();
      checked ? await gradeResponse(chatResponseData) : null;

      setUserInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      if (checked) {
        setLoading2(false);
      }
    }
  }

  return (
    <div className={styles.main}>
      <img src="/robo.png" className={styles.icon} />
      <h3>GPT-4 Chatbot {bot}</h3>
      <form onSubmit={onSubmit}>
        <div className={styles.textToolInfo}>
          <svg viewBox="0 0 24 24" height="20" width="20" aria-hidden="true">
            <g>
              <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
            </g>
          </svg>
          <div className={styles.textToolPopup}>
            Important: Changing prompt midway through a conversation can result
            in unpredictable responses. Check Retain Initial Prompt to disable
            prompt changes.
          </div>
        </div>
        <textarea
          type="text"
          name="prompt"
          placeholder="Enter a prompt! E.g. You are a personal assistant. Help the human user achieve their tasks. "
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <ul className={styles.chatBox}>
          {chat.map((item, index) => (
            <>
              <li className={styles.resultUser} key={"user" + index}>
                {item.user}
              </li>
              <li className={styles.result} key={index}>
                {item.assistant}
              </li>
            </>
          ))}
          {loading && (
            <li key="-1" className={styles.resultUser}>
              {userInput}
            </li>
          )}
          {loading && (
            <PulseLoader color="#4681f4" size={10} speedMultiplier={0.65} />
          )}
          <div style={{ float: "left", clear: "both" }} ref={bottomRef}></div>
        </ul>
        <textarea
          type="text"
          name="userInput"
          placeholder="Enter an message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          name="enable"
          onClick={handleClick}
          checked={checked}
        />
        <label for="response">Enable self grading?</label>
      </div>
      {checked && (
        <div className={styles.responseGrade}>
          <div className={styles.responseHeader}>
            <h5>Response Grade</h5>

            <div className={styles.textToolInfo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.8em"
                viewBox="0 0 320 512"
              >
                <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
              </svg>
              <div className={styles.textToolPopup}>
                The bot grades its responses based on the following three
                attributes: Accuracy, Creativity and Overall quality.
                Customizable grading will come in a future update.
              </div>
            </div>
          </div>
          {/* <ul className={styles.responseGradeList}> */}
          <h4 className={styles.responseGradeItem}>{grade.grade}</h4>
          {loading2 && (
            <PulseLoader color="#4681f4" size={10} speedMultiplier={0.65} />
          )}
          {/* </ul> */}
        </div>
      )}
    </div>
  );
}
