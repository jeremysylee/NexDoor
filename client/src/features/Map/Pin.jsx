import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RequestCardTiny from '../Request/RequestCardTiny';

const PinContainer = styled.div`
  height: 50px;
  width: 50px;
  position: relative;
  transform: translate(-50%, -100%);
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

  return (
    <>
      {selectedTask.task_id === task.task_id && <RequestCardTiny task={task} />}
      <PinContainer
        // style={{
        //   position: 'absolute',
        //   transform: 'translate(-50%, -100%)',
        // }}
        onClick={clickHandler}
      >
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
      </PinContainer>
    </>
  );
};

// export default ({ task }) => (
//   <PinContainer
//     style={{
//       height: '50px',
//       width: '50px',
//       position: 'absolute',
//       transform: 'translate(-50%, -100%)',
//     }}
//   >
//     <RequestCardTiny task={task}/>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
//       <linearGradient id="iu22Zjf0u3e5Ts0QLZZhJa" x1="11.274" x2="36.726" y1="9.271" y2="34.723" gradientUnits="userSpaceOnUse">
//         <stop offset="0" stopColor="#d43a02" />
//         <stop offset="1" stopColor="#b9360c" />
//       </linearGradient>
//       <path
//         fill="url(#iu22Zjf0u3e5Ts0QLZZhJa)"
//         d="M36.902,34.536C40.052,31.294,42,26.877,42,22c0-9.94-8.06-18-18-18S6,12.06,6,22
//         c0,4.877,1.948,9.294,5.098,12.536c0.018,0.019,0.03,0.04,0.048,0.059l0.059,0.059c0.047,0.048,0.094,0.095,0.142,0.142
//         l11.239,11.239c0.781,0.781,2.047,0.781,2.828,0l11.239-11.239c0.048-0.047,0.095-0.094,0.142-0.142l0.059-0.059
//         C36.873,34.576,36.885,34.554,36.902,34.536z"
//       />
//       <radialGradient
//         id="iu22Zjf0u3e5Ts0QLZZhJb"
//         cx="24"
//         cy="22.5"
//         r="9.5"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop offset=".177" />
//         <stop
//           offset="1"
//           stopOpacity="0"
//         />
//       </radialGradient>
//       <circle cx="24" cy="22.5" r="9.5" fill="url(#iu22Zjf0u3e5Ts0QLZZhJb)" />
//       <circle cx="24" cy="22" r="8" fill="#f9f9f9" />
//       <radialGradient id="iu22Zjf0u3e5Ts0QLZZhJc" cx="23.842" cy="43.905" r="13.637" gradientUnits="userSpaceOnUse">
//         <stop offset=".177" />
//         <stop offset="1" stopOpacity="0" />
//       </radialGradient>
//       <path
//         fill="url(#iu22Zjf0u3e5Ts0QLZZhJc)"
//         d="M24,30c-4.747,0-8.935,2.368-11.467,5.982l10.052,10.052c0.781,0.781,2.047,0.781,2.828,0
//         l10.052-10.052C32.935,32.368,28.747,30,24,30z"
//       />
//       <path
//         fill="#de490d"
//         d="M24,32c-4.196,0-7.884,2.157-10.029,5.42l8.615,8.615c0.781,0.781,2.047,0.781,2.828,0l8.615-8.615
//           C31.884,34.157,28.196,32,24,32z"
//       />
//     </svg>
//   </PinContainer>
// );

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
