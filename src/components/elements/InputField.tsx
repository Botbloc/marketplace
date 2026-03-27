
type InputFieldProps = {
  onChange?:  React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "password" | "email" | "number";
  value?: string;
  className ?: string;
  placeholder ?: string;
  name ?: string;
};

const InputField = ({onChange ,type, value , className, placeholder, name } : InputFieldProps) => {
    return (
        <div className="InputField">
            <input 
                type={type} 
                onChange={onChange} 
                className={className} 
                placeholder={placeholder} 
                value={value}
                name={name}
                >      
                </input>
        </div>
    )
}
export default InputField;