import Navbar from "../../Components/Narbar/Navbar";
import "./Diff.css"
import {useState} from "react"
import { count, evaluate,row } from "mathjs";



function Diff () {

    const [fx,setFx] =useState ("e^e")
    const [x,SetX] =useState ("2.0")
    const [h,setH] = useState("0.25")
    const [result,setResult] = useState ([])
    

    const CalDiff =()=>{
        let X=parseFloat(x)
        let H=parseFloat(h)

        if(isNaN(X)||isNaN(H)||x==""||h==""){
            alert ("Please fill in all information")
            return;
        }

        let Xi =X+1
        let FX = 0
        const log =[]
        
        const f=(x)=>evaluate(fx,(x))





    }
    return(
        <>
        <Navbar/>
            <h1>Numerical Differentiation First</h1>
        </>
    )
}
export default Diff;