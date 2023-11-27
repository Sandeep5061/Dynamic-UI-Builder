



import React from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainPage from './Components/MainPage';
import DragDrop from './Components/DragDrop';
import ViewTemplates from './Components/ViewTemplates';
import RadioButtons from './Components/RadioButtons';
import ViewComboTemp from './Components/ViewComboTemp'
import ViewIndivisualTempData from './Components/ViewIndivisualTempData';
import GroupedDataComponent from './Components/GroupedDataComponent';
import ViewDataComponent from './Components/ViewDataComponent';
// import UpdateTemplateData from './Components/UpdateTemplateData';

function App() {
  return (
    
    <DndProvider backend={HTML5Backend}>
      <div className="App"> {/* Apply className here */}
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/create" element={<DragDrop />} />
            <Route path="/view" element={<ViewTemplates />} />
            <Route path="/viewcombo" element={<ViewComboTemp/>}/>
            <Route path="/tempdataind" element ={<ViewIndivisualTempData/>}/>
            <Route path="/view/:commonTemplateName" element={<ViewDataComponent />} />

          </Routes>
        </Router>
      </div>
    </DndProvider>
    
    
  );
}

export default App;



{/* <Route path="/" exact component={ViewIndivisualTempData} />
        <Route path="/view" exact component={GroupedDataComponent} />
        <Route path="/view/:commonTemplateName" component={ViewDataComponent} /> */}



// import {DndProvider} from "react-dnd";
// import {HTML5Backend} from "react-dnd-html5-backend"
// import './Styles/App.css';
// import DragDrop from "./Components/DragDrop";
// import Header from "./Components/Header";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import MainPage from './MainPage';
// // import DragDrop from './DragDrop';
// // import ViewTemplates from './ViewTemplates';


// function App() {
//   return (
//     <DndProvider backend = {HTML5Backend}>
//       <div className="App">
//         <Header/>
//         <DragDrop/>
//      </div>
//     </DndProvider>
    
//   );
// }

// export default App;