import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';


const App = () => {

  return (
    <div className="app">
      <Sidebar />
      <MainContent/>
    </div>
  );
};

export default App;
