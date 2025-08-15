import React, { useEffect, useState } from "react";
import "./Logo.css";

type Props = {
  text?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const SignatureLogo: React.FC<Props> = ({
  text = "Akshay Kumar Reddy",
  as: Tag = "h1",
  className = "",
}) => {
  const [isCentered, setIsCentered] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCentered(false);
    }, 2000); // 2 seconds before moving to top-left
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tag
      className={`signature-logo ${isCentered ? "center" : "top-left"} ${className}`}
      aria-label={text}
    >
      <span className="angle">&lt;</span>
      <span className="name">{text}</span>
      <span className="angle">/&gt;</span>
    </Tag>
  );
};

export default SignatureLogo;
