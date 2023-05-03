import styled from "@emotion/styled";
import background from "../../assets/images/background-3.jpg"
export const ContentBody = styled.div`
  
  position: relative;
  
`


//type Content
type contentProps ={
    url:string
}
export const MeteoContent= styled.div<contentProps>`
  background-image: url(${props=>props.url});
  padding: 10px;
  width: 100%;
  height: 70vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  box-shadow: 0 14px 50px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
`

export const BottomMeteoContent = styled.div`
  width: 90%;
  border-radius: 1rem;
  background-color: #fdfdfdfa;
  height: 7rem;
  margin: auto;
  position: relative;
  top: -55px;
  box-shadow: 0 29px 44px 13px rgba(0, 0, 0, 0.1);


`

export const BottomContent = styled.div`
  //display: flex;
  //height: inherit;
  //align-items: center;
  //padding: 1.5rem;
  //before that was first-child
  height: inherit;
  display: flex;
  align-items: center;
  padding-right: .8rem;
  &>div:first-of-type{
    flex-grow: 1;
    
  }
`

export const BottomItem2=styled.div`
  //same here
  //margin-right: 5px;
  margin: 3px 0;
  & > div:first-of-type {
    background-color: #ffffff00;
    display: flex;
    padding: 5px;
    border-radius: 50px;
    justify-content: center;


  }

  .MuiSvgIcon-root {
    color:#2de791;
  }


`


//type for the button item

export const ButtonItem = styled.div`

  background: #8f77ee;
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.className=== "change" ? 0 : 50}px;
  &:hover{
    cursor: pointer;
  }
`