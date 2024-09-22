// SlideDot.tsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface SwiperLoopDotProps {
  active: boolean;
  onClick: () => void;
  style: React.CSSProperties;
}

// используем forwardRef для передачи внутрь компонента
const SlideDotComponent = forwardRef<HTMLDivElement, SwiperLoopDotProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ active, ...rest }, ref) => (
    <div ref={ref} {...rest} />
  )
);

const SwiperLoopDot = styled(SlideDotComponent)<SwiperLoopDotProps>`
  position: absolute;
  width: ${({ active }) => (active ? '50px' : '6px')};
  height: ${({ active }) => (active ? '50px' : '6px')};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? ' rgb(238, 242, 250)' : 'rgba(66, 86, 122, 1)')};
  color: ${({ active }) => (active ? 'rgba(66, 86, 122, 1)' : 'transparent')};
  border: ${({ active }) => (active ? '1px solid black' : '1px')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  &:hover {
    width: 50px;
    height: 50px;
    background-color: rgb(238, 242, 250);
    border: 1px solid black;
  }
`;

export default SwiperLoopDot;
