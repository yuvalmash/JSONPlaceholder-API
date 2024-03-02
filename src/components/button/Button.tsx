import './buttonStyle.css'

type ButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

export default function Button({ disabled, onClick, text }: ButtonProps) {
  return (
    <button className="btn" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
