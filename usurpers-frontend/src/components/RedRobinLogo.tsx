import React from "react";

const RedRobinLogo: React.FC = () => (
  <img
    src={`${process.env.PUBLIC_URL}/RedRobinLogo.png`}
    alt="Red Robin Logo"
    style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      width: 64,
      height: 64,
      zIndex: 1000,
      opacity: 0.85,
      pointerEvents: "none",
      filter: "drop-shadow(0 0 8px #0008)"
    }}
    draggable={false}
  />
);

export default RedRobinLogo; 