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

const Carousel = ({ slide, onChange, children, sx = [] }) => {
  const [lastSlide, setLastSlide] = useState(0);

  const handleDragEnd = (event, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) {
      setLastSlide(slide);
      onChange(slide + 1);
    } else if (swipe > swipeConfidenceThreshold) {
      setLastSlide(slide);
      onChange(slide - 1);
    }
  };

  const slideIndex = wrap(0, Children.count(children), slide);
  const direction = slide - lastSlide;

  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          overflowX: "hidden",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AnimatePresence initial={false} custom={direction}>
        <CarouselSlide
          key={slide}
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
  slide: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Carousel;
