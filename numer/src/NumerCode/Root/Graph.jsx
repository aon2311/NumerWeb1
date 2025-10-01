import { useState } from "react";
import Navbar from "../../Components/Narbar/Navbar";
import {evaluate,row} from 'mathjs'
import './Graph.css'

function Graph () {

    const [fx, setFx] = useState("43*x-180");
    const [xs, setXs] = useState("");
    const [xe, setXe] = useState("");
    const [tolerance, setTolerance] = useState("");
    const [resultLogs, setResultLogs] = useState([]);
    const [result, setResult] = useState({ x: [], y: [] });
    const [saveStatus, setStatus] = useState("");

    const CalGraph = () => {
        const XS = parseFloat(xs);
        const XE = parseFloat(xe);
        const tol = parseFloat(tolerance);

        if (isNaN(XE) || isNaN(XS) || isNaN(tol)) {
            alert("Please fill in all information.");
            return;
        }

        let xv = [];
        let yv = [];
        let logs = [];
        let roots = [];

        const f = (x) => evaluate(fx, { x });

        for (let x = XS; x <= XE; x += tol) {
            const y = f(x);
            const nextX = x + tol;
            const nextY = f(nextX);

            xv.push(x);
            yv.push(y);

            let error = Math.abs((nextY - y) / (nextY !== 0 ? nextY : 1));

            
            logs.push({
            iteration: logs.length + 1,
            xv: x.toFixed(6),
            yv: y.toFixed(6),
            XS: XS.toFixed(6),
            XE: XE.toFixed(6),
            error: error.toFixed(6),
            });

            
            if (y * nextY < 0) {
            logs.push({
                iteration: logs.length + 1,
                xv: nextX.toFixed(6),
                yv: nextY.toFixed(6),
                XS: XS.toFixed(6),
                XE: XE.toFixed(6),
                error: error.toFixed(6),
            });
            break;
            }
        }

        setResult({ x: xv, y: yv });
        setResultLogs(logs);
        
    };

    return(
        <>
            <Navbar/>
            <div className="Graph"><h1>Graphical methods</h1></div>

            <div className="Container">
                <div className="input-container">
                    <div className="function-group">
                        <label >Function f(x) </label>
                        <input className="wide-input" value={fx} onChange={(e)=>setFx(e.target.value)} placeholder="43*x-180" />
                    </div>
                    <div className="parameter">
                        <div className="input-box">
                            <label >X Start </label>
                            <input value={xs} onChange={(e)=>setXs(e.target.value)} placeholder="0.0" />
                            

                        </div>
                        <div className="input-box">
                            <label >X end </label>
                            <input value={xe} onChange={(e)=>setXe(e.target.value)} placeholder="10.0" />

                        </div>
                        <div className="input-box">
                            <label >Tolerance</label>
                            <input value={tolerance} onChange={(e)=>setTolerance(e.target.value)} placeholder="0.000001" />

                        </div>

                    </div>

                </div>


            </div>
            <button className="confirm" onClick={CalGraph}>Confirm</button>

            {saveStatus && (
                <div style={{color: saveStatus.includes("Fail")? "red": "green",marigTop:"10px"}}>
                    {saveStatus}
                </div>
            )}
            
            <div className="Result"><h2>Result</h2></div>
            
                
                <table>
                    <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>x</th>
                        <th>f(x)</th>
                        <th>Error</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resultLogs.map((row, idx) => (
                        <tr key={idx}>
                        <td>{row.iteration}</td>
                        <td>{row.xv}</td>
                        <td>{row.yv}</td>
                        <td>{row.error}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            
        </>
    )
}
export default Graph;