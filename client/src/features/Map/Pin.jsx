import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RequestCardTiny from '../Request/RequestCardTiny';

const PinContainer = styled.div`
  height: 50px;
  width: 50px;
  position: relative;
  transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
  }
`;

const Pin = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const clickHandler = () => {
    dispatch({ type: 'SET_TASK', task });
  };

  const [hovered, setHovered] = useState(false);

  const onMouseEnter = () => {
    setHovered(true);
    dispatch({ type: 'SET_TASK', task });
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      {selectedTask.task_id === task.task_id && <RequestCardTiny task={task} />}
      <PinContainer
        onClick={clickHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!hovered ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
            <linearGradient id="iu22Zjf0u3e5Ts0QLZZhJa" x1="11.274" x2="36.726" y1="9.271" y2="34.723" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#d43a02" />
              <stop offset="1" stopColor="#b9360c" />
            </linearGradient>
            <path
              fill="url(#iu22Zjf0u3e5Ts0QLZZhJa)"
              d="M36.902,34.536C40.052,31.294,42,26.877,42,22c0-9.94-8.06-18-18-18S6,12.06,6,22
              c0,4.877,1.948,9.294,5.098,12.536c0.018,0.019,0.03,0.04,0.048,0.059l0.059,0.059c0.047,0.048,0.094,0.095,0.142,0.142
              l11.239,11.239c0.781,0.781,2.047,0.781,2.828,0l11.239-11.239c0.048-0.047,0.095-0.094,0.142-0.142l0.059-0.059
              C36.873,34.576,36.885,34.554,36.902,34.536z"
            />
            <radialGradient
              id="iu22Zjf0u3e5Ts0QLZZhJb"
              cx="24"
              cy="22.5"
              r="9.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".177" />
              <stop
                offset="1"
                stopOpacity="0"
              />
            </radialGradient>
            <circle cx="24" cy="22.5" r="9.5" fill="url(#iu22Zjf0u3e5Ts0QLZZhJb)" />
            <circle cx="24" cy="22" r="8" fill="#f9f9f9" />
            <radialGradient id="iu22Zjf0u3e5Ts0QLZZhJc" cx="23.842" cy="43.905" r="13.637" gradientUnits="userSpaceOnUse">
              <stop offset=".177" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
            <path
              fill="url(#iu22Zjf0u3e5Ts0QLZZhJc)"
              d="M24,30c-4.747,0-8.935,2.368-11.467,5.982l10.052,10.052c0.781,0.781,2.047,0.781,2.828,0
              l10.052-10.052C32.935,32.368,28.747,30,24,30z"
            />
            <path
              fill="#de490d"
              d="M24,32c-4.196,0-7.884,2.157-10.029,5.42l8.615,8.615c0.781,0.781,2.047,0.781,2.828,0l8.615-8.615
                C31.884,34.157,28.196,32,24,32z"
            />
          </svg>
        ) : (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.4396 35.9753C41.7208 32.5982 43.75 27.9972 43.75 22.917C43.75 12.5628 35.3542 4.16699 25 4.16699C14.6458 4.16699 6.25 12.5628 6.25 22.917C6.25 27.9972 8.27917 32.5982 11.5604 35.9753C11.5792 35.9951 11.5917 36.017 11.6104 36.0368L11.6719 36.0982C11.7208 36.1482 11.7698 36.1972 11.8198 36.2462L23.5271 47.9534C24.3406 48.767 25.6594 48.767 26.4729 47.9534L38.1802 36.2462C38.2302 36.1972 38.2792 36.1482 38.3281 36.0982L38.3896 36.0368C38.4094 36.017 38.4219 35.9941 38.4396 35.9753Z" fill="url(#paint0_linear)" />
            <path d="M24.9995 31.25C20.0547 31.25 15.6922 33.7167 13.0547 37.4812L23.5255 47.9521C24.3391 48.7656 25.6578 48.7656 26.4714 47.9521L36.9422 37.4812C34.3068 33.7167 29.9443 31.25 24.9995 31.25Z" fill="url(#paint1_radial)" />
            <path d="M24.9996 33.333C20.6288 33.333 16.7871 35.5799 14.5527 38.9788L23.5267 47.9528C24.3402 48.7663 25.659 48.7663 26.4725 47.9528L35.4465 38.9788C33.2121 35.5799 29.3704 33.333 24.9996 33.333Z" fill="#DE490D" />
            <path d="M36.8268 34.6583C39.7143 31.6865 41.5 27.6376 41.5 23.167C41.5 14.0553 34.1117 6.66699 25 6.66699C15.8883 6.66699 8.5 14.0553 8.5 23.167C8.5 27.6376 10.2857 31.6865 13.1732 34.6583C13.1897 34.6757 13.2007 34.695 13.2172 34.7124L13.2713 34.7665C13.3143 34.8105 13.3574 34.8536 13.4014 34.8967L23.7038 45.1991C24.4198 45.915 25.5802 45.915 26.2962 45.1991L36.5986 34.8967C36.6426 34.8536 36.6857 34.8105 36.7287 34.7665L36.7828 34.7124C36.8003 34.695 36.8113 34.6748 36.8268 34.6583Z" fill="url(#paint2_linear)" />
            <path d="M24.9993 32.3337C29.8088 32.3337 33.7077 28.4348 33.7077 23.6253C33.7077 18.8158 29.8088 14.917 24.9993 14.917C20.1899 14.917 16.291 18.8158 16.291 23.6253C16.291 28.4348 20.1899 32.3337 24.9993 32.3337Z" fill="url(#paint3_radial)" />
            <path d="M24.9994 30.4997C29.0494 30.4997 32.3327 27.2164 32.3327 23.1663C32.3327 19.1163 29.0494 15.833 24.9994 15.833C20.9493 15.833 17.666 19.1163 17.666 23.1663C17.666 27.2164 20.9493 30.4997 24.9994 30.4997Z" fill="#D03A04" />
            <path d="M24.9997 30.5C20.6483 30.5 16.8093 32.6707 14.4883 35.9835L23.7026 45.1978C24.4185 45.9137 25.579 45.9137 26.295 45.1978L35.5093 35.9835C33.1901 32.6707 29.3511 30.5 24.9997 30.5Z" fill="url(#paint4_radial)" />
            <path d="M24.9999 32.333C21.1536 32.333 17.7729 34.3103 15.8066 37.3013L23.7037 45.1984C24.4196 45.9143 25.5801 45.9143 26.2961 45.1984L34.1931 37.3013C32.2269 34.3103 28.8462 32.333 24.9999 32.333Z" fill="white" />
            <defs>
              <linearGradient id="paint0_linear" x1="11.7438" y1="9.65762" x2="38.2562" y2="36.1701" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D43A02" />
                <stop offset="1" stopColor="#B9360C" />
              </linearGradient>
              <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.8349 45.7344) scale(14.2052)">
                <stop offset="0.177" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="paint2_linear" x1="13.3345" y1="11.4987" x2="36.6655" y2="34.8297" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <radialGradient id="paint3_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.9993 23.6253) scale(8.70833)">
                <stop offset="0.177" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.8549 43.2462) scale(12.5006)">
                <stop offset="0.177" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

        )}
      </PinContainer>
    </>
  );
};

Pin.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.number,
    requester: PropTypes.shape({
      profile_picture_url: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      average_rating: PropTypes.number,
      task_count: PropTypes.number,
    }),
  }),
};

Pin.defaultProps = {
  task: {
    task_id: 0,
    requester: {
      profile_picture_url: '',
      firstname: '',
      lastname: '',
      average_rating: 0,
      task_count: 0,
    },
  },
};

export default Pin;
