import React from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainPage from './Components/MainPage';
import DragDrop from './Components/DragDrop';
import ViewTemplates from './Components/ViewTemplates';
import ViewComboTemp from './Components/ViewComboTemp';
import ViewIndivisualTempData from './Components/ViewIndivisualTempData';
import ViewDataComponent from './Components/ViewDataComponent';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/create" element={<DragDrop />} />
            <Route path="/view" element={<ViewTemplates />} />
            <Route path="/viewcombo" element={<ViewComboTemp />} />
            <Route path="/tempdataind" element={<ViewIndivisualTempData />} />
            <Route path="/view/:commonTemplateName" element={<ViewDataComponent />} />
          </Routes>
        </Router>
      </div>
    </DndProvider>
  );
}

export default App;
