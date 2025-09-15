import React, { useState, FC } from "react";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import dangerIcon from '../../assets/icons/danger.svg'
import successIcon from '../../assets/icons/success.svg'
import warningIcon from '../../assets/icons/warning.svg'
import "./styles.scss";

type TooltipType = "success" | "danger" | "warning";

interface TooltipProps {
  message: string;
  type?: TooltipType;
}

const Tooltip: FC<TooltipProps> = ({ message, type = "warning" }) => {
  interface TypeStyles {
    icon: string;
    wrapperClass: string;
    tooltipClass: string;
  }
  const [isVisible, setIsVisible] = useState(false);

  const getTypeStyles = (): TypeStyles => {
    switch (type) {
      case "success":
        return {
          icon: successIcon,
          wrapperClass: "tooltip-icon success",
          tooltipClass: "tooltip-box success",
        };
      case "danger":
        return {
          icon: dangerIcon,
          wrapperClass: "tooltip-icon danger",
          tooltipClass: "tooltip-box danger",
        };
      case "warning":
      default:
        return {
          icon: warningIcon,
          wrapperClass: "tooltip-icon warning",
          tooltipClass: "tooltip-box warning",
        };
    }
  };

  const { icon: IconComponent, wrapperClass, tooltipClass } = getTypeStyles();

  return (
    <div className="tooltip-container">
      <div
        className={wrapperClass}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <img src={IconComponent} alt="Tooltip Icon" />
      </div>

      {isVisible && (
        <div className="tooltip-content">
          <div className={tooltipClass}>
            <p className="tooltip-message">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
