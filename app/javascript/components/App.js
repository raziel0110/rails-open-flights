import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Airline from "./Airline/Airline";
import Airlines from "./Airlines/Airlines";

const App = () => {
    return (
        
        <Router>
            <Routes>
                <Route exact path="/" element={<Airlines />} />
                <Route exact path={"/airlines/:slug"} element={<Airline />} />
            </Routes>
        </Router>
    )
}

export default App;