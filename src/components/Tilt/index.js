import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

const TiltContainer = styled(motion.div)({});

const Tilt = ({ perspective, angle, children }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [-angle, angle], {
    clamp: true,
  });
  const rotateY = useTransform(x, [0, 1], [angle, -angle], {
    clamp: true,
  });

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    const xValue = (event.clientX - bounds.x) / event.currentTarget.clientWidth;
    const yValue =
      (event.clientY - bounds.y) / event.currentTarget.clientHeight;

    animate(x, xValue);
    animate(y, yValue);
  };

  const handlePointerLeave = () => {
    animate(x, 0.5);
    animate(y, 0.5);
  };

  return (
    <Box
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      sx={{ perspective: perspective }}
    >
      <TiltContainer style={{ rotateX, rotateY }} whileHover={{ scale: 1.02 }}>
        {children}
      </TiltContainer>
    </Box>
  );
};

Tilt.propTypes = {
  perspective: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default Tilt;
