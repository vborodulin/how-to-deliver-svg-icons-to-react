import React from 'react';

import * as icons from './components/Icons';

import './App.css';

/**
 * Show all imported icons in different si
 * @return {*}
 * @constructor
 */
function App() {
  return (
    <div className="App">
      <h1>
        Hot to automate delivery SVG icons from Figma to React using Figma API
      </h1>

      <div className="all-you-imported-icons">
        {Object.values(icons).map((IconComponent) => (
          <IconComponent color="light" size="100" key={IconComponent.name} />
        ))}

        {Object.values(icons).map((IconComponent) => (
          <IconComponent color="dark" size="200" key={IconComponent.name} />
        ))}

        {Object.values(icons).map((IconComponent) => (
          <IconComponent color="accent" size="300" key={IconComponent.name} />
        ))}
      </div>
    </div>
  );
}

export default App;
