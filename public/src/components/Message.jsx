import React from "react";
import styled from "styled-components";
function Message({msg}) {
  return <Container>{msg}</Container>;
}
const Container = styled.div`
  height: calc(100% - 9rem);
`;
export default Message;
