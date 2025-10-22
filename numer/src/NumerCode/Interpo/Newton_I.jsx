import { useState } from "react"
import Navbar from "../../Components/Narbar/Navbar"
import Plot from "react-plotly.js"

function Newton_I() {
    const [n, setN] = useState("")
    const [xi, setXi] = useState([])
    const [yi, setYi] = useState([])
    const [x, setX] = useState("0")
    const [tolerance, setTolerance] = useState("0.000001")
    const [result, setResult] = useState([])
    const [fx, setFx] = useState(null)
    const [singleError, setSingleError] = useState(null)

    const handleNChange = (e) => {
        const size = parseInt(e.target.value)
        setN(size)
        setXi(Array(size).fill(""))
        setYi(Array(size).fill(""))
        setResult([])
        setFx(null)
    };

    const handleXi = (i, v) => {
        const newXi = [...xi]
        newXi[i] = v
        setXi(newXi)
    };

    const handleYi = (i, v) => {
        const newYi = [...yi]
        newYi[i] = v
        setYi(newYi)
    };

    const CalNewton_I = () => {
        const size = parseInt(n)
        const Xi = xi.map(Number)
        const Yi = yi.map(Number)
        const X = parseFloat(x)
        const Tol = parseFloat(tolerance)

        if (Xi.some(isNaN) || Yi.some(isNaN) || isNaN(X) || isNaN(size) || isNaN(Tol) || xi.length === 0 || yi.length === 0) {
            alert("Please fill all information correctly.")
            return;
        }

        let divi = Array(size).fill(null).map(() => [])
        for (let i = 0; i < size; i++) {
            divi[i][0] = Yi[i]
        }
        for (let j = 1; j < size; j++) {
            for (let i = 0; i < size - j; i++) {
                divi[i][j] = (divi[i + 1][j - 1] - divi[i][j - 1]) / (Xi[i + j] - Xi[i])
            }
        }

        let fxV = divi[0][0];
        for (let i = 1; i < size; i++) {
            let term = divi[0][i]
            for (let j = 0; j < i; j++) {
                term *= (X - Xi[j])
            }
            fxV += term
        }
        setFx(fxV)
        let logs = []
        let minX = Math.min(...Xi)
        let maxX = Math.max(...Xi)
        let step = (maxX - minX) / 50



        for (let xx = minX; xx <= maxX; xx += step) {
            let px = divi[0][0]
            for (let i = 1; i < size; i++) {
                let term = divi[0][i]
                for (let j = 0; j < i; j++) {
                    term *= (xx - Xi[j])
                }
                px += term
            }

            const index = Xi.findIndex(v => v === X)
            if (index !== -1) {
                const realY = Yi[index]
                const err = Math.abs((realY - fxV) / realY)
                setSingleError(err)
            } else {
                setSingleError(null)
            }

            const error = Math.abs(fxV) < 1e-12 ? 0 : Math.abs((fxV - px) / fxV)

            logs.push({
                x: xx,
                px,
                fx: fxV, 
                error,
            })
        }

        setResult(logs)
    };

    return (
        <>
            <Navbar />
            <div className="Newton"><h1>Newton Divided-Differences</h1></div>

            <div className="Container">
                <div className="input-container">
                    <div className="parameter-group">
                        <div className="input-box">
                            <label>N</label>
                            <input type="number" value={n} onChange={handleNChange} />
                        </div>
                        <div className="input-box">
                            <label>X</label>
                            <input value={x} onChange={(e) => setX(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label>Tolerance</label>
                            <input value={tolerance} onChange={(e) => setTolerance(e.target.value)} />
                        </div>
                    </div>

                    {n && (
                        <div className="parameter-input">
                            <div className="input-box">
                                <label>Xi</label>
                                {xi.map((val, i) => (
                                    <input key={i} value={val} onChange={(e) => handleXi(i, e.target.value)} />
                                ))}
                            </div>
                            <div className="input-box">
                                <label>Yi</label>
                                {yi.map((val, i) => (
                                    <input key={i} value={val} onChange={(e) => handleYi(i, e.target.value)} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button className="confirm" onClick={CalNewton_I}>Confirm</button>

            {fx !== null && (
                <div className="result">
                    <h2>Result at X = {x}</h2>
                    <p><strong>F({x}) ≈ {fx.toFixed(6)}</strong></p>,
                    {singleError !== null && (
                        <p><strong>Error ≈ {singleError.toExponential(6)}</strong></p>
                    )}
                </div>
            )}

            {result.length > 0 && (
                <>
                    <div className="graph-container">
                        <h2>Graph: P(x) </h2>
                        <Plot
                            data={[
                                {
                                    x: result.map(r => r.x),
                                    y: result.map(r => r.px),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    name: "P(x)",
                                    line: { color: "red", dash: "dot" }
                                },
                                {
                                    x: result.map(r => r.x),
                                    y: result.map(r => r.fx),
                                    type: "box",
                                    mode: "lines+markers",
                                    name: "F(x)",
                                    line: { color: "blue", dash: "dot" }
                                }

                            ]}
                            layout={{
                                width: 700,
                                height: 400,
                                title: "Newton’s Interpolation Method",
                                xaxis: { title: "x" },
                                yaxis: { title: "y" }
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default Newton_I;
