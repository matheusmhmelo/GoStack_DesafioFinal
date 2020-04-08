import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
`;
export const Badge = styled.button`
  background: none;
  border: 0;

  button {
    background-color: #fff;
  }
`;

export const ActionsList = styled.div`
  font-size: 14px;

  position: absolute;
  width: 150px;
  left: calc(100% + 20px);
  top: calc(-150%);
  background: #fff;
  border-radius: 8px;
  padding: 10px 5px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.25), 0 8px 15px 0 rgba(0, 0, 0, 0.19);
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    right: calc(100%);
    top: calc(50% - 15px);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
  }
`;

export const ActionsListSmall = styled(ActionsList)`
  top: calc(-90%);
`;

export const Action = styled.div`
  color: #fff;
  padding: 0 10px;

  a {
    font-size: 16px;
    display: flex;
    justify-content: left;
    text-align: left;
    padding: 10px 0;

    background: none;
    color: #999999;

    & + a {
      border-top: 1px solid ${darken(0.2, '#eeeeee')};
    }

    span {
      margin-left: 10px;
    }
  }

  button {
    font-size: 16px;
    display: flex;
    justify-content: left;
    text-align: left;
    padding: 10px 0;

    background: none;
    color: #999999;

    & + a {
      border-top: 1px solid ${darken(0.2, '#eeeeee')};
    }

    span {
      margin-left: 10px;
    }
  }
`;
