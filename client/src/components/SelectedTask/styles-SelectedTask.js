import styled from 'styled-components';

export const SelectedTaskContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AvatarLg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 100%;
`;

export const AvatarRing = styled.div`
  border-radius: 100px;
  background: linear-gradient(to right, #DB8457, #4496B4, #61C0CB);
  width: 90px;
  height: 90px;
`;

export const BackButton = styled.button`
  border: none;
  background-color: white;
  font-weight: 300;
  font-size: 18px;
  -webkit-transition: all 100ms ease-out;
  -moz-transition: all 100ms ease-out;
  -ms-transition: all 100ms ease-out;
  -o-transition: all 100ms ease-out;
  transition: all 100ms ease-out;
  &:hover{
    color: grey;
  }
`;

export const Username = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin-top: 1em;
`;

export const UserInfo = styled.div`
  font-weight: 400;
  font-size: 14px;
  margin-top: 0.5em;
`;

export const StatusText = styled(Username)`
  font-weight: 200;
  margin-top: 0.5em;
  margin-bottom: 1em;
  font-size: 24px;
`;

export const DetailsContainer = styled.div`
  width: 80%;
  height: auto;
  justify-content: flex-start;
  flex-direction: column;
  font-weight: 200;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 10px;
  padding: 1em 2em;
  box-shadow: inset 4px 4px 4px #E8E8E8, inset -2px -2px 4px #F4F4F4;
  background-color: white;
`;

export const DetailsContainerTime = styled(DetailsContainer)`
  margin-left: 15px;
  flex-shrink: 2;
`;

export const HeadingSmall = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: black;
  margin-bottom: 7px;
  margin-top: 5px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-top: 1em;
`;

export const RowSlim = styled(Row)`
  margin-top: -1em;
  margin-bottom: -1em;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
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
    font-weight: 500;
  }
`;

export const ButtonDecline = styled(Button)`
  color: grey;
`;

export const Line = styled.hr`
  margin-bottom: 0px;
  margin-top: 18px;
  border-top: 10px;
  border: 1px solid #b7b7b7;
  width: 80%;
`;
