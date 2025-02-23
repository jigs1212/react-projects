import { useEffect, useMemo, useState } from "react";

const ProgressBar = ({
  progress,
  color = "green",
}: {
  color?: string;
  progress: number;
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(
    function setAnimatedProgressOnLoad() {
      if (progress !== animatedProgress) setAnimatedProgress(progress);
    },
    [progress, animatedProgress]
  );

  const progressStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: color,
      transform: `translateX(${animatedProgress - 100}%)`,
      textAlign: "right",
      color: animatedProgress < 5 ? "black" : "white",
      transition: "0.5s ease-in",
      borderRadius: "20px",
    }),
    [animatedProgress, color]
  );

  return (
    <div className="outer">
      <div className="inner" style={progressStyle}>
        <span
          className="progress"
          style={{ marginRight: animatedProgress < 5 ? "-5px" : 0 }}
        >
          {animatedProgress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
