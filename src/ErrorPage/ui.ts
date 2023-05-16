import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const LinkModifier = styled(Link)`
  color: black;
  text-decoration: none;
  background: #e92aa452;
  padding: 4px;
  &:hover{
    background-color: whitesmoke;
  }

`

export const ContainerLinkModifier = styled.div`

  text-align: center;
  margin-top: 60px;
 
`