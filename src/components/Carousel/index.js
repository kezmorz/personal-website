import { useRef, useState, Children, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@/utils/math";

const swipeConfidenceThreshold = 10000;

const variants = {
  enter: ({ width, direction }) => ({
    x: direction > 0 ? width : -width,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: ({ width, direction }) => ({
    x: direction < 0 ? width : -width,
    opacity: 0,
  }),
};

const CarouselSlide = styled(motion.div)({
  gridRowStart: 1,
  gridColumnStart: 1,
});

const Carousel = ({ slide, onChange, children, sx = [] }) => {
  const containerElement = useRef(null);
  const [{ lastSlide, lastDirection }, setProperties] = useState({
    lastSlide: slide,
    lastDirection: 0,
  });

  useEffect(() => {
    if (slide !== lastSlide) {
      setProperties(({ lastSlide: prevLastSlide }) => ({
        lastSlide: slide,
        lastDirection: slide - prevLastSlide,
      }));
    }
  }, [slide]);

  const handleDragEnd = (event, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) {
      onChange(slide + 1);
    } else if (swipe > swipeConfidenceThreshold) {
      onChange(slide - 1);
    }
  };

  const width = containerElement.current?.offsetWidth || 0;
  const direction = slide !== lastSlide ? slide - lastSlide : lastDirection;
  const slideIndex = wrap(0, Children.count(children), lastSlide);

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
      ref={containerElement}
    >
      <AnimatePresence initial={false}>
        <CarouselSlide
          key={lastSlide}
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
          custom={{ width: width, direction: direction }}
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
