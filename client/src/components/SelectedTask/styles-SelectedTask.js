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
  margin-bottom: 2em;
  font-weight: 200;
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
  box-shadow: inset 2px 2px 4px #DEDEDE, inset -2px -2px 4px white;
  background-color: #FBFBFB;
`;

export const HeadingSmall = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: grey;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  width: 160px;
  height: 40px;
  background-color: #f50257;
  color: white;
  border-radius: 100px;
  border: none;
  margin-bottom: 2em;
`;

export const ButtonDecline = styled(Button)`
  background-color: grey;
`;
