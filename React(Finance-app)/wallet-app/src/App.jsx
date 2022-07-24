import "./App.scss";
import Header from "./Component/Header/Header";
import MainTransactions from "./Pages/Transactions/TransactionsPage";
import styled from "styled-components";

export const Button = styled.button`
  background-color: initial;
  padding: 10px 50px;
  border: 2px solid black;
  cursor: pointer;
  box-shadow: 4px 2px 2px black;
  border-radius: 0;
`;

function App() {
  return (
    <>
      <Header />
      <MainTransactions />
    </>
  );
}

export default App;
