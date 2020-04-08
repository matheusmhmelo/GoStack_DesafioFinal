import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;

      height: 150px;
      width: 150px;
      padding: 40px 15px;
      border-radius: 50%;
      border: 3px dashed #dddddd;
      background: #fff;
      color: #dddddd;

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px dashed rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }

    .deliveryman-avatar {
    }
  }
`;
