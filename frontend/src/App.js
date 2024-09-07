import React, { useMemo, useState } from "react";
import styled from "styled-components";
import bg from "./img/bg.jpg";
import { MainLayout } from "./styles/Layout";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import Dashboard from "./components/Dashboard/Dashboard";
import Laporan from "./components/Laporan/Laporan"
import { useGlobalContext } from "./context/globalContext";
import Login from "./components/Login/Login";
import InputData from "./components/InputData/Input";
import DataAnggota from "./components/DataAnggota/Data"

function App() {
  const [active, setActive] = useState(1);
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expenses />;
      case 4:
        return <InputData/>;
      case 5:
        return <DataAnggota/>;
      case 6:
          return <Laporan/>;
      default:
        return <Dashboard />;
    }
  };
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
  height: 100vh
  background-image: url(${(props) => props.bg})
  postition: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
  `;

export default App;
