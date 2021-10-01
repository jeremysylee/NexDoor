import styled from 'styled-components';

export const ChatContainer = styled.div`
  position: relative;
  height: 75vh;
  margin: 2em;
  padding: 2em;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
`;

export const MessagesContainer = styled.div`
  margin: 10px;
  height: 89%;
  overflow-x: hidden;
`;

export const Input = styled.input`
  width: 45vw;
  border-radius: 25px;
  border: none;
  height: 3em;
  border-color: grey;
  text-indent: 24px;
  margin-right: 1.2em;
  background-color: #f3f3f3;
  font-size: 14px;
  -webkit-transition: all 100ms ease;
  -moz-transition: all 100ms ease;
  -ms-transition: all 100ms ease;
  -o-transition: all 100ms ease;
  transition: all 100ms ease;
  &:focus {
    outline: none;
    border: none;
    border-radius: none;
    box-shadow: inset 4px 4px 4px rgb(181 181 181 / 25%), inset -2px -2px 4px #ffffff;
  }
`;

export const Form = styled.form`
  position: relative;
  bottom: 0;
  right: 0;
  margin: 5px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;

export const MyTextContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export const MyText = styled.div`
  text-align: right;
  background-color: #4496B4;
  border-radius: 22px;
  width: fit-content;
  padding: 6px 2px 6px 24px;
  color: white;
  font-size: 14px;
  margin: 0.4em 3.5em;
`;

export const YourText = styled(MyText)`
  text-align: left;
  background-color: #f1f2f5;
  color: black;
  margin-left: 10%;
  margin: 10px 10px;
  padding: 4px 31px 5px 19px;
`;

export const MyTimeStamp = styled.div`
  font-size: 9px;
  color: white;
`;
export const YourTimeStamp = styled(MyTimeStamp)`
  color: grey;
`;

export const IsTypingContainer = styled(YourText)`
  background-color: #d1d1d1;
  color: white;
  margin-left: 7px;
  padding: 9px;
`;

export const BubbleContainer = styled.div`
  position: relative;
`;

export const BubbleLarger = styled.div`
  height: 8px;
  width: 8px;
  position: absolute;
  transform: scale(1) translate(-9px, 8px);
  background-color: #ededed;
  border-radius: 50%;
`;

export const BubbleSmaller = styled(BubbleLarger)`
  height: 4px;
  width: 4px;
  transform: scale(1) translate(-12px, 14px);
`;

export const Dot = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: white;
  margin-right: 2px;
`;
