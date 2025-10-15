import Navbar from "../../Components/Narbar/Navbar";
import "./Secant.css"
import {useState} from "react"
import { evaluate,row } from "mathjs";


function Secant() {
    const [fx,setFx] = useState()
    const [x0,setX0] = useState()
    const [x1,setX1] = useState()
    const [tolerance,setTolerance] = useState("0.000001")
    const [result,setResult] = useState([])
    
    const CalSecant=()=>{
        let X0=parseFloat(xo)
        let X1=parseFloat(X1)
        let Tol=parseFloat(tolerance)

        if(isNaN(X0)||isNaN(X1)||isNaN(Tol)||x0==""||x1==""||tolerance==""){
            alert("Please fill in all information")
        }

        let Xi=0
        let error =1
        let iteration =1
        let FX0 =0
        let FX1 =0
        const logs=[]
    }

    return(
        <>
        <Navbar/>
        <h1>Secant methods</h1>
        
        </>
    )
}
export default Secant;