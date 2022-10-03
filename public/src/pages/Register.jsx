import React, {Fragment} from "react";
import styled from "styled-components";
function Register() {
  const submitHandler = (e) => {
    e.prevnetDefault();
    alert("form");
  };
  return (
    <Fragment>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div></div>
        </form>
      </FormContainer>
    </Fragment>
  );
}
const FormContainer = styled.div``;
export default Register;
