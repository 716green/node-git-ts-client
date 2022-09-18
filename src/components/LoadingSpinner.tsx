import "@/components/LoadingSpinner.css";
import React from "react";

interface IProps {
  [key: string]: any;
}

const LoadingSpinner: React.FC<IProps> = ({ additionalStyles }) => (
  <div style={additionalStyles} className="spin" />
);

export default LoadingSpinner;
