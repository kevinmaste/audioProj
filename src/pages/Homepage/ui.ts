import styled from "@emotion/styled";

export const Background = styled.div`
  background: rgb(241,105,250);
  background: linear-gradient(94deg, rgba(241,105,250,1) 0%, 
  rgba(29,127,180,0.7651435574229692) 0%, rgba(39,99,122,0.9249824929971989) 57%, 
  rgba(0,212,255,1) 100%);
  border-radius: 0 1.2rem 1.2rem 0;
  height: 100%;
  //pourquoi le display flex centre ma div
  display: flex;
`

export const BackgroundContent=styled.div`
  background: #f8e2e666;
  width: 80%;
  margin: auto;
  padding: 1.5rem;
  &>h3{
    display: inline;
    color: white;
    font-weight: bold;
  }
  h4{
    color: #16174f;
  }
  &>p{
    line-height: 0;
    color: whitesmoke;
  }
`

export const Global = styled.div`
  height: 100vh;
  
  &>div{
  height: inherit;  
  }
`
export const LoginBackground=styled.div`
  height: 100%;
`
