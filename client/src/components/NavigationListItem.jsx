import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavigationButtonContainer = styled.div`
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  display: flex;
  position: relative;
  text-align: left;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  justify-content: flex-start;
  text-decoration: none;
  color: inherit;
  border: 0;
  cursor: pointer;
  margin: 0;
  outline: 0;
  vertical-align: middle;
  border-radius: 20px;
  background-color: transparent;
  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 20px;
  }
`;

const TouchRipple = styled.span`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
`;

const NavigationListItem = ({ children }) => (
  <NavigationButtonContainer>
    {children}
    <TouchRipple />
  </NavigationButtonContainer>
);

NavigationListItem.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NavigationListItem;
