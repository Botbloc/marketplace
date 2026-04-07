
type ConfirmationButtonProps = {
  fnc?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset";
  text?: string;
  className ?: string;
  name ?: string;
  disabled ?: boolean;
  color?: "primary" | "danger" | "success" | "neutral";
};

const ConfirmationButton = ({fnc ,type, text , className, name, disabled, color } : ConfirmationButtonProps) => {
    const colorClass = {
        primary: "btn-primary",
        danger: "btn-danger",
        success: "btn-success",
        neutral: "btn-neutral",
    }[color];
    return (
        <div className="confirmation_button">
            <button type={type} onClick={fnc} className={`${className} ${colorClass}`} disabled={disabled}>
                {text}
            </button>
        </div>
    )
}
export default ConfirmationButton;