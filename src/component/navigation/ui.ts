import styled from "@emotion/styled";

export const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: .6rem;
  //before nth-child(1)
  & div:nth-of-type(1){
    display: flex;
    align-items: center;
    flex-grow: 1;
    h5{
      font-weight: bold;
      //display: inline;
    }
    
  }
  .MuiAvatar-root{
    width: 35px !important;
    height: 35px !important;
  }
`