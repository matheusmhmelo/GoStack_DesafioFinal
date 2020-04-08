import styled from 'styled-components';

export const Title = styled.h1`
  color: #444444;
  font-size: 16px;
  font-weight: bold;
`;

export const Divisor = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eeeeee;

  p {
    margin-top: 10px;
    font-size: 16px;
  }
`;

export const SignatureDivisor = styled.div`
  display: flex;
  justify-content: center;

  margin: 20px;
`;

export const Signature = styled.img`
  align-self: center;
  max-height: 200px;
  max-width: 400px;
`;
