import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarImage = styled.img`
  color: transparent;
  width: inherit;
  height: inherit;
  object-fit: cover;
  text-align: center;
  text-indent: 100000px;
  z-index: 5;
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

const Avatar = ({
  src,
  alt,
  hw,
  link,
}) => {
  const url = link ? `${src}?tr=w-${hw},h-${hw}` : src;
  return (
    <AvatarContainer>
      <AvatarImage src={url} alt={alt} />
    </AvatarContainer>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  hw: PropTypes.number,
  link: PropTypes.bool,
};

Avatar.defaultProps = {
  src: '',
  hw: 40,
  link: true,
};

export default Avatar;
