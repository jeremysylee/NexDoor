import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

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

const Pin = ({ task, showCard }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const clickHandler = () => {
    dispatch({ type: 'SET_TASK', task });
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: true });
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
      <AnimatePresence>
        {selectedTask.task_id === task.task_id && hovered && showCard && (
          <RequestCardTiny
            task={task}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        )}
      </AnimatePresence>
      <PinContainer
        onClick={clickHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!hovered ? (
          <svg width="30" height="43" viewBox="0 0 30 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6782 0C6.57169 0 0 6.56684 0 14.6674C0 15.3205 0.118889 16.114 0.291035 16.9214C0.798251 19.2672 1.69022 21.5129 2.93079 23.5674C6.29141 29.1648 14.6846 43 14.6846 43C14.6846 43 22.9326 29.3757 26.1506 24.0558C27.3825 22.0291 28.3106 19.8328 28.9055 17.5369C29.1664 16.5212 29.3563 15.4975 29.3563 14.6674C29.3563 6.56684 22.7846 0 14.6782 0ZM14.5969 21.5C13.2457 21.5 11.9248 21.0993 10.8012 20.3486C9.67772 19.5979 8.80204 18.5309 8.28493 17.2825C7.76783 16.0341 7.63253 14.6604 7.89615 13.3351C8.15977 12.0098 8.81046 10.7924 9.76594 9.83695C10.7214 8.88147 11.9388 8.23078 13.2641 7.96716C14.5894 7.70354 15.9631 7.83884 17.2114 8.35594C18.4598 8.87305 19.5269 9.74873 20.2776 10.8723C21.0283 11.9958 21.429 13.3167 21.429 14.6679C21.429 16.4799 20.7092 18.2177 19.4279 19.4989C18.1467 20.7802 16.4089 21.5 14.5969 21.5Z" fill="#F25816" />
            <circle cx="14.621" cy="14.622" r="8.82802" fill="white" />
          </svg>

        ) : (
          <svg width="30" height="43" viewBox="0 0 30 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6782 0C6.57169 0 0 6.56684 0 14.6674C0 15.3205 0.118889 16.114 0.291035 16.9214C0.798251 19.2672 1.69022 21.5129 2.93079 23.5674C6.29141 29.1648 14.6846 43 14.6846 43C14.6846 43 22.9326 29.3757 26.1506 24.0558C27.3825 22.0291 28.3106 19.8328 28.9055 17.5369C29.1664 16.5212 29.3563 15.4975 29.3563 14.6674C29.3563 6.56684 22.7846 0 14.6782 0ZM14.5969 21.5C13.2457 21.5 11.9248 21.0993 10.8012 20.3486C9.67772 19.5979 8.80204 18.5309 8.28493 17.2825C7.76783 16.0341 7.63253 14.6604 7.89615 13.3351C8.15977 12.0098 8.81046 10.7924 9.76594 9.83695C10.7214 8.88147 11.9388 8.23078 13.2641 7.96716C14.5894 7.70354 15.9631 7.83884 17.2114 8.35594C18.4598 8.87305 19.5269 9.74873 20.2776 10.8723C21.0283 11.9958 21.429 13.3167 21.429 14.6679C21.429 16.4799 20.7092 18.2177 19.4279 19.4989C18.1467 20.7802 16.4089 21.5 14.5969 21.5Z" fill="#F25816" />
            <path d="M14.5 2C7.59648 2 2 7.65054 2 14.6208C2 15.1827 2.10125 15.8655 2.24785 16.5603C2.67979 18.5788 3.4394 20.5111 4.49588 22.2789C7.3578 27.0953 14.5055 39 14.5055 39C14.5055 39 21.5295 27.2768 24.27 22.6992C25.3191 20.9553 26.1095 19.0654 26.6161 17.0899C26.8383 16.2159 27 15.335 27 14.6208C27 7.65054 21.4035 2 14.5 2ZM14.4308 20.5C13.2801 20.5 12.1552 20.1552 11.1984 19.5093C10.2416 18.8633 9.49586 17.9452 9.05549 16.871C8.61513 15.7968 8.49991 14.6147 8.7244 13.4744C8.9489 12.334 9.50303 11.2865 10.3167 10.4644C11.1304 9.64219 12.1671 9.0823 13.2957 8.85546C14.4244 8.62863 15.5942 8.74505 16.6574 9.19C17.7205 9.63495 18.6292 10.3884 19.2685 11.3552C19.9078 12.322 20.249 13.4585 20.249 14.6213C20.249 16.1804 19.636 17.6757 18.5449 18.7782C17.4538 19.8806 15.9739 20.5 14.4308 20.5Z" fill="white" />
            <circle cx="14.621" cy="14.622" r="8.82802" fill="#F25816" />
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
  showCard: PropTypes.bool.isRequired,
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
