import { useState, Children } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@/utils/math";

const swipeConfidenceThreshold = 10000;

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const CarouselSlide = styled(motion.div)({
  gridRowStart: 1,
  gridColumnStart: 1,
});

const Carousel = ({ index, onChangeIndex, children }) => {
  const [lastIndex, setLastIndex] = useState(0);

  const handleDragEnd = (event, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) {
      setLastIndex(index);
      onChangeIndex(index + 1);
    } else if (swipe > swipeConfidenceThreshold) {
      setLastIndex(index);
      onChangeIndex(index - 1);
    }
  };

  const slideIndex = wrap(0, Children.count(children), index);
  const direction = index - lastIndex;

  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "1fr", overflowX: "hidden" }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <CarouselSlide
          key={index}
          variants={variants}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          initial="enter"
          animate="animate"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          custom={direction}
        >
          {children[slideIndex]}
        </CarouselSlide>
      </AnimatePresence>
    </Box>
  );
};

Carousel.propTypes = {
  index: PropTypes.number,
  onChangeIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Carousel;
