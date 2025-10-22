import Navbar from "../../Components/Narbar/Navbar";
import "./Bisec.css"
import { useState, useEffect } from "react";
import { evaluate, row } from "mathjs";
import Plot from "react-plotly.js";


function Bisec () {
    
    const [fx,setFx] = useState("x^4 - 13")
    const [xl,setXl] = useState("1.5")
    const [xr,setXr] =useState("2.0")
    const [tolerance,setTolerance] =useState("0.000001")
    const [result,setResult]= useState([])
    const [problems, setProblems] = useState([])
    const [saveStatus, setStatus] = useState("")

    useEffect(() => {
        fetch("http://localhost:8081/api/bisection")
        .then((res) => res.json())
        .then((data) => {
            setProblems(data);
            if (data.length > 0) {
            const problem = data[0];
            setFx(problem.fx);
            setXl(problem.xl.toString());
            setXr(problem.xr.toString());
            setTolerance(problem.tolerance.toString());
            }
        })
        .catch((err) => console.error("Error fetching problems:", err));
    }, []);

    const saveProblem = () => {
        fetch("http://localhost:8081/api/bisection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fx: fx,
                xl: parseFloat(xl),
                xr: parseFloat(xr),
                tolerance: parseFloat(tolerance),
            }),
        })
            .then(res => res.json())
            .then(data => {
            setStatus(data.message);
            })
            .catch(err => {
            setStatus("Failed to save problem.");
            console.error(err);
            });
        };


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
            const fxm=f(XM)

            if(iteration >0){
                error = Math.abs ((XM-old_XM)/XM)
            }

            logs.push({
                iteration: iteration,
                XL: XL.toFixed(6),
                XR: XR.toFixed(6),
                XM: XM.toFixed(6),
                fxm:f(XM).toFixed(6),
                error: error.toFixed(tolerance.length-2)||"N/A",
            })

            if(fxm*f(XR)>0){
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


    }



    return (
    <>
        <div><Navbar /></div>
        <div className="Bisec"><h1>Bisection</h1></div>

        <div className="Container">
            <div className="input-container">
                <div className="function-group">
                    <label>Function f(x)</label>
                    <input className="wide-input" value={fx} onChange={(e) => setFx(e.target.value)} placeholder="x^4 - 13" />
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

        <button className="confirm" onClick={CalBisec} >Confirm</button>
        <button className="save" onClick={saveProblem}>Save Problem</button>

        {saveStatus && (
            <div className={`save-status ${saveStatus.includes("Failed") ? "error" : "success"}`}>
                {saveStatus}
            </div>
        )}

        {result.length > 0 && (
        <div className="graph-container">
            <h2>Graph: Error vs Iteration</h2>
            <Plot
            data={[
                {
                x: result.map(r => r.iteration),
                y: result.map(r => parseFloat(r.error)),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "red" },
                    name: "Error vs Iteration"
                    }
                ]}
                layout={{
                    width: 700,
                    height: 400,
                    title: "Graph of Error vs Iteration",
                    xaxis: { title: "Iteration" },
                    yaxis: { title: "Error", type: "log" }
                }}
                />
            </div>
            )}


        

        <div className="Result"><h2>Result</h2></div>
        <table>
        <thead>
            <tr>
            <th>Iteration</th>
            <th>XM</th>
            <th>f(XM)</th>
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
                <td>{row.fxm}</td>
                <td>{row.XL}</td>
                <td>{row.XR}</td>
                <td>{row.error}</td>
            </tr>
            ))}
        </tbody>
        </table>

            <div className="problems-container">
                <h1>Bisection Problems</h1>
                {problems.map(problem => (
                    <div key={problem.id} className="problem-item">
                    <p><strong>Function:</strong> {problem.fx}</p>
                    <p><strong>XL:</strong> {problem.xl}</p>
                    <p><strong>XR:</strong> {problem.xr}</p>
                    <p><strong>Tolerance:</strong> {problem.tolerance}</p>
                    <p><strong>Date:</strong> {new Date(problem.date).toLocaleString()}</p>
                    </div>
                ))}
                </div>
    </>

    
    );
}
export default Bisec;