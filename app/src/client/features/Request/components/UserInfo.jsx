import React from 'react';
import PropTypes from 'prop-types';

import {
  AvatarLg,
  AvatarRing,
  AvatarMiddleRing,
  ColCentered,
  Username,
  UserInfoSt,
  Star,
} from './TaskCard.styles';

import sadAlienImg from '../../../static/sadAlien.webp';

export const UserInfo = ({ user }) => (
  <ColCentered>
    <ColCentered>
      <AvatarLg
        src={user.profile_picture_url}
        alt={user.firstname}
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU='; }}
      />
      <AvatarRing />
      <AvatarMiddleRing />
    </ColCentered>
    <Username>{`${user.firstname} ${user.lastname}`}</Username>
    <UserInfoSt>
      <Star> ★ </Star>
      <b>{`${user.average_rating.toFixed(1) || 0}`}</b>
      <span>
        &nbsp;
        {`(${user.task_count})`}
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b>1.2</b>
      <span> miles away</span>
    </UserInfoSt>
  </ColCentered>
);

UserInfo.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    average_rating: PropTypes.number,
    task_count: PropTypes.number,
    profile_picture_url: PropTypes.string,
  }),
};

UserInfo.defaultProps = { user: {} };

export const UserInfoBlank = () => (
  <ColCentered>
    <AvatarLg
      src={sadAlienImg}
      style={{
        width: '150px',
        height: '150px',
        marginBottom: '-2em',
        marginTop: '-2em',
      }}
      alt=""
    />
    <Username />
    <UserInfoSt />
  </ColCentered>
);
