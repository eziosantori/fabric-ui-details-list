import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import logo from './logo.svg';
import './App.css';
import { FiltersTest } from './containers/FiltersTest';

initializeIcons();

const App: React.FC = () => {
  return (
    <div className="App">
      <header>

      </header>
      <main>
        <FiltersTest />
      </main>
      
    </div>
  );
}

export default App;
