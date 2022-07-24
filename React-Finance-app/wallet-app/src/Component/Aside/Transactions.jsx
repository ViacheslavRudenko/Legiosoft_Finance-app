import styled from "styled-components";

const AsideBox = styled.div`
  width: 250px;
  height: 200px;
  border: 2px solid black;
`;

const AsideBoxHeader = styled.div`
  text-align: center;
  padding: 10px 0;
  background-color: rgb(100, 150, 200);
  border-bottom: 2px solid black;
`;

export default function TransactionsBox() {
  return (
    <AsideBox>
      <AsideBoxHeader>Transactions</AsideBoxHeader>
    </AsideBox>
  );
}
