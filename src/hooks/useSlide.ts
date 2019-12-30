import React from 'reactn';
import {Image} from 'teko-product-discovery';

type SlideResult = [
  number,
  boolean,
  () => void,
  () => void,
  (index: number) => void,
  () => void,
  () => void,
];

export function useSlide(images: Image[]): SlideResult {
  const [animating, setAnimating] = React.useState<boolean>(false);

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handleNext = React.useCallback(
    () => {
      if (!animating) {
        setActiveIndex((activeIndex + 1) % images.length);
      }
    },
    [animating, activeIndex, images.length],
  );

  const handlePrev = React.useCallback(
    () => {
      if (!animating) {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
      }
    },
    [animating, activeIndex, images.length],
  );

  const handleGoToIndex = React.useCallback(
    (activeIndex: number) => {
      if (!animating) {
        setActiveIndex(activeIndex);
      }
    },
    [animating],
  );

  const handleExisting = React.useCallback(
    () => {
      setAnimating(true);
    },
    [setAnimating],
  );

  const handleExisted = React.useCallback(
    () => {
      setAnimating(false);
    },
    [setAnimating],
  );

  return [
    activeIndex,
    animating,
    handleNext,
    handlePrev,
    handleGoToIndex,
    handleExisting,
    handleExisted,
  ];
}
