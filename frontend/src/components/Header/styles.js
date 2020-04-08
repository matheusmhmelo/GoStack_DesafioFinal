import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      font-size: 15px;
      color: #999999;
      margin-right: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-right: 30px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
      margin-bottom: 10px;
      font-size: 14px;
    }

    a {
      background: #fff;
      border: 0;
      display: block;
      margin-top: 10px;
      font-size: 14px;
      color: #de3b3b;

      &:hover {
        color: ${darken(0.1, '#de3b3b')};
      }
    }
  }
`;
