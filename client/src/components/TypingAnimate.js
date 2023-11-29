import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnimate = () => {
  return (
    <div className="flex justify-center mx-auto my-32 h-40 max-w-2xl">
      <TypeAnimation
        sequence={[
          "Write a code snippet that implements a futuristic technology not yet invented. How does it change the world?",
          1000,
          "Write a story that begins with the line: 'In a world where time could be manipulated, she discovered a pocket watch that changed everything.'",
          1000,
          "Write a micro-fiction piece (100 words or less) about a character who discovers they can rewind time but at a cost. What would they undo?",
          1000,
          "Develop a concept for a coding challenge where participants have to create an AI that solves real-world environmental issues. How would the AI work?",
          1000,
        ]}
        wrapper="span"
        speed={60}
        style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingAnimate;