import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Avatar from './Avatar';
import ProfileModal from '../features/Accounts/ProfileModal';

import {
  Row,
} from './App.styles';

const NavRow = styled(Row)`
  justify-content: space-between;
  margin: 15px 22px;
  width: 350px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 22px;
`;

const LogoContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 12px;
  margin-left: 20px;
  &:hover{
    cursor: pointer;
  }
`;

const NaviHeaders = styled.div`
font-weight: 200;
font-size: 16px;
transition: all 150ms ease;
&:hover {
  cursor: pointer;
  color: grey;
}
`;

const Header = () => {
  const user = useSelector((store) => store.currentUserReducer.userData);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, toggleShowModal] = useState(false);

  const openModal = () => {
    console.log('hello?');
    toggleShowModal(true);
  };

  const closeHandler = () => {
    toggleShowModal(false);
  };

  const onClickLogoHandler = () => {
    dispatch({ type: 'SET_PAGE', page: '/' });
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
    history.push('/');
  };

  const clickGetHelpHandler = () => {
    history.push('/');
    dispatch({ type: 'TOGGLE_AR_MODAL', toggle: true, mode: 'new' });
  };

  const clickTopHelpersHandler = () => {
    history.push('/top');
  };

  const LogoSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="127"
      height="40"
      fill="none"
      viewBox="0 0 83 26"
    >
      <path
        fill="#4496B4"
        d="M23.696 19.18c-.488 0-.936-.084-1.344-.252a3.106 3.106 0 01-1.056-.708 3.301 3.301 0 01-.696-1.08 3.913 3.913 0 01-.24-1.392c0-.48.08-.924.24-1.332.168-.416.4-.776.696-1.08a3.179 3.179 0 011.056-.72c.4-.168.836-.252 1.308-.252.504 0 .956.084 1.356.252.408.168.756.408 1.044.72.288.312.508.688.66 1.128.16.432.24.92.24 1.464v.408h-4.308c.072.344.204.608.396.792.192.176.432.264.72.264.424 0 .764-.184 1.02-.552l2.052.456c-.16.384-.396.716-.708.996-.304.28-.668.5-1.092.66a3.886 3.886 0 01-1.344.228zm-.036-5.22a.91.91 0 00-.672.264c-.176.176-.296.432-.36.768h2.016c-.056-.336-.168-.592-.336-.768a.856.856 0 00-.648-.264zM27.022 19l2.352-3.408-2.088-3.048h2.496l.852 1.584.876-1.584h2.436l-2.088 3.048L34.21 19h-2.616l-.996-1.824L29.578 19h-2.556zm7.97 0v-8.52h3.684c.664 0 1.272.104 1.824.312.552.208 1.028.5 1.428.876.408.376.72.824.936 1.344.224.512.336 1.08.336 1.704 0 .624-.112 1.2-.336 1.728-.224.52-.54.972-.948 1.356a4.25 4.25 0 01-1.452.888A5.135 5.135 0 0138.64 19h-3.648zm2.4-2.112h1.128c.456 0 .848-.088 1.176-.264.328-.176.58-.424.756-.744.176-.32.264-.7.264-1.14 0-.44-.088-.82-.264-1.14a1.831 1.831 0 00-.756-.744c-.328-.176-.72-.264-1.176-.264h-1.128v4.296zm10.073 2.292c-.496 0-.956-.084-1.38-.252a3.47 3.47 0 01-1.104-.72 3.44 3.44 0 01-.732-1.08 3.413 3.413 0 01-.264-1.344c0-.488.088-.94.264-1.356.176-.416.424-.776.744-1.08.32-.312.692-.552 1.116-.72.432-.176.9-.264 1.404-.264.496 0 .956.088 1.38.264a3.22 3.22 0 011.104.72c.312.304.556.664.732 1.08.176.408.264.852.264 1.332 0 .488-.088.94-.264 1.356-.176.416-.424.78-.744 1.092a3.58 3.58 0 01-1.128.72 3.746 3.746 0 01-1.392.252zm.024-2.028c.232 0 .44-.06.624-.18s.328-.284.432-.492a1.47 1.47 0 00.168-.708c0-.264-.056-.5-.168-.708a1.231 1.231 0 00-.432-.492 1.117 1.117 0 00-.624-.18c-.232 0-.44.06-.624.18s-.332.284-.444.492a1.562 1.562 0 00-.156.708c0 .264.052.5.156.708.112.208.26.372.444.492s.392.18.624.18zm7.757 2.028c-.496 0-.956-.084-1.38-.252a3.47 3.47 0 01-1.104-.72 3.44 3.44 0 01-.732-1.08 3.413 3.413 0 01-.264-1.344c0-.488.088-.94.264-1.356.176-.416.424-.776.744-1.08.32-.312.692-.552 1.116-.72.432-.176.9-.264 1.404-.264.496 0 .956.088 1.38.264a3.22 3.22 0 011.104.72c.312.304.556.664.732 1.08.176.408.264.852.264 1.332 0 .488-.088.94-.264 1.356-.176.416-.424.78-.744 1.092a3.58 3.58 0 01-1.128.72 3.746 3.746 0 01-1.392.252zm.024-2.028c.232 0 .44-.06.624-.18s.328-.284.432-.492a1.47 1.47 0 00.168-.708c0-.264-.056-.5-.168-.708a1.231 1.231 0 00-.432-.492 1.117 1.117 0 00-.624-.18c-.232 0-.44.06-.624.18s-.332.284-.444.492a1.562 1.562 0 00-.156.708c0 .264.052.5.156.708.112.208.26.372.444.492s.392.18.624.18zM59.67 19v-6.456h2.076l.072 1.044c.16-.368.372-.648.636-.84a1.53 1.53 0 01.924-.288c.208 0 .392.036.552.108l-.216 2.244a1.737 1.737 0 00-.552-.084c-.832 0-1.248.436-1.248 1.308V19h-2.244zM5.245 3.01V.116H.131V19h5.114V9.303c0-5.443 6.99-5.783 6.99 0V19h5.115V7.432c0-9.186-9.718-8.846-12.105-4.423z"
      />
      <circle cx="10.225" cy="13.063" r="0.594" fill="#4496B4" />
    </svg>
  );

  return (
    <>
      <ProfileModal showModal={showModal} closeHandler={closeHandler} />
      <Row
        style={{
          width: '100%',
          boxShadow: '0 4px 16px 0 #e5e5e5',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <LogoContainer onClick={onClickLogoHandler}><LogoSvg /></LogoContainer>
        <NavRow>
          <NaviHeaders onClick={onClickLogoHandler}>Requests</NaviHeaders>
          <NaviHeaders onClick={clickGetHelpHandler}>Get Help</NaviHeaders>
          <NaviHeaders onClick={clickTopHelpersHandler}>Top Helpers</NaviHeaders>
        </NavRow>
        <Col
          onClick={openModal}
        >
          <Avatar
            src={user.profile_picture_url}
            alt={user.firstname}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU='; }}
            style={{ height: '44px', width: '44px' }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Header;
