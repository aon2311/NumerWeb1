import Navbar from "../../Components/Narbar/Navbar";
import { useState } from "react";
import "./Cramer.css";
import { det } from "mathjs";

function Cramer() {
  const [n, setN] = useState("");
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [tolerance, setTolerance] = useState("0.00001");
  const [result, setResult] = useState([]);
  const [detA, setDetA] = useState(null);


  const handleNChange = (e) => {
    const size = parseInt(e.target.value);
    setN(size);
    const A = Array.from({ length: size }, () => Array(size).fill(""));
    const B = Array(size).fill("");
    
    setA(A);
    setB(B);
    setResult([]);
  };

  const handleMatrixAChange = (row, col, value) => {
    const newMatrix = [...a];
    newMatrix[row][col] = value;
    setA(newMatrix);
  };

  const handleVectorBChange = (index, value) => {
    const newVector = [...b];
    newVector[index] = value;
    setB(newVector);
  };

  const CalCramer = () => {
    const size = parseInt(n);
    let Tol = parseFloat(tolerance);
    let A = a.map((row) => row.map(Number));
    let B = b.map(Number);
    let results = [];

    let detA = det(A);

    if (detA === 0) {
      alert("det(A) is 0, can't use Cramer's Rule");
      return;
    }
    setDetA(detA.toFixed(6));

    let logs = [];

    for (let i = 0; i < size; i++) {
      let Ai = A.map((row, rIdx) => {
        let newRow = [...row];
        newRow[i] = B[rIdx];
        return newRow;
      });

      let detAi = det(Ai);
      results[i] = detAi / detA;
      logs.push({
        [`x${i + 1}`]: results[i].toFixed(tolerance.length - 2),
        detA:detA.toFixed(6),
      });
    }

    setResult(logs);
  };

  return (
    <>
      <div><Navbar /></div>
      <div className="Cramer"><h1>Cramer's Rule</h1></div>

        <div className="Container">
            <div className="input-container">
                <div className="parameter-group">
                    <div className="input-box">
                        <label>Matrix Size (N x N)</label>
                        <input type="number" min={1} max={5} value={n} onChange={handleNChange} placeholder="3"/>
                    </div>

                    <div className="input-box">
                        <label>Tolerance</label>
                        <input  value={tolerance} onChange={(e) => setTolerance(e.target.value)} placeholder="0.000001" />
                    </div>
                </div>

                {n && (
                    <div className="matrix-group">
                        <div className="A-container"><h3>Matrix A</h3></div>
                            {a.map((row, i) => (
                                <div className="A-matrix" key={i}>
                                    {row.map((val, j) => (
                                    <input key={j}  value={val} onChange={(e) => handleMatrixAChange(i, j, e.target.value)}/>
                                ))}
                                </div>
                            ))}

                        <div className="B-container"><h3>Vector B</h3></div>
                        <div className="B-matrix vertical">
                            {b.map((val, i) => (
                                <div key={i} className="B-row">
                                    <input value={val} onChange={(e) => handleVectorBChange(i, e.target.value)} />
                                </div>
                            ))}
                        </div>

                        <button className="confirm" onClick={CalCramer}>Confirm</button>
                    </div>
                )}

                {result.length > 0 && (
                    <div className="result">
                    <h3>Result (X)</h3>
                     <p>detA = {detA}</p>
                    {result.map((x, i) => (
                        <p key={i}>X{i + 1} = {Object.values(x)[0]}</p>
                    ))}
                    </div>
            )}
            </div>
        </div>
    </>
  );
}

export default Cramer;
