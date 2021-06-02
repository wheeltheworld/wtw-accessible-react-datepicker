import React from "react";
import styled from "styled-components";
import { Tuple } from "./types/Tuple";

import { NextIcon, PreviousIcon } from "wtw-icons/icons";

interface HeaderProps {
  months: Tuple<string, 1 | 2>;
  onNext: () => void;
  onPrevious: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  padding: 10px 0;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: black;
  height: fit-content;
  padding: 10px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  outline: none;
  border: 1px solid transparent;
  position: absolute;
  top: 0px;
  right: 0;

  &:first-child {
    left: 0;
  }

  &:hover,
  &:focus {
    border: 1px solid #2f6fe4;
  }
`;

const Month = styled.p`
  font-weight: 600;
  margin: 0;
  display: grid;
  place-items: center;
`;

const Header: React.FC<HeaderProps> = ({ months, onNext, onPrevious }) => {
  const isPair = months.length == 2;
  return (
    <Container>
      <Button
        onClick={onPrevious}
        aria-label={`Previous ${isPair ? "pair of months" : "month"}`}
        type='button'
      >
        <PreviousIcon width='15px' height='15px' />
      </Button>
      <Month aria-live='polite'>{months[0]}</Month>
      {isPair && <Month aria-live='polite'>{months[1]}</Month>}
      <Button
        onClick={onNext}
        aria-label={`Next ${isPair ? "pair of months" : "month"}`}
        type='button'
      >
        <NextIcon width='15px' height='15px' />
      </Button>
    </Container>
  );
};

export default Header;
