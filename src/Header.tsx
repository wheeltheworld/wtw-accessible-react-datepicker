import React from "react";
import styled from "styled-components";
import { Tuple } from "./types";

interface HeaderProps {
  months: Tuple<string, 2>;
  onNext: () => void;
  onPrevious: () => void;
}

const Container = styled.div`
  display: flex;
  justifycontent: space-between;
`;

const Header: React.FC<HeaderProps> = ({ months, onNext, onPrevious }) => {
  return (
    <Container>
      <button onClick={onPrevious}>{"<"}</button>
      <p>{months[0]}</p>
      <p>{months[1]}</p>
      <button onClick={onNext}>{">"}</button>
    </Container>
  );
};

export default Header;
