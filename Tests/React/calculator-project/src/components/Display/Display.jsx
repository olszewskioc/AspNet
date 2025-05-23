import './Display.css'

const Display = ({ num1, op, num2 }) => {
    return (
        <section id="display">
                    <p className="expression" id="num1">{num1}</p>
                    <p className="expression" id="op">{op}</p>
                    <p className="expression" id="num2">{num2}</p>
        </section>
    );
}

export default Display;
