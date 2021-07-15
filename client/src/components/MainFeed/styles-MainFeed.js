import styled from 'styled-components';

export const Card = styled.div`
  max-width: 100%;
  margin-top: 1em;
  padding: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: visible;
  flex: 1;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5
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
  padding-right: 1em;
  wrap: wrap;
  color: black;
  max-width: auto;
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
