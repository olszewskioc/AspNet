import { useState, useEffect } from "react";
import "./App.css";
import Display from "./components/Display/Display";
import Buttons from "./components/Button/Button";

function App() {
  
  const [firstOperand, setFirstOperand] = useState("");
  const [secondOperand, setSecondOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [isSecondOperand, setIsSecondOperand] = useState(false);
  const [result, setResult] = useState("");
  
  useEffect(() => {
      localStorage.setItem("lastCalculation", result);
  }, [result]);

    const handleButtonClick = (value) => {
        if (!isNaN(value)) {
            // Se for número
            if (!isSecondOperand) {
                setFirstOperand((prev) => prev + value);
            } else {
                setSecondOperand((prev) => prev + value);
            }
        } else if (["+", "-", "X", "/"].includes(value)) {
            if (firstOperand !== "") {
                setOperator(value);
                setIsSecondOperand(true);
            }
        } else if (value === "=") {
            const num1 = parseFloat(firstOperand);
            const num2 = parseFloat(secondOperand);
            let res = "";
            switch (operator) {
                case "+":
                    res = num1 + num2;
                    break;
                case "-":
                    res = num1 - num2;
                    break;
                case "X":
                    res = num1 * num2;
                    break;
                case "/":
                    res = num2 !== 0 ? num1 / num2 : "Erro";
                    break;
                default:
                    res = "Erro";
                    break;
            }
            setResult(res);
            setFirstOperand(res.toString());
            setSecondOperand("");
            setOperator("");
            setIsSecondOperand(false);
        } else if (value === "DEL") {
            setFirstOperand("");
            setSecondOperand("");
            setOperator("");
            setResult("");
            setIsSecondOperand(false);
        }
    };

    return (
        <main id="App">
            <Display
                num1={firstOperand}
                op={operator}
                num2={secondOperand}
            />
            <section className="grid grid-buttons">
                <div className="row row-1">
                    <Buttons handleClick={handleButtonClick} value={7} />
                    <Buttons handleClick={handleButtonClick} value={8} />
                    <Buttons handleClick={handleButtonClick} value={9} />
                    <Buttons handleClick={handleButtonClick} value={"DEL"} bgColor="#ffa133" />
                </div>
                <div className="row row-2">
                    <Buttons handleClick={handleButtonClick} value={4} />
                    <Buttons handleClick={handleButtonClick} value={5} />
                    <Buttons handleClick={handleButtonClick} value={6} />
                    <Buttons handleClick={handleButtonClick} value={"X"} bgColor="#33a2ff" />
                </div>
                <div className="row row-3">
                    <Buttons handleClick={handleButtonClick} value={1} />
                    <Buttons handleClick={handleButtonClick} value={2} />
                    <Buttons handleClick={handleButtonClick} value={3} />
                    <Buttons handleClick={handleButtonClick} value={"/"} bgColor="#33a2ff" />
                </div>
                <div className="row row-4">
                    <Buttons handleClick={handleButtonClick} value={0} />
                    <Buttons handleClick={handleButtonClick} value={"+"} bgColor="#33a2ff" />
                    <Buttons handleClick={handleButtonClick} value={"-"} bgColor="#33a2ff" />
                    <Buttons handleClick={handleButtonClick} value={"="} bgColor="#19ae45" />
                </div>
            </section>
        </main>
    );
}

export default App;
