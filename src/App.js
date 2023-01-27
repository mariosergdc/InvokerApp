import React, { useState } from 'react';
import Help from './components/Help';
import InvokerApp from './components/InvokerApp';

function App() {
  const [openHelp, setOpenHelp] = useState(false);
  return (
    <div className="app">
      {openHelp && (
        <div className="info">
          <p>
            App made by <strong>Mario Sergio Domínguez Consuegra</strong>
          </p>
          <p>mariosergdc.webdev@gmail.com</p>
          <a href="https://www.linkedin.com/in/mario-domínguez-consuegra-460609248/">
            linkedin: mario-domínguez-consuegra
          </a>
        </div>
      )}
      <button className="help-button" onClick={() => setOpenHelp(!openHelp)}>
        help???
      </button>
      <Help openHelp={openHelp} />
      <InvokerApp />
    </div>
  );
}

export default App;
