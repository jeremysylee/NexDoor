import styled from 'styled-components';

export const SelectedTaskContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3em 2em;
`;

export const AvatarLg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 100%;
  z-index: 3;
`;

export const AvatarRing = styled.div`
  border-radius: 100px;
  background: linear-gradient(297.42deg, #FF8B50 33.07%, #4496B4 78.11%, #61C0CB 88.78%);
  width: 96px;
  height: 96px;
  position: absolute;
  z-index: 1;
`;

export const AvatarMiddleRing = styled(AvatarRing)`
  background: white;
  width: 90px;
  height: 90px;
  z-index: 2;
`;

export const BackButton = styled.button`
  border: none;
  color: #6C6C6C;
  background-color: white;
  font-weight: 300;
  font-size: 18px;
  z-index: 5;
  -webkit-transition: all 100ms ease-out;
  -moz-transition: all 100ms ease-out;
  -ms-transition: all 100ms ease-out;
  -o-transition: all 100ms ease-out;
  transition: all 100ms ease-out;
  &:hover{
    color: 989898;
  }
`;

export const Username = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-top: 0.9em;
`;

export const UserInfoSt = styled.div`
  font-weight: 400;
  font-size: 12px;
`;

export const StatusText = styled(Username)`
  font-weight: 200;
  margin-top: 0.8em;
  margin-bottom: 0.7em;
  font-size: 22px;
  text-align: center;
`;

export const DetailsContainer = styled.div`
  flex-grow: 2;
  height: auto;
  justify-content: flex-start;
  flex-direction: column;
  font-weight: 200;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 10px;
  padding: 1em 2em;
  box-shadow: inset 4px 4px 4px #E8E8E8, inset -2px -2px 4px #F4F4F4;
  background-color: #FBFBFB;
`;

export const DetailsContainerTime = styled(DetailsContainer)`
  margin-left: 15px;
  flex-shrink: 2;
  min-width: 130px;
`;

export const HeadingSmall = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #696969;
  margin-bottom: 7px;
  margin-top: 5px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 1em;
`;

export const ButtonRow = styled(Row)`
  margin-top: 0.5em;
`;

export const RowCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1em;
  width: 100%;
`;

export const RowSlim = styled(Row)`
  margin-top: -1em;
  margin-bottom: 1em;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ColCentered = styled(Col)`
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: white;
  color: #4496B4;
  border-radius: 10px;
  border: none;
  font-weight: 300;
  font-size: 18px;
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

export const ButtonClaimed = styled(Button)`
  width: 44%;
  height: 36px;
  font-weight: 300;
  background-color: #DB6F37;
  color: white;
  &:hover {
    background-color: #EF641C;
  }
`;

export const ButtonCancel = styled(Button)`
  color: #c50000;
`;

export const ButtonClaimedDecline = styled(ButtonDecline)`
  width: 33%;
`;

export const ButtonGoToRequest = styled(ButtonClaimed)`
  background-color: #4496B4;
  &:hover {
    background-color: #79B9D0;
  }
`;

export const LineTop = styled.hr`
  margin-bottom: -11px;
  margin-top: 18px;
  border-top: 10px;
  border: 1px solid #b7b7b7;
  width: 100%;
`;

export const LineBottom = styled(LineTop)`
  margin-top: 5px;
`;

export const Star = styled.span`
  color: #EAAF80;
  font-size: 16px;
`;

export const LocationPinContainer = styled.div`
  margin-right: 5px;
  margin-top: 2px;
`;

export const FormTypography = styled.div`
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 1em;
`;

export const FormSectionContainer = styled.div`
  margin: 0.75em;
`;

export const FormSectionHeader = styled.h4`
  font-weight: 200;
  text-align: center;
  margin: 1em 0em;
  letter-spacing: 2px;
`;
