import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timerId = null;

    setDisplayed("");
    setDone(false);

    const startTimeout = setTimeout(() => {
      timerId = setInterval(() => {
        setDisplayed((prev) => {
          const nextLength = prev.length + 1;

          if (nextLength >= text.length) {
            clearInterval(timerId);
            setDone(true);
            return text;
          }

          return text.substring(0, nextLength);
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (timerId) clearInterval(timerId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}