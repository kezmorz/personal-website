import { useRef, useState, useMemo, useEffect, Children } from "react";
import PropTypes from "prop-types";
import { motion, animate, useMotionValue } from "framer-motion";
import { styled } from "@mui/material/styles";

const CarouselRoot = styled(motion.div)({
  position: "relative",
  width: "100%",
  height: "100%",
  overflowX: "hidden",
});

const CarouselSlide = styled(motion.div)({
  position: "absolute",
  width: "100%",
  height: "100%",
  // padding: "12px",
  // boxSizing: "border-box"
});

const Carousel = ({ index, onChangeIndex, children }) => {
  const carouselEl = useRef(null);
  const [latestIndex, setLatestIndex] = useState(index || 0);
  const x = useMotionValue(0);

  const range = useMemo(
    () => [
      ...Children.map(children, (_, childIndex) => -childIndex)
        .filter((childIndex) => childIndex !== -0)
        .reverse(),
      ...Children.map(children, (_, childIndex) => childIndex),
    ],
    [children]
  );

  useEffect(() => {
    setLatestIndex(index);
  }, [index]);

  useEffect(() => {
    const controls = animate(
      x,
      -latestIndex * (carouselEl.current?.clientWidth || 0),
      { type: "spring", bounce: 0 }
    );
    if (onChangeIndex) {
      onChangeIndex(latestIndex);
    }
    return controls.stop;
  }, [latestIndex]);

  const handleDragEnd = (_, dragProps) => {
    const { offset, velocity } = dragProps;
    const clientWidth = carouselEl.current?.clientWidth || 0;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, -latestIndex * (carouselEl.current?.clientWidth || 0), {
        type: "spring",
        bounce: 0,
      });
      return;
    }

    if (offset.x > clientWidth / 4) {
      setLatestIndex(latestIndex - 1);
    } else if (offset.x < -clientWidth / 4) {
      setLatestIndex(latestIndex + 1);
    } else {
      animate(x, -latestIndex * (carouselEl.current?.clientWidth || 0), {
        type: "spring",
        bounce: 0,
      });
    }
  };

  return (
    <CarouselRoot ref={carouselEl}>
      {range.map((slide) => {
        const slideModulo = (latestIndex + slide) % Children.count(children);
        const slideIndex =
          slideModulo < 0
            ? slideModulo + Children.count(children)
            : slideModulo;
        return (
          <CarouselSlide
            key={latestIndex + slide}
            draggable
            drag="x"
            dragElastic={1}
            onDragEnd={handleDragEnd}
            style={{ x }}
            sx={{
              left: `${(latestIndex + slide) * 100}%`,
              right: `${(latestIndex + slide) * 100}%`,
            }}
          >
            {children[slideIndex]}
          </CarouselSlide>
        );
      })}
    </CarouselRoot>
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
