import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // << import CSS ที่สร้างไว้

function App() {
  const [mainTopic, setMainTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const navigate = useNavigate();

  const handleMainChange = (event) => {
    setMainTopic(event.target.value);
    setSubTopic('');
  };

  const handleSubChange = (event) => {
    const selectedSub = event.target.value;
    setSubTopic(selectedSub);
    if (selectedSub) {
      navigate(selectedSub);
    }
  };

  let subOptions = [];
  if (mainTopic === 'Root') {
    subOptions = [
      { label: 'Graphical methods', path: '/NumerCode/Root/Graph' },
      { label: 'Bisection Search', path: '/NumerCode/Root/Bisec' },
      { label: 'False-Position Method', path: '/NumerCode/Root/False' },
      { label: 'One-Point Iteration Method', path: '/NumerCode/Root/One' },
      { label: 'Newton-Raphson Method', path: '/NumerCode/Root/Newton' },
      { label: 'Secant Method', path: '/NumerCode/Root/Secant' }
    ];
  } else if (mainTopic === 'Linear') {
    subOptions = [
      { label: "Cramer's Rule", path: '/NumerCode/Linear/Cramer' },
      { label: 'Guass Elimination', path: '/NumerCode/Linear/G_eli' },
      { label: 'Guass Jordan Elimination', path: '/NumerCode/Linear/G_jor' },
      { label: 'Matrix Inversion', path: '/NumerCode/Linear/Matrix' },
      { label: 'LU Deconposition Methods', path: '/NumerCode/Linear/Lu' },
      { label: 'Jacobi Iteration Methods', path: '/NumerCode/Linear/Jacobi' },
      { label: 'Conjugate Gradient', path: '/NumerCode/Linear/Con' }
    ];
  } else if (mainTopic === 'Interpolation') {
    subOptions = [
      { label: 'Newton Divided-Differences', path: '/NumerCode/Interpo/Newton_I' },
      { label: 'Lagrange Interpolation', path: '/NumerCode/Interpo/Lag' },
      { label: 'Spline Interpolation', path: '/NumerCode/Interpo/Spline' }
    ];
  } else if (mainTopic === 'Extrapolation') {
    subOptions = [
      { label: 'Simple Regression Extrapolation', path: '/NumerCode/Extrapo/Simple' },
      { label: 'Multiple Regression Extrapolation', path: '/NumerCode/Extrapo/Multi' },
    ];
  } else if (mainTopic === 'Integration') {
    subOptions = [
      { label: 'Single Trapezoidal Rule', path: '/NumerCode/Integra/Trap' },
      { label: "Single Simpson's Rule", path: '/NumerCode/Integra/Sim' },
      { label: 'Composite Trapezoidal Rule', path: '/NumerCode/Integra/Com_Trap' },
      { label: "Composite Simpson's Rule", path: '/NumerCode/Integra/Com_Sim' },
    ];
  } else if (mainTopic === 'Diff') {
    subOptions = [
      { label: 'Numerical Differentiation', path: '/NumerCode/Diff/Diff' }
    ];
  }

  return (
    <div className="app-container">
      <div className='Numer'><h1>Numerical Project</h1></div>

      <div className="app-box">
        <select
          value={mainTopic}
          onChange={handleMainChange}
          className="app-select"
        >
          <option value="">Choose One ▼</option>
          <option value="Root">Root of Equation</option>
          <option value="Linear">Linear Algebra Equation</option>
          <option value="Interpolation">Interpolation</option>
          <option value="Extrapolation">Extrapolation</option>
          <option value="Integration">Integration</option>
          <option value="Diff">Numerical Differentiation</option>
        </select>

        <select
          value={subTopic}
          onChange={handleSubChange}
          disabled={!mainTopic}
          className="app-select"
        >
          <option value="">{mainTopic ? 'Choose One Again ▼' : 'Please select a main topic first.'}</option>
          {subOptions.map((sub, index) => (
            <option key={index} value={sub.path}>{sub.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
