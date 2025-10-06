import Navbar from "../../Components/Narbar/Navbar";
import "./False.css"
import { useState } from "react";
import {evaluate,row} from "mathjs"

function False () {

    const [fx,setFx] = useState("x^4-13")
    const [xl,setXl] =useState("1.5")
    const [xr,setXr] =useState("2.0")
    const [tolerance,setTolerance]=useState("0.000001")
    const [result,setResult] = useState([])
    const [saveStatus,setStatus] = useState("")

    const CalFalse=()=>{
        
        let XL =parseFloat(xl)
        let XR =parseFloat(xr)
        let tol = parseFloat(tolerance)

        if (isNaN(XL)||(isNaN(XR)||isNaN(tol)||xl==""||xr==""||tolerance=="")) {
            alert ("please fill in all information.")
            return;
        }

        let X1=0
        let old_X1=0
        let error=1
        let iteration=0

        const logs=[]

        const f=(x)=>evaluate(fx,{x})


        while(error>tol){
            const fxl=f(XL)
            const fxr=f(XR)
            X1= ((XL*fxr)-(XR*fxl))/(fxr-fxl)
            const fx1=f(X1)

            if(iteration>0){
                error=Math.abs((X1-old_X1)/X1)
            }

            logs.push({
                iteration:iteration,
                XL:XL.toFixed(6),
                XR:XR.toFixed(6),
                X1:X1.toFixed(6),
                fx1:f(X1).toFixed(6),
                error:error.toFixed(tolerance.length-2)||"N/A",

            })

            if(fx1*fxr>0){
                XR=X1
            }
            else{
                XL=X1
            }
            old_X1=X1
            iteration++

            if(iteration>1000){
                break;
            }

        }
        setResult(logs);
        //---
        ///---

    }

    return(
        <>
            <div><Navbar/></div>
            <div className="False"><h1>False Position</h1></div>

            <div className="Container">
                <div className="input-container">
                    <div className="function-group">
                        <label >Function f(x)</label>
                        <input className = "wide-input" value={fx} onChange={(e)=> setFx(e.target.value)} placeholder="x^4-13" />
                    </div>

                    <div className="parameter-group">
                
                        <div className="input-box">
                            <label>Lower Bound</label>
                            <input value={xl} onChange={(e)=> setXl(e.target.value)} placeholder="1.5" />
                        </div>
                        <div className="input-box">
                            <label >Upper Bound</label>
                            <input value={xr} onChange={(e)=> setXr(e.target.value)} placeholder="2.0" />
                        </div>
                        <div className="input-box">
                            <label >Tolerance</label>
                            <input value={tolerance} onChange={(e)=> setTolerance(e.target.value)} placeholder="0.000001" />
                        </div>

                    </div>
                </div>
            </div>

            <button className="confirm" onClick={CalFalse}>Confirm</button>

            {saveStatus && (
                <div style={{color:saveStatus.includes("Fail")?"red": "green",marginTop: "10px"}}>
                    {saveStatus}
                </div>
            )}

            <div className="Result"><h2>Result</h2></div>

            <table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>X1</th>
                        <th>F(X1)</th>
                        <th>XL</th>
                        <th>XR</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((row,idx)=>(
                        <tr key={idx}>
                            <td>{row.iteration}</td>
                            <td>{row.X1}</td>
                            <td>{row.fx1}</td>
                            <td>{row.XL}</td>
                            <td>{row.XR}</td>
                            <td>{row.error}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default False;