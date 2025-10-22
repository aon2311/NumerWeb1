import Navbar from "../../Components/Narbar/Navbar"
import { useState } from "react"
import { evaluate } from "mathjs";
import "./Sim.css"
import Plot from "react-plotly.js";

function Sim() {
    const [fx,setFx] = useState("(x^7)+(2*x^3)-1")
    const [a,setA] = useState ("-1")
    const [b,setB] = useState("2")
    const [tolerance,setTolerance] = useState("0.000001")
    const [result,setResult] = useState([]) 
    
    const f=(x)=>evaluate(fx,{x})

    const IntegrateFx=(a,b)=>{
        const h=(b-a)/2
        let sum = f(a) +(f(a+h)*4)+ f(b)
        return (h/3) *sum
    }

    const Integrate=(a,b,step=10000)=>{
        const h= (b-a)/step
        let xx = 0
        for(let i = 1 ;i<step;i++){
            const x0=a+(i*h)
            
            const xt= i%2===0 ? 2:4
            xx+=xt*f(x0)
        }
        return h/3 * xx

    }
    const CalSim =()=>{
        let A =parseFloat(a)
        let B =parseFloat(b)
        let Tol = parseFloat(tolerance)

        if (isNaN(A)||isNaN(B)||isNaN(Tol||a==""||b==""||tolerance=="")) {
            alert ("Please fill all information")
            return;
        }

        let iteration = 0
        let error = 1
        let I_tr = Integrate(A,B)
        const logs=[]

        
        let I=IntegrateFx(A,B)
        error = Math.abs((I_tr-I)/I_tr)
            
        logs.push({
            I:I.toFixed(6),
            I_tr:I_tr.toFixed(6),
            A:A.toFixed(6),
            B:B.toFixed(6),
            error:error.toFixed(tolerance.length-2)||"N/A",
        })
             
        
        setResult(logs)
    }

    return (
        <>
            <Navbar/>
            <div className="Sim"><h1>Simpson Rule's</h1> </div>
            <div className="Container">
                <div className="input-container">
                    <div className="function-group">
                        <label >Function f(x):</label>
                        <input className="wide-input" value={fx} onChange={(e)=>setFx(e.target.value)} />
                    </div>
                    <div className="parameter-group">
                        <div className="input-box">
                            <label >a</label>
                            <input value={a} onChange={(e)=>setA(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label >b</label>
                            <input value={b} onChange={(e)=>setB(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label >Tolerance</label>
                            <input value={tolerance} onChange={(e)=>setTolerance(e.target.value)} />
                        </div>
                    </div>

                </div>

            </div>

            <button className="confirm" onClick={CalSim}>Confirm</button>

            <div className="Result"><h2>Result</h2></div>
            <table>
                <thead>
                    <tr>
                        <th>Integrate True</th>
                        <th>F(x)</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((row,idx)=>(
                        <tr key ={idx}>
                            <td>{row.I_tr}</td>
                            <td>{row.I}</td>
                            <td>{row.error}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {result.length >0 &&(
                <div className="graph-container">
                    <Plot
                        data={[
                                {
                                x: Array.from({ length: 1000 }, (_, i) => {
                                    const A = parseFloat(a);
                                    const B = parseFloat(b);
                                    const step = (B - A) / 999;
                                    return A + i * step;
                                }),
                                y: Array.from({ length: 1000 }, (_, i) => {
                                    const A = parseFloat(a);
                                    const B = parseFloat(b);
                                    const step = (B - A) / 999;
                                    const xVal = A + i * step;
                                    try {
                                        return f(xVal);
                                    } catch (error) {
                                        return 0;
                                    }
                                }),    
                                    type: "scatter",
                                    mode: "lines",
                                    fill: "tozeroy",
                                    fillcolor: "rgba(255, 99, 132, 0.4)",
                                    line: { color: "red" },
                                    name: "f(x)",
                                    }
                            ]}
                        layout={(
                            {
                                width : "700",
                                height : "400",
                                title :"Integrate True vs A-B",
                                xaxis :{title : "Integrate True"},
                                yaxis :{title : "Integrate "},
                            }
                        )}
                    />
                </div>
            )}

            



        </>
    )
}

export default Sim