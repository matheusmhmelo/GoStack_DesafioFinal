import styled, { css } from 'styled-components';

export const Table = styled.table`
  width: 100%;
  max-width: 1150px;
  margin-top: 20px;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 20px;
`;

export const TableHeader = styled.tr`
  font-size: 16px;
  font-weight: bold;
  color: #444444;

  th {
    padding-left: 20px;
    word-wrap: break-word;
    padding-right: 40px;
  }

  ${props =>
    props.firstSmall &&
    css`
      th:first-child {
        width: 100px;
      }
    `}

  th:last-child {
    text-align: right;
  }
`;

export const TableItem = styled.tr`
  background: #ffffff;
  height: 60px;
  border: none;
  font-size: 16px;
  color: #666666;

  td {
    word-wrap: break-word;
    padding-left: 20px;
    border: none;

    button {
      border: 0;
      font-size: 28px;
    }
  }

  td:first-child {
    border-radius: 4px 0 0 4px;
  }

  td:last-child {
    text-align: right;
    padding-right: 50px;
    border-radius: 0 4px 4px 0;
  }
`;

export const TableDeliveries = styled(TableItem)`
  td {
    max-width: 150px;
  }
`;
