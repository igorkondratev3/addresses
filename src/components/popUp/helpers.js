export const getCoordinates = (where, howFar) => {
  let position = {};
  let xTranslateStartPosition;
  let yTranslateStartPosition;
  let transformEndPosition;
  switch (where) {
    case 'top':
      position.left = '50%';
      position.top = '0';
      xTranslateStartPosition = '-50%';
      yTranslateStartPosition = '-100%';
      transformEndPosition = `translate(-50%, ${howFar})`;
      break;

    case 'bottom':
      position.left = '50%';
      position.bottom = '0';
      xTranslateStartPosition = '-50%';
      yTranslateStartPosition = '100%';
      transformEndPosition = `translate(-50%, -${howFar})`;
      break;

    case 'left':
      position.top = '50%';
      position.left = '0';
      yTranslateStartPosition = '-50%';
      xTranslateStartPosition = '-100%';
      transformEndPosition = `translate(${howFar}, -50%)`;
      break;

    case 'right':
      position.top = '50%';
      position.right = '0';
      yTranslateStartPosition = '-50%';
      xTranslateStartPosition = '100%';
      transformEndPosition = `translate(-${howFar}, -50%)`;
      break;

    default:
      position.left = '50%';
      position.top = '0';
      xTranslateStartPosition = '-50%';
      yTranslateStartPosition = '-100%';
      transformEndPosition = `translate(-50%, ${howFar})`;
      break;
  }

  return {
    position,
    xTranslateStartPosition,
    yTranslateStartPosition,
    transformEndPosition
  };
};
