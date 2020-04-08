import styled from 'styled-components';
import { darken } from 'polished';

export const ContentForm = styled.div`
  max-width: 900px;
  background: #ffffff;
  border-radius: 4px;
  padding: 10px;
`;

export const InputLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;

  .address-div {
    width: 2500px;
  }

  > div {
    width: 100%;
    margin: 0 10px;

    > label {
      display: flex;
      padding: 9px 0;
      font-size: 14px;
      font-weight: bolder;
      color: #444444;
    }

    > input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #444444;
      width: 100%;
      margin-bottom: 5px;

      &::placeholder {
        color: ${darken(0.25, '#dddddd')};
      }
    }

    > span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;

export const SelectDiv = styled(InputLine)`
  div {
    > span {
      display: flex;
      padding: 9px 0;
      font-size: 14px;
      font-weight: bolder;
      color: #444444;
    }
  }
`;

export const AvatarLine = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
