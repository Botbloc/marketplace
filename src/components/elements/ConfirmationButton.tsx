
type ConfirmationButtonProps = {
  fnc?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset";
  text?: string;
  className ?: string;
  name ?: string;
};

const ConfirmationButton = ({fnc ,type, text , className, name } : ConfirmationButtonProps) => {
    return (
        <div className="confirmation_button">
            <button type={type} onClick={fnc} className={className}>
                {text}
            </button>
        </div>
    )
}
export default ConfirmationButton;