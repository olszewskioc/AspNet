import './Button.css'

const Button = ({ value, handleClick, bgColor = "#1a1a1a" }) => {
    return (
        <button onClick={() => handleClick(value)} style={{ backgroundColor: bgColor }}>{value}</button>
    );
}

export default Button;