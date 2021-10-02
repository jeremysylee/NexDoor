/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import styled from 'styled-components';
import {
  SectionTileContainer,
  RowRight,
} from './Request.styles';

const SectionHeaderContainer = styled(SectionTileContainer)`
  background-color: #DB8457;
  box-shadow: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 1em;
`;

const Header = styled.div`
  font-weight: 500;
  color: white;
  font-size: 14px;
  width: 100%;
`;

const FlairDiagonalLines = styled(Header)`
  font-weight: 300;
  color: white;
  font-size: 22px;
`;

const VerticalLine = styled.div`
  background-color: #4496B4;
  width: 4px;
  height: 105px;
  position: absolute;
  transform: scale(1) translate(-720%,-12%);
  border-radius: 60px;
`;

const Anchor = styled.div`
  position: relative;
`;

const RowRightFlair = styled(RowRight)`
  margin-left: 0.5em;

`;

const FeedHeader = () => (
  <SectionHeaderContainer>
    <Anchor>
      <VerticalLine />
    </Anchor>
    <Header>Request help now</Header>
    <RowRightFlair>
      <Anchor>
        <FlairDiagonalLines>//</FlairDiagonalLines>
      </Anchor>
    </RowRightFlair>
  </SectionHeaderContainer>
);

export default FeedHeader;
