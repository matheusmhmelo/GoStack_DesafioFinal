import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  flex: 1;
  margin: 40px auto 40px auto;
  max-width: 1150px;

  .avatar {
    background-color: ${lighten(0.2, '#7d40e7')};
    color: #7d40e7;
  }
`;

export const PageActions = styled.div`
  padding-top: 15px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  max-width: 400px;
  margin: auto;

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    background-color: #7d40e7;
    color: #fff;
    font-weight: bold;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const NoContent = styled.div`
  display: flex;

  margin: 20px auto;
  max-width: 1200px;
  height: 350px;
  background: #ffffff;
  color: #999999;
  border-radius: 4px;

  div {
    margin: auto;
    display: flex;
    flex-direction: column;
  }
`;
