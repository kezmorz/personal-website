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

const Carousel = ({ children }) => {
  const carouselEl = useRef(null);
  const [index, setIndex] = useState(0);
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
    const controls = animate(
      x,
      -index * (carouselEl.current?.clientWidth || 0),
      { type: "spring", bounce: 0 }
    );
    return controls.stop;
  }, [index]);

  const handleDragEnd = (_, dragProps) => {
    const { offset, velocity } = dragProps;
    const clientWidth = carouselEl.current?.clientWidth || 0;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, -index * (carouselEl.current?.clientWidth || 0), {
        type: "spring",
        bounce: 0,
      });
      return;
    }

    if (offset.x > clientWidth / 4) {
      setIndex(index - 1);
    } else if (offset.x < -clientWidth / 4) {
      setIndex(index + 1);
    } else {
      animate(x, -index * (carouselEl.current?.clientWidth || 0), {
        type: "spring",
        bounce: 0,
      });
    }
  };

  return (
    <CarouselRoot ref={carouselEl}>
      {range.map((slide) => {
        const slideModulo = (index + slide) % Children.count(children);
        const slideIndex =
          slideModulo < 0
            ? slideModulo + Children.count(children)
            : slideModulo;
        return (
          <CarouselSlide
            key={index + slide}
            draggable
            drag="x"
            dragElastic={1}
            onDragEnd={handleDragEnd}
            sx={{
              // x,
              left: `${(index + slide) * 100}%`,
              right: `${(index + slide) * 100}%`,
            }}
            style={{ x }}
          >
            {children[slideIndex]}
          </CarouselSlide>
        );
      })}
    </CarouselRoot>
  );
};

Carousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Carousel;
