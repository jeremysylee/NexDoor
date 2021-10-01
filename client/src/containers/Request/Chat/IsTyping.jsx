import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MyText = styled.div`
  text-align: right;
  background-color: #4496B4;
  border-radius: 22px;
  width: fit-content;
  padding: 6px 2px 6px 24px;
  color: white;
  font-size: 14px;
  margin: 0.4em 3.5em;
`;

const YourText = styled(MyText)`
  text-align: left;
  background-color: white;
  color: black;
  margin-left: 10%;
  margin: 10px 10px;
  padding: 4px 31px 5px 19px;
`;

const IsTypingContainer = styled(YourText)`
  background-color: #c7c7c7;
  color: white;
  margin-left: 7px;
  padding: 9px;
`;

const BubbleContainer = styled.div`
  position: relative;
`;

const BubbleLarger = styled.div`
  height: 8px;
  width: 8px;
  position: absolute;
  transform: scale(1) translate(-9px, 8px);
  background-color: #c7c7c7;
  border-radius: 50%;
`;

const BubbleSmaller = styled(BubbleLarger)`
  height: 4px;
  width: 4px;
  transform: scale(1) translate(-12px, 14px);
`;

const Dot = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: white;
  margin-right: 2px;
`;

const IsTyping = () => {
  const leftBubble = {
    start: {
      opacity: 0,
      scale: 0,
      x: -40,
      y: 40,
    },
    end: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
  };

  const dotContainer = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const dot = {
    start: { opacity: 0.2 },
    end: { opacity: 0.8 },
  };

  const dotTransition = {
    duration: 0.8,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <Row>
      <motion.div
        initial="start"
        animate="end"
        variants={leftBubble}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          ease: 'easeInOut',
        }}
      >
        <Row>
          <IsTypingContainer>
            <BubbleContainer>
              <BubbleLarger />
              <BubbleSmaller />
            </BubbleContainer>
            <Row
              as={motion.div}
              initial="start"
              animate="end"
              variants={dotContainer}
            >
              <Dot
                as={motion.span}
                variants={dot}
                transition={dotTransition}
              />
              <Dot
                as={motion.span}
                variants={dot}
                transition={dotTransition}
              />
              <Dot
                as={motion.span}
                variants={dot}
                transition={dotTransition}
              />
            </Row>
          </IsTypingContainer>
        </Row>
      </motion.div>
    </Row>
  );
};

export default IsTyping;
