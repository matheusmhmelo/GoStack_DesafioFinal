import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  max-height: 435px;
  text-align: center;
  background: #ffffff;
  border-radius: 4px;
  padding: 60px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      display: flex;
      padding: 9px 0;
      font-size: 14px;
      font-weight: bolder;
      color: #444444;
    }

    input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      margin: 0 0 10px;
      color: #444444;
      width: 100%;

      &::placeholder {
        color: ${darken(0.25, '#dddddd')};
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7D40E7')};
      }
    }
  }
`;
