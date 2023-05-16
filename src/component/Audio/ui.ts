import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const WavesurferContainer = styled.div`
flex-grow: 1;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  //margin-right: -0.8rem;

`


//Create animation ring

const ring = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0);
  }
`;
export const IconContainer = styled.div`
  display: flex;
  background: #f0e7e7;
  margin-left: .3rem;
  box-shadow: 9px 7px 52px 12px rgba(0, 0, 0, 0.1);
  border-radius: .2rem;

  &:hover {
    background-color: #e8ffe0;
    cursor: pointer;
    animation: ${ring} 1s;
  }
`




