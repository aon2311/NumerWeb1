import Navbar from "../../Components/Narbar/Navbar";
import "./One.css"
import { useState } from "react";
import { evaluate,row } from "mathjs";


function One () {

    const [fx,setFx] = useState("(1+43x)/86")
    const [x0,setX0] =useState ("1")
    const [tolerance,setTolerance] = useState("0.1")
    const [result,setResult] = useState([])
    const [saveStatus,setStatus] =useState("")

    const CalOne =()=>{
        let X0=parseFloat(x0)
        let tol =parseFloat(tolerance)

        if(isNaN(X0)||isNaN(tol)||x0==""||tolerance==""){
            alert("Please fill in all information")
            return;
        }

        let x1=0
        let error=1
        let iteration=0
        const logs=[]

        const f=(x)=>evaluate(fx,{x})

        while(error>tol){
            x1=f(X0)
            if(iteration>0){
                error = Math.abs((x1-X0)/x1)
            }

            logs.push({
                iteration:iteration,
                X0:X0.toFixed(6),
                X1:x1.toFixed(6),
                fx1:f(X0).toFixed(6),
                error:error.toFixed(tolerance.length-2)||"N/A"
            })

            if(iteration>1000){
                break
            }
            X0=x1
            iteration++


        }
        setResult(logs)
    }

    return(
        <>
            <div><Navbar/></div>
            <div className="One"><h1>One-Point Iteration Methods</h1></div>
            <div className="Container">
                <div className="input-container">
                    <div className="function-group">
                        <label>Function f(x)</label>
                        <input className="wide-input" value={fx} onChange={(e) => setFx(e.target.value)} placeholder="x^2-7" />
                    </div>
                    <div className="parameter-group">
                        <div className="input-box">
                            <label >X0</label>
                            <input value={x0} onChange={(e) => setX0(e.target.value)} placeholder="1" />
                        </div>
                        <div className="input-box">
                            <label>Tolerance</label>
                            <input value={tolerance} onChange={(e) => setTolerance(e.target.value)} placeholder="0.000001" />
                        </div>
                        
                    </div>

                </div>

            </div>

            <button className="confirm" onClick={CalOne}>Confirm</button>

            {saveStatus && (
                <div style={{ color: saveStatus.includes("Fail") ? "red" : "green", marginTop: "10px" }}>
                    {saveStatus}
                </div>
            )}

            <div className="Result"><h2>Result</h2></div>

            <table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>X0</th>
                        <th>X1</th>
                        <th>f(X0)</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((row,idx)=>(
                        <tr key={idx}>
                            <td>{row.iteration}</td>
                            <td>{row.X0}</td>
                            <td>{row.X1}</td>
                            <td>{row.fx1}</td>
                            <td>{row.error}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default One;