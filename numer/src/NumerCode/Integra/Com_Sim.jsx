import { useState } from "react";
import {count, evaluate} from "mathjs"
import Navbar from "../../Components/Narbar/Navbar"
import "./Com_Sim.css"
import Plot from "react-plotly.js"

function Com_Sim() {

    const [fx,setFx] =useState("x^2")
    const [n,setN] = useState("6")
    const [a,setA] = useState("-2")
    const [b,setB] =useState("4")
    const [tolerance,setTolerance] =useState("0.000001")
    const [xi,setXi] =useState([])
    const [result,setResult] = useState([])

    const f=(x)=>evaluate(fx,{x})

    const Integrate =(a,b,step=1000)=>{
        const h = (b-a)/step
        let sum = f(a)+f(b)
        for(let i=1;i<step;i++){
            
            const x0=a+(i*h)
            if (x0 > b) break
            const x1 = x0+h
            const xh = (x0+x1)/2
            sum+=4*f(xh)
        }
        return h/3*sum
    }

    const IntegrateFx = (a, b, n) => {
        const h = (b - a) / (2*n)
        let sum = f(a) + f(b)  

        const xip = [];
        xip.push({ i: 0, x: a, fx: f(a), weight: 1 })

        for (let i = 1; i < n; i++) {
            const x = a + i * h
            const fxi = f(x)
            const weight = i % 2 === 0 ? 2 : 4  
            sum += weight * fxi
            xip.push({ i, x, fx: fxi, weight })
        }

        xip.push({ i: n, x: b, fx: f(b), weight: 1 })

        setXi(xip)

        return (h / 3) * sum
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
        let I_T=Integrate(A,B)
        let Nt= N
        const logs=[]

        while (error>Tol) {
            if(N === Nt){
                const I = IntegrateFx(A,B,N)
            }
            
            
            error = Math.abs((I_T-I)/I_T)
            
            

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
            if(iteration>100){
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
                    <th>i</th>
                    <th>xᵢ</th>
                    <th>f(xᵢ)</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {xi.map((row,idx)=>(
                    <tr key ={idx}>
                        <td>{row.i}</td>
                        <td>{row.x.toFixed(6)}</td>
                        <td>{row.fx.toFixed(6)}</td>
                        <td>{row.weight}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="3"><strong>Approximate ∫ f(x) dx</strong></td>
                    <td><strong>{result.length > 0 ? result[result.length - 1].I : "N/A"}</strong></td>
                </tr>
            </tbody>
        </table>
        </>
    )
    
}
export default Com_Sim