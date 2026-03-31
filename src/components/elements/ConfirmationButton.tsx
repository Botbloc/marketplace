
type ConfirmationButtonProps = {
  fnc?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset";
  text?: string;
  className ?: string;
  name ?: string;
  disabled ?: boolean;
};

const ConfirmationButton = ({fnc ,type, text , className, name, disabled } : ConfirmationButtonProps) => {
    return (
        <div className="confirmation_button">
            <button type={type} onClick={fnc} className={className} disabled={disabled}>
                {text}
            </button>
        </div>
    )
}
export default ConfirmationButton;