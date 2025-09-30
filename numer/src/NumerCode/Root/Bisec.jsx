import Navbar from "../../Components/Narbar/Navbar";
import "./Bisec.css"
import { useState } from "react";
import { evaluate, row } from "mathjs";


function Bisec () {
    
    const [fx,setFx] = useState("x^4 - 13")
    const [xl,setXl] = useState("")
    const [xr,setXr] =useState("")
    const [tolerance,setTolerance] =useState("")
    const [result,setResult]= useState([])
    const [saveStatus,setStatus] = useState("")

    const CalBisec= ()=>{
        let XL = parseFloat(xl)
        let XR = parseFloat(xr)
        const tol = parseFloat(tolerance)

        if(isNaN(XL)|| isNaN(XR)|| isNaN(tol) || xl=="" ||xr==""||tolerance==""){
            alert("Please fill in all information.")
            return;
        }
        
        let XM =0
        let old_XM =0
        let error = 1
        let iteration = 0

        const logs=[]

        const f=(x) =>evaluate(fx,{x})

        while (error>tol) {
            XM =(XL+XR)/2

            if(iteration >0){
                error = Math.abs ((XM-old_XM)/XM)
            }

            logs.push({
                iteration: iteration,
                XL: XL.toFixed(6),
                XR: XR.toFixed(6),
                XM: XM.toFixed(6),
                error: error.toFixed(tolerance.length-2)||"N/A",
            })

            if(f(XM)*f(XR)>0){
                XR=XM;
            }
            else{
                XL=XM
            }
            old_XM=XM
            iteration++

            if (iteration>1000) {
                break;
                
            }

        }

        setResult(logs);

        //------ยังไม่เขียนส่งข้อมูลไปบันทึกในฐานข้อมูล
        //---------------------------------------
    }
    return (
    <>
        <div><Navbar /></div>
        <div className="Bisec"><h1>Bisection</h1></div>

        <div className="Container">
            <div className="input-container">
                <div className="function-group">
                    <label>Function f(x)</label>
                    <input className="wide-input" value={fx} onChange={(e) => setFx(e.target.value)} placeholder="Enter function,  x^4 - 13" />
                </div>

                <div className="parameter-group">
                    <div className="input-box">
                        <label>Lower Bound</label>
                        <input   value={xl} onChange={(e) => setXl(e.target.value)} placeholder=" 1.5" />
                    </div>

                    <div className="input-box">
                        <label>Upper Bound</label>
                        <input  value={xr} onChange={(e) => setXr(e.target.value)}placeholder=" 2.0"/>
                    </div>
                    <div className="input-box">
                        <label>Tolerance</label>
                        <input  value={tolerance} onChange={(e) => setTolerance(e.target.value)} placeholder=" 0.0001"/>
                    </div>
                </div>
            </div>
        </div>

        <button className="confirm" onClick={CalBisec}>Confirm</button>

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
            <th>XM</th>
            <th>XL</th>
            <th>XR</th>
            <th>Error</th>
            </tr>
        </thead>
        <tbody>
            {result.map((row, idx) => (
            <tr key={idx}>
                <td>{row.iteration}</td>
                <td>{row.XM}</td>
                <td>{row.XL}</td>
                <td>{row.XR}</td>
                <td>{row.error}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </>
    );
}
export default Bisec;