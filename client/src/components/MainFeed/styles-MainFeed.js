import styled from 'styled-components';

export const SectionCard = styled.div`
  max-width: 100%;
  margin-top: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: hidden;
  flex: 1;
  padding: 1em;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
`;

export const Username = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

export const Card = styled(SectionCard)`
  overflow: visible;
  color: black;
  -webkit-transition: all 150ms ease;
  -moz-transition: all 150ms ease;
  -ms-transition: all 150ms ease;
  -o-transition: all 150ms ease;
  transition: all 150ms ease;
  &:hover {
    // background-color: #F6F6F6;
    box-shadow: 2px 2px 3px #959595, -1px -1px 27px #f1f2f5;
    cursor: pointer;
  }
  &:hover ${Username} {
    text-decoration: underline;
  }
`;

export const Row = styled.div`
  margin-top: 2px;
  display: flex;
  direction: row;
`;

export const RowRight = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const CardContent = styled.div`
  font-family: Roboto;
  margin-left: 1em;
`;

export const Description = styled.div`
  font-size: 14px;
  margin-top: 2px;
  padding-right: 1em;
  wrap: wrap;
  max-width: auto;
  font-weight: 300;
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

export const Subdetails = styled.div`
  font-size: 12px;
  font-weight: lighter;
  color: grey;
  width: 140%;
`;

export const StatusBadge = styled.div`
  border-radius: 100px;
  height: 20px;
  width: 100px;
  z-index: 1;
  background-color: ${(props) => props.theme.statusColor};
  position: absolute;
  text-align: center;
  padding: 1px;
  color: white;
  font-size: 0.75rem;
  font-weight: 400;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: absolute;
  transform: scale(1) translate(0%, -108%);
  transform-origin: 0% 0%;
  margin-right: -16px;
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: white;
  color: #4496B4;
  border-radius: 10px;
  border: none;
  font-weight: 300;
  font-size: 14px;
  margin-bottom: -4px;
  -webkit-transition: all 400ms ease;
  -moz-transition: all 400ms ease;
  -ms-transition: all 400ms ease;
  -o-transition: all 400ms ease;
  transition: all 400ms ease;
  &:hover {
    background-color: #ECECEC;
  }
`;

export const ButtonDecline = styled(Button)`
  color: grey;
`;

export const Line = styled.hr`
  color: #BDBDBD;
  margin-bottom: 6px;
  margin-top: 13px;
`;

export const SectionLine = styled(Line)`
  margin-top: 20px;
`;
