import Navbar from "../../Components/Narbar/Navbar"
import {evaluate} from "mathjs"
import { useState } from "react"
import "./Trap.css"

function Trap() {

    const [fx,setFx] = useState("x^2")
    const [a,setA] = useState("-2")
    const [b,setB] = useState("4")
    const [tolerance,setTolerance] = useState ("0.000001")
    const [result,setResult] = useState([])

    const f=(x)=>evaluate(fx,{x})

    const Integrate=(a,b,step=1000)=>{
        const h=(b-a) /step
        let sum = f(a)+f(b)

        for(let i=1;i<step;i++){
            const x0=a+(i*h)
            const x1=x0+h
            const xh=(x0+x1)/2
            sum+=2*f(xh)
        }
        return h/2*sum
    }

    const IntegrateFx=(a,b)=>{
        const h=b-a
        let sum =f(a)+f(b)
        return h/2*sum
    }

    const CalTrap = ()=>{
        let A = parseFloat(a)
        let B = parseFloat(b)
        let Tol = parseFloat(tolerance)

        if(isNaN(A)||isNaN(B)||isNaN(Tol)||a==""||b==""||tolerance==""){
            alert ("Please fill all information")
        }

        let error = 1
        let I_t =Integrate(A,B)
        const logs=[]

        let I =IntegrateFx(A,B)
        error = Math.abs((I_t-I)/I_t)

        logs.push({
            I:I.toFixed(6),
            error:error.toFixed(tolerance.length-2)||"N/A",
        })

        setResult(logs)
    }

    return (
        <>
            <Navbar/>
            <div className="Trap"><h1>Trapezoidal Rule's</h1></div>
            <div className="Container">
                <div className="input-container">
                    <div className="function-group">
                        <label>Function F(x):</label>
                        <input className="wide-input" value={fx} onChange={(e)=>setFx(e.target.value)} />
                    </div>
                    <div className="parameter-group">
                        <div className="input-box">
                            <label >a</label>
                            <input value={a} onChange={(e)=>setA(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label >b</label>
                            <input value={b} onChange={(e) =>setB(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>Tolerance</label>
                            <input value={tolerance} onChange={(e)=>setTolerance(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <button className="confirm" onClick={CalTrap}>Confirm</button>

            <div className="Result"><h3>Result</h3></div>
            <table>
                <thead>
                    <tr>
                        <th>F(x)</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((row,idx)=>(
                        <tr key={idx}>
                            <td>{row.I}</td>
                            <td>{row.error}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
    
}
export default Trap