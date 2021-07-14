import styled from 'styled-components';

export const Card = styled.div`
  max-width: 100%;
  margin-top: 1em;
  padding: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: hidden;
  flex: 1;
`;

export const CardHeaders = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
`;

export const Row = styled.div`
  margin-top: 2px;
  display: flex;
  direction: row;
`;

export const CardContent = styled.div`
  font-family: Roboto;
  margin-left: 1em;
`;

export const Username = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

export const Description = styled.div`
  font-size: 14px;
  font-weight: lighter;
  margin-top: 2px;
  wrap: wrap;
  color: grey;
  max-width: 90%;
`;

export const DetailsCol = styled.div`
  font-family: Roboto;
  margin-right: 1.5em;
  text-align: right;
  color: grey;
  flex-wrap: nowrap;
`;

export const Details = styled.div`
  font-size: 14px;
  font-weight: lighter;
  color: grey;
  width: 140%;
`;
