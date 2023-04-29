import Header from "./components/Header";
import Cards from "./components/Cards";
import {Route, Routes} from 'react-router-dom';
import AddSeries from './components/AddSeries';
import Detail from "./components/Detail";
import { createContext,useContext, useState } from "react";
import Login from "../src/components/Login";
import Signup from "./components/Signup";

const AppState=createContext();

function App() {
  const [login,setLogin]=useState(false);
  const [userName,setUserName]=useState("");
  return (
    <AppState.Provider value={{login,userName,setLogin,setUserName}}>
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addseries" element={<AddSeries />} />
        <Route path='/details/:id' element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};
