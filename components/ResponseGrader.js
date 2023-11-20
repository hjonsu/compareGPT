import { useEffect, useState, useRef } from "react";
import styles from "../pages/index.module.css";

// props = {response: string}
export default function ResponseGrader({ response }) {
  const [result, setResult] = useState([]);
  // Grading
  const [toBeGraded, setToBeGraded] = useState("");

  async function grade(res) {
    if (res.trim().length === 0) {
      return;
    }
    try {
      const response = await fetch(`/api/generate2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toBeGraded: res,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      console.log(data.result.message.content, "tobegradedinsidechatjs");
      // setToBeGraded("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <form onChange={grade(response)}>
      <div className={styles.responseGrade}>
        <h5>Response Grade</h5>
        <div>{response}</div>
        <ul className={styles.responseGradeList}>
          <li className={styles.responseGradeItem}>Item here...</li>
        </ul>
      </div>
    </form>
  );
}
