type Props = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholderText?: string;
  errorMesage?: any;
  isRequired?: boolean;
  label?: string;
  value?: string | number | string[];
  defaultValue?: string | number | string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

const InputForm = ({
  name,
  label,
  type = "text",
  placeholderText,
  errorMesage,
  isRequired,
  value,
  onChange,
  defaultValue,
}: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-lettersDark" htmlFor={name}>{label}</label>
          <input
            value={value}
            defaultValue={defaultValue}
            id={name}
            name={name}
            required={isRequired}
            type={type}   
            onChange={onChange}
            placeholder={placeholderText}
            className="rounded-full border-[1px] focus:border-2 focus:outline-none focus:bg-orange-50 border-orange-400 border-solid 
      text-lettersDark font-normal text-xs py-1 px-3"
          />
        </div>

        {errorMesage && (
          <span className="text-red-600 text-[10px]">{errorMesage}</span>
        )}
      </div>
    </>
  );
};
export default InputForm;
