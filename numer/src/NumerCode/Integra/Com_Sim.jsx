import { useState } from "react";
import {evaluate} from "mathjs"
import Navbar from "../../Components/Narbar/Navbar"
import "./Com_Sim.css"
import Plot from "react-plotly.js"

function Com_Sim() {

    const [fx,setFx] =useState("x^2")
    const [n,setN] = useState("6")
    const [a,setA] = useState("-2")
    const [b,setB] =useState("4")
    const [tolerance,setTolerance] =useState("0.000001")
    const [result,setResult] = useState([])

    const f=(x)=>evaluate(fx,{x})

    const IntegrateFx=(f,a,b,n)=>{
        const h=(b-a)/(n)
        let sum = f(a)+f(b) 
        for(let i=1;i<n;i++){
            let x = a+(i*h)
            if (n%2==1) {
                sum+= 4*f(x)
            }
            else{
                sum+= 2*f(x)
            }
        }
        return h/3 *sum
    }

    const CalComsim =()=>{
        let N=parseInt(n)
        let A=parseFloat(a)
        let B=parseFloat(b)
        let Tol=parseFloat(tolerance)

        if (isNaN(N)||isNaN(A)||isNaN(B)||isNaN(Tol)||a==""||b==""||n==""||tolerance=="") {
            alert ("Please fill all information")
            return;
        }

        if (N%2!==0) {
            alert ("n is Even Number")
            return;
        }

        let iteration =0
        let error =1
        let I_old=0
        const logs=[]

        while (error>Tol) {
            const I = IntegrateFx(f,A,B,N)
            if(I!==0){
                error = Math.abs((I-I_old)/I)
            }
            

            logs.push({
                iteration:iteration,
                I:I.toFixed(6),
                A:A.toFixed(6),
                B:B.toFixed(6),
                error:error.toFixed(tolerance.length-2)||"N/A",
            })

            I_old=I
            iteration++
            N=N+2
            if(iteration>1000){
                break
            }
        }
        setResult(logs)
    }


    return(
        <>
        <Navbar/>
        <div className="Comsim"><h1>Composition Simpson Rule's</h1> </div>
        <div className="Container">
            <div className="input-container">
                <div className="function-group">
                    <label>Function f(x)</label>
                    <input className="wide-input" value={fx} onChange={(e) => setFx(e.target.value)} placeholder="x^2" />
                </div>
                <div className="parameter-group">
                    <div className="input-box">
                        <label >n</label>
                        <input type="number" value={n} onChange={(e)=>setN(e.target.value)} placeholder="6" />
                    </div>
                    <div className="input-box">
                        <label >a</label>
                        <input value={a} onChange={(e)=>setA(e.target.value)} placeholder="-2"/>
                    </div>
                    <div className="input-box">
                        <label >b</label>
                        <input value={b} onChange={(e)=>setB(e.target.value)} placeholder="4"/>

                    </div>
                    <div className="input-box">
                        <label >Tolerance</label>
                        <input value={tolerance} onChange={(e)=>setTolerance(e.target.value)} placeholder="0.000001" />
                    </div>

                </div>
            </div>
            

        </div>

        <button className="confirm" onClick={CalComsim}>Confirm</button>

        { result.length >0 && (
            <div className="graph-container">
                <h2>Graph : Error vs Iteration</h2>
                <Plot 
                data={[
                    {
                        x:result.map(r=>r.iteration),
                        y:result.map(r=>parseFloat(r.error)),
                            type:"scatter",
                            mode:"lines+markers",
                            marker: {color:"red"},
                            name: "Error vs Iteration"
                    }
                ]}
                layout={{
                    width:700,
                    height:400,
                    title: "Graph of Error vs Iteration",
                    xaxis:{title: "Iteration"},
                    yaxis:{title : "Error",type:"log"}
                }}
                />
            </div>
        )}
        
        <div className="Result">Result</div>

        <table>
            <thead>
                <tr>
                    <th>Iteration</th>
                    <th>F(x)</th>
                    <th>Error</th>
                </tr>
            </thead>
            <tbody>
                {result.map((row,idx)=>(
                    <tr key ={idx}>
                        <td>{row.iteration}</td>
                        <td>{row.I}</td>
                        <td>{row.error}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
    
}
export default Com_Sim