import React from 'react';
import { motion } from 'framer-motion';
import {
  Row,
  IsTypingContainer,
  BubbleContainer,
  BubbleLarger,
  BubbleSmaller,
  Dot,
} from './Chat.styles';

import {
  leftBubbleVariants,
  bubbleTransition,
  dotContainerVariants,
  dotVariants,
  dotTransition,
} from './Chat.motion';

const IsTyping = () => (
  <Row>
    <motion.div
      initial="start"
      animate="end"
      variants={leftBubbleVariants}
      transition={bubbleTransition}
    >
      <Row>
        <IsTypingContainer>
          <BubbleContainer>
            <BubbleLarger />
            <BubbleSmaller />
          </BubbleContainer>
          <Row
            as={motion.div}
            variants={dotContainerVariants}
            initial="start"
            animate="end"
          >
            <Dot
              as={motion.span}
              variants={dotVariants}
              transition={dotTransition}
            />
            <Dot
              as={motion.span}
              variants={dotVariants}
              transition={dotTransition}
            />
            <Dot
              as={motion.span}
              variants={dotVariants}
              transition={dotTransition}
            />
          </Row>
        </IsTypingContainer>
      </Row>
    </motion.div>
  </Row>
);

export default IsTyping;
