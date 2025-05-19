import './Button.css'

const Button = ({ value, handleClick }) => {
    return (
        <button onClick={handleClick}>{value}</button>
    );
}

export default Button;