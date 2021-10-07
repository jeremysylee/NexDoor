import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarImage = styled.img`
  color: transparent;
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
  text-indent: 100000px;
`;

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
`;

const Avatar = ({ src, alt }) => (
  <AvatarContainer>
    <AvatarImage src={src} alt={alt} />
  </AvatarContainer>
);

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  src: '',
};

export default Avatar;
