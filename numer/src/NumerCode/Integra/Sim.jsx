import Navbar from "../../Components/Narbar/Navbar"
import { useState } from "react"
import { evaluate } from "mathjs"
import "./Sim.css"

function Sim() {
    const [fx, setFx] = useState("")
    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [n, setN] = useState("")
    const [tolerance, setTolerance] = useState("0.000001")
    const [result, setResult] = useState([])

    const f = (x) => evaluate(fx, { x })

    const IntegrateFx = (f, a, b, n) => {
        const h = (b - a) / n
        let sum = f(a) + f(b)

        for (let i = 1; i < n; i++) {
            const x = a + i * h
            if (i%2==0) {
                sum=sum+(2*f(x))
            }
            else if(i%2==1){
                sum=sum+(4*f(x))
            }
            
        }

        return (h / 3) * sum;
    };

    const CalSim = () => {
        let A = parseFloat(a)
        let B = parseFloat(b)
        let N = parseInt(n)
        let Tol = parseFloat(tolerance)

        if (
            isNaN(A) || isNaN(B) || isNaN(N) ||
            a === "" || b === "" || tolerance === "" || n === ""
        ) {
            alert("Please fill all information.")
            return;
        }

        if (N % 2 !== 0) {
           alert("N must be an even number.")
           return;
        }

        let iteration = 0
        let error = 1
        let I_old = 0
        const logs = []

        while (error > Tol) {
            const I_new = IntegrateFx(f, A, B, N)
            error =Math.abs((I_new - I_old) / I_new)

            logs.push({
                iteration: iteration,
                A: A.toFixed(6),
                B: B.toFixed(6),
                I_new: I_new.toFixed(6),
                error:  error.toFixed(tolerance.length - 2)||"N/A",
            })

            

            I_old = I_new
            iteration++
            N=N+2
            if (iteration > 1000){
                break
            } 
        }

        setResult(logs);
    };

    return (
        <>
            <Navbar />
            <div className="Sim"><h1>Simpson's Rule</h1></div>
            <div className="Container">
                <div className="function-group">
                    <label>Function f(x)</label>
                    <input value={fx} onChange={(e) => setFx(e.target.value)} />
                </div>
                <div className="input-container">
                    <div className="input-box">
                        <label>N (even number)</label>
                        <input value={n} onChange={(e) => setN(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label>a</label>
                        <input value={a} onChange={(e) => setA(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label>b</label>
                        <input value={b} onChange={(e) => setB(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label>Tolerance</label>
                        <input
                            value={tolerance}
                            onChange={(e) => setTolerance(e.target.value)}
                            placeholder="0.000001"
                        />
                    </div>
                </div>
            </div>

            <button className="confirm" onClick={CalSim}>Confirm</button>

            <div className="result">Result</div>
            <table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>Integral Value</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.iteration}</td>
                            <td>{row.I_new}</td>
                            <td>{row.error}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Sim;
