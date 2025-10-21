import Navbar from "../../Components/Narbar/Navbar"
import { useState } from "react"
import { evaluate } from "mathjs";
import "./Sim.css"

function Sim() {
    const [fx,setFx] = useState("x^2")
    const [a,setA] = useState ("-2")
    const [b,setB] = useState("4")
    const [tolerance,setTolerance] = useState("0.000001")
    const [result,setResult] = useState([]) 
    
    const f=(x)=>evaluate(fx,{x})

    const IntegrateFx=(a,b)=>{
        const h=(b-a)/2
        let sum = f(a) +(4*f(h))+ f(b)
        return (h/3) *sum
    }

    const Integrate=(a,b,step=1000)=>{
        const h= (b-a)/step
        let xx = f(a)+f(b)
        for(let i = 1 ;i<step;i++){
            const x0=a+(i*h)
            const  x1=x0+h
            const xh=(x1+x0)/2
            xx+=4*f(xh)
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

        if (error>iteration) {
            let I=IntegrateFx(A,B)
            error = Math.abs((I_tr-I)/I_tr)
            
            logs.push({
                I:I.toFixed(6),
                error:error.toFixed(tolerance.length-2)||"N/A",
            })
             
        }
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

            <table>
                <thead>
                    <tr>
                        <th>F(x)</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((row,idx)=>(
                        <tr key ={idx}>
                            <td>{row.I}</td>
                            <td>{row.error}</td>
                        </tr>
                    ))}
                </tbody>
            </table>




        </>
    )
}

export default Sim