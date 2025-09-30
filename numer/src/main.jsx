import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import './index.css'
import App from './App.jsx'

import History from './Components/History/History.jsx';

import Bisec from './NumerCode/Root/Bisec.jsx';
import False from './NumerCode/Root/False.jsx';
import Graph from './NumerCode/Root/Graph.jsx';
import Newton from './NumerCode/Root/Newton.jsx';
import One from './NumerCode/Root/One.jsx';
import Secant from './NumerCode/Root/Secant.jsx';

import Conju from './NumerCode/Linear/Conju.jsx';
import Cramer from './NumerCode/Linear/Cramer.jsx';
import G_eli from './NumerCode/Linear/G_eli.jsx';
import G_jor from './NumerCode/Linear/G_jor.jsx';
import Jacobi from './NumerCode/Linear/Jacobi.jsx';
import Lu from './NumerCode/Linear/Lu.jsx';
import Matrix from './NumerCode/Linear/Matrix.jsx';

import Lag from './NumerCode/Interpo/Lag.jsx';
import Newton_I from './NumerCode/Interpo/Newton_I.jsx';
import Spline from './NumerCode/Interpo/Spline.jsx';

import Com_Trap from './NumerCode/Integra/Com_Trap.jsx';
import Com_sim from './NumerCode/Integra/Com_Sim.jsx';
import Trap from './NumerCode/Integra/Trap.jsx';
import Sim from './NumerCode/Integra/Sim.jsx';

import Multi from './NumerCode/Extrapo/Multi.jsx';
import Simple from './NumerCode/Extrapo/Simple.jsx';

import Diff from './NumerCode/Diff/Diff.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/NumerCode/Root/Bisec" element={<Bisec />} />
        <Route path="/NumerCode/Root/False" element={<False />} />
        <Route path="/NumerCode/Root/Graph" element={<Graph />} />
        <Route path="/NumerCode/Root/Newton" element={<Newton />} />
        <Route path="/NumerCode/Root/One" element={<One />} />
        <Route path="/NumerCode/Root/Secant" element={<Secant />} />

        <Route path="/NumerCode/Linear/Cramer" element={<Cramer />} />
        <Route path="/NumerCode/Linear/Conju" element={<Conju />} />
        <Route path="/NumerCode/Linear/G_eli" element={<G_eli />} />
        <Route path="/NumerCode/Linear/G_jor" element={<G_jor />} />
        <Route path="/NumerCode/Linear/Matrix" element={<Matrix />} />
        <Route path="/NumerCode/Linear/Lu" element={<Lu />} />
        <Route path="/NumerCode/Linear/jacobi" element={<Jacobi />} />

        <Route path="/NumerCode/Interpo/Lag" element={<Lag />} />
        <Route path="/NumerCode/Interpo/Newton_I" element={<Newton_I />} />
        <Route path="/NumerCode/Interpo/Spline" element={<Spline />} />

        <Route path="/NumerCode/Integra/Trap" element={<Trap />} />
        <Route path="/NumerCode/Integra/Sim" element={<Sim />} />
        <Route path="/NumerCode/Integra/Com_Trap" element={<Com_Trap />} />
        <Route path="/NumerCode/Integra/Com_sim" element={<Com_sim />} />

        <Route path="/NumerCode/Extrapo/Simple" element={<Simple />} />
        <Route path="/NumerCode/Extrapo/Multi" element={<Multi />} />

        <Route path="/NumerCode/Diff/Diff" element={<Diff />} />

        <Route path="/Component/History/History" element={<History />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
