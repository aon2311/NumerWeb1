import Navbar from "../../Components/Narbar/Navbar";
import "./Newton.css"
import { useState } from "react";
import {derivative, evaluate,row} from "mathjs"
import nerdamer from "nerdamer"
import "nerdamer/Calculus";


function Newton () {

    const [fx,setFx] = useState("cos(x) - x")
    const [x0,setX0] = useState("1")
    const [tolerance,setTolerance] = useState("0.000001")
    const [result,setResult] = useState([])
    const [saveStatus,setSaveStatus]=useState("")

    const CalNewton=()=>{

        let X0 =parseFloat(x0)
        let tol=parseFloat(tolerance)

        if(isNaN(X0)||isNaN(tol)||x0==""||tolerance==""){
            alert ("Please fill in all information")
            return;
        }

        let X=0
        let error=1
        let iteration=1
        let FX=0
        const logs=[]

        const diff =nerdamer(`diff(${fx},x)`).toString();
        const f=(x)=>evaluate(fx,{x})
        const f1 =(x)=>evaluate(diff,{x})
        


        while(error>tol){
            

            X=X0-(f(X0)/f1(X0))
            FX=f(X)

            error=Math.abs((X-X0)/X)

            logs.push({
                iteration:iteration,
                X:X.toFixed(6),
                FX:FX.toFixed(6),
                error:error.toFixed(tolerance.length-2)||"N\A",

            })

            if(iteration>1000){
                break;
            }
            X0=X
            iteration++
        }
        setResult(logs)

        
    }

    return(
        <>
        <Navbar/>
        <div className="Newton"><h1>Newton-Raphson methods</h1></div>

        <div className="Container">
            <div className="input-container">
                <div className="function-group">
                        <label>Function f(x)</label>
                        <input className="wide-input" value={fx} onChange={(e) => setFx(e.target.value)} placeholder="cos(x) - x" />
                    </div>
                <div className="parameter-group">
                    <div className="input-box">
                        <label>X</label>
                        <input value={x0} onChange={(e)=>setX0(e.target.value)} placeholder="1" />

                    </div>
                    <div className="input-box">
                        <label>Tolerance</label>
                        <input value={tolerance} onChange={(e)=>setTolerance(e.target.value)} placeholder="0.000001" />
                    </div>
                </div>
            </div>
        </div>

        <button className="confirm" onClick={CalNewton}>Confirm</button>

        
        
        {saveStatus &&(
            <div style={{color : saveStatus.includes("Fail") ?"red":"green", marginTop :"10px"}}>
                    {saveStatus}
            </div>
        )}

        <div className="Result"><h2>Result</h2></div>

        <table>
            <thead>
                <tr>
                    <th>Iteration : i</th>
                    <th>X i+1</th>
                    <th>f(X i+1)</th>
                    <th>Error;
                    </th>
                </tr>
            </thead>
            <tbody>
                {result.map((row,idx)=>(
                    <tr key={idx}>
                        <td>{row.iteration}</td>
                        <td>{row.X}</td>
                        <td>{row.FX}</td>
                        <td>{row.error}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        </>
    )
}
export default Newton;