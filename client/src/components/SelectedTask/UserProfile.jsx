import React from 'react';
import PropTypes from 'prop-types';

import {
  AvatarLg,
  AvatarRing,
  AvatarMiddleRing,
  Col,
  ColCentered,
  Username,
  UserInfo,
} from './styles-SelectedTask';

export const UserProfile = ({ user }) => (
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
    <UserInfo>
      <span>{`★ ${user.avg_rating || 0} (${user.task_count})`}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>1.2 miles away</span>
    </UserInfo>
  </ColCentered>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    avg_rating: PropTypes.number,
    task_count: PropTypes.number,
    profile_picture_url: PropTypes.string,
  }),
};

UserProfile.defaultProps = { user: {} };

export const UserProfileBlank = () => (
  <ColCentered>
    <AvatarLg
      style={{ backgroundColor: 'grey' }}
      alt=""
    />
    <Username />
    <UserInfo />
  </ColCentered>
);
