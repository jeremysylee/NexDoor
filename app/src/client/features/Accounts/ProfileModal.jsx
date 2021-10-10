import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core/';
import styled from 'styled-components';

const ModalContainer = styled.div`
  height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileModal = ({ showModal, closeHandler }) => (
  <Dialog
    open={showModal}
    onClose={closeHandler}
  >
    <ModalContainer>
      <input type="file" accept="image/*" />
    </ModalContainer>
  </Dialog>
);

ProfileModal.propTypes = {
  showModal: PropTypes.bool,
  closeHandler: PropTypes.func.isRequired,
};

ProfileModal.defaultProps = {
  showModal: false,
};

export default ProfileModal;
