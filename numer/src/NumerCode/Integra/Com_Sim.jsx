import { useState } from "react"
import { evaluate } from "mathjs"
import Navbar from "../../Components/Narbar/Navbar"
import "./Com_Sim.css"
import Plot from "react-plotly.js"

function Com_Sim() {
  const [fx, setFx] = useState("x^2")
  const [n, setN] = useState("6")
  const [a, setA] = useState("-2")
  const [b, setB] = useState("4")
  const [tolerance, setTolerance] = useState("0.000001")
  const [xi, setXi] = useState([]);
  const [result, setResult] = useState([])

  const f=(x)=>evaluate(fx,{x})
  
  const IntegrateFx = (a, b, n) => {
    const h = (b - a) / n
    let sum = f(a) + f(b)
    const xip = []
    xip.push({ i: 0, x: a, fx: f(a), weight: 1 })

    for (let i = 1; i < n; i++) {
      const x = a + i * h
      const fx_val = f(x)
      const weight = i % 2 === 0 ? 2 : 4
      sum += weight * fx_val
      xip.push({ i, x, fx: fx_val, weight })
    }
    xip.push({ i: n, x: b, fx: f(b), weight: 1 })

    return { result: (h / 3) * sum, xip }
  }

  const CalComsim = () => {
    let N = parseInt(n)
    const A = parseFloat(a)
    const B = parseFloat(b)
    const Tol = parseFloat(tolerance)

    if (
      isNaN(N) ||isNaN(A) ||isNaN(B) ||isNaN(Tol) ||a === "" ||b === "" ||n === "" ||tolerance === "") {
      alert("Please fill all information")
      return;
    }

    if (N % 2 !== 0) {
      alert("n must be even")
      return;
    }

    let error = 1
    let iteration = 0
    let logs = []

    let { result: Result, xip: initialXi } = IntegrateFx(A, B, N)

    logs.push({
      iteration,
      n: N,
      I: Result.toFixed(6),
      error: "N/A"
    });

    while (error > Tol && iteration < 20) {
      N += 2
      iteration++

      const { result: nResult } = IntegrateFx(A, B, N)
      error = Math.abs((nResult - Result) / nResult)

      logs.push({
        iteration,
        n: N,
        I: nResult.toFixed(6),
        error: error.toExponential(6)
      });

      Result = nResult
    }

    setXi(initialXi)
    setResult(logs)
  }

  return (
    <>
      <Navbar />
      <div className="Comsim">
        <h1>Composite Simpson's Rule</h1>
      </div>
      <div className="Container">
        <div className="input-container">
          <div className="function-group">
            <label>Function f(x)</label>
            <input className="wide-input" value={fx} onChange={(e) => setFx(e.target.value)} placeholder="x^2"/>
          </div>
          <div className="parameter-group">
            <div className="input-box">
              <label>n</label>
              <input type="number" value={n} onChange={(e) => setN(e.target.value)} placeholder="6"/>
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
      </div>

      <button className="confirm" onClick={CalComsim}> Confirm</button>
       
      

      {result.length > 0 && (
        <div className="graph-container">
            <Plot
                data={[
                    
                    ...xi.reduce((acc, curr, idx, arr) => {
                    if (idx % 2 === 0 && idx + 2 < arr.length) {
                        const start = arr[idx].x;
                        const end = arr[idx + 2].x;
                        const pointsCount = 100; 

                        const xs = Array.from({ length: pointsCount }, (_, i) => start + (i / (pointsCount - 1)) * (end - start));
                        const ys = xs.map(xVal => {
                        try {
                            return f(xVal);
                        } catch {
                            return 0;
                        }
                        });

                        const colors = [
                        "rgba(255, 99, 132, 0.4)",
                        "rgba(54, 162, 235, 0.4)",
                        "rgba(255, 206, 86, 0.4)",
                        "rgba(75, 192, 192, 0.4)",
                        "rgba(153, 102, 255, 0.4)",
                        "rgba(255, 159, 64, 0.4)"
                        ];
                        const color = colors[(idx / 2) % colors.length];

                        acc.push({
                        x: [...xs, xs[xs.length - 1], xs[0]],
                        y: [...ys, 0, 0], 
                        type: "scatter",
                        mode: "lines",
                        fill: "toself",
                        fillcolor: color,
                        line: { color: "rgba(0,0,0,0.3)", width: 1 },
                        name: `Segment ${idx / 2 + 1}`,
                        showlegend: false
                        });
                    }
                    return acc;
                    }, []),

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
                        } catch {
                        return 0;
                        }
                    }),
                    type: "scatter",
                    mode: "lines",
                    line: { color: "black", width: 2 },
                    name: "f(x)"
                    }
                ]}
                layout={{
                    width: 700,
                    height: 400,
                    title: "Composite Simpson's Rule",
                    xaxis: { title: "x" },
                    yaxis: { title: "f(x)" }
                }}
                />

          
        </div>
      )}

      <div className="Result">Result</div>

      <table>
        <thead>
          <tr>
            <th>xᵢ</th>
            <th>f(xᵢ)</th>
          </tr>
        </thead>
        <tbody>
          {xi.map((row, idx) => (
            <tr key={idx}>
              <td>{row.x.toFixed(6)}</td>
              <td>{row.fx.toFixed(6)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="1"><h3><strong>Approximate ∫ f(x) dx</strong></h3></td>
            <td><h3><strong>{result.length > 0 ? result[result.length - 1].I : "N/A"}</strong></h3></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Com_Sim;
