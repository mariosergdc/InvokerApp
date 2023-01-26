import React from 'react';
import InvokerApp from './components/InvokerApp';

function App() {
  return (
    <div className="app">
      <div className="info">
        <p>
          App made by <strong>Mario Sergio Domínguez Consuegra</strong>
        </p>
        <p>mariosergdc.webdev@gmail.com</p>
        <a href="https://www.linkedin.com/in/mario-domínguez-consuegra-460609248/">
          https://www.linkedin.com/in/mario-domínguez-consuegra-460609248/
        </a>
      </div>
      <InvokerApp />
    </div>
  );
}

export default App;
