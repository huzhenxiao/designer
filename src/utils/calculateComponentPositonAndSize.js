import { getCenterPoint, calculateRotatedPointCoordinate } from './translate';

// 根据左上点和对称点计算出中心点，根据中心点和旋转角逆向计算出旋转前的左上和对称点坐标，其他3个角同理
function calculateLeftTop(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint } = pointInfo;
  const newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  const newTopLeftPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate.value
  );
  const newBottomRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate.value
  );
  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (needLockProportion) {
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width.value = Math.round(newWidth);
    style.height.value = Math.round(newHeight);
    style.left.value = Math.round(newTopLeftPoint.x);
    style.top.value = Math.round(newTopLeftPoint.y);
  }
}

function calculateRightTop(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint } = pointInfo;
  const newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  const newTopRightPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate.value
  );
  const newBottomLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate.value
  );
  const newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  const newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
  if (needLockProportion) {
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width.value = Math.round(newWidth);
    style.height.value = Math.round(newHeight);
    style.left.value = Math.round(newBottomLeftPoint.x);
    style.top.value = Math.round(newTopRightPoint.y);
  }
}

function calculateRightBottom(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint } = pointInfo;
  const newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  const newTopLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate.value
  );
  const newBottomRightPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate.value
  );

  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (needLockProportion) {
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width.value = Math.round(newWidth);
    style.height.value = Math.round(newHeight);
    style.left.value = Math.round(newTopLeftPoint.x);
    style.top.value = Math.round(newTopLeftPoint.y);
  }
}

function calculateLeftBottom(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint } = pointInfo;
  const newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  const newBottomLeftPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate.value
  );
  const newTopRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate.value
  );
  const newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  const newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
  if (needLockProportion) {
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width.value = Math.round(newWidth);
    style.height.value = Math.round(newHeight);
    style.left.value = Math.round(newBottomLeftPoint.x);
    style.top.value = Math.round(newTopRightPoint.y);
  }
}

// top点只能使用y坐标，x坐标是不准的，以curPoint为中心逆向再正向旋转得到旋转后的top点正确坐标，其他3个点同理
function calculateTop(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate.value
  );
  const rotatedTopMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedCurPositon.y
    },
    curPoint,
    style.rotate.value
  );

  const newHeight = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newHeight > 0) {
    const newCenterPoint = {
      x: (rotatedTopMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedTopMiddlePoint.y + symmetricPoint.y) / 2
    };
    let width = style.width.value;
    if (needLockProportion) {
      width = newHeight * proportion;
    }

    style.width.value = width;
    style.height.value = Math.round(newHeight);
    style.top.value = Math.round(newCenterPoint.y - newHeight / 2);
    style.left.value = Math.round(newCenterPoint.x - width / 2);
  }
}

function calculateRight(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate.value
  );
  const rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedCurPositon.x,
      y: curPoint.y
    },
    curPoint,
    style.rotate.value
  );

  const newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newWidth > 0) {
    const newCenterPoint = {
      x: (rotatedRightMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedRightMiddlePoint.y + symmetricPoint.y) / 2
    };
    let height = style.height.value;
    if (needLockProportion) {
      height = newWidth * proportion;
    }

    style.height.value = height;
    style.width.value = Math.round(newWidth);
    style.top.value = Math.round(newCenterPoint.y - height / 2);
    style.left.value = Math.round(newCenterPoint.x - newWidth / 2);
  }
}

function calculateBottom(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate.value
  );
  const rotatedBottomMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedCurPositon.y
    },
    curPoint,
    style.rotate.value
  );

  const newHeight = Math.sqrt(
    (rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newHeight > 0) {
    const newCenterPoint = {
      x: (rotatedBottomMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedBottomMiddlePoint.y + symmetricPoint.y) / 2
    };
    let width = style.width.value;
    if (needLockProportion) {
      width = newHeight * proportion;
    }

    style.width.value = width;
    style.height.value = Math.round(newHeight);
    style.top.value = Math.round(newCenterPoint.y - newHeight / 2);
    style.left.value = Math.round(newCenterPoint.x - width / 2);
  }
}

function calculateLeft(style, curPosition, proportion, needLockProportion, pointInfo) {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate.value
  );
  const rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedCurPositon.x,
      y: curPoint.y
    },
    curPoint,
    style.rotate.value
  );

  const newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newWidth > 0) {
    const newCenterPoint = {
      x: (rotatedRightMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedRightMiddlePoint.y + symmetricPoint.y) / 2
    };
    let height = style.height.value;
    if (needLockProportion) {
      height = newWidth * proportion;
    }

    style.height.value = height;
    style.width.value = Math.round(newWidth);
    style.top.value = Math.round(newCenterPoint.y - height / 2);
    style.left.value = Math.round(newCenterPoint.x - newWidth / 2);
  }
}

const funcs = {
  lt: calculateLeftTop,
  t: calculateTop,
  rt: calculateRightTop,
  r: calculateRight,
  rb: calculateRightBottom,
  b: calculateBottom,
  lb: calculateLeftBottom,
  l: calculateLeft
};

/**
 * @description:
 * @param {*} name  8个角名字
 * @param {*} style 样式
 * @param {*} curPosition  鼠标移动实时坐标
 * @param {*} proportion   宽高比
 * @param {*} needLockProportion  是否锁定宽高比
 * @param {*} pointInfo  初始对称点信息
 * @return {*}
 */
export default function calculateComponentPositonAndSize(
  name,
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  funcs[name](style, curPosition, proportion, needLockProportion, pointInfo);
}
