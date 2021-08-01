import { getCenterPoint, calculateRotatedPointCoordinate } from "./translate";

// 根据左上点和对称点计算出中心点，根据中心点和旋转角逆向计算出旋转前的左上和对称点坐标，其他3个角同理
function calculateLeftTop(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  let newTopLeftPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate
  );
  let newBottomRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  );
  let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;

  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newTopLeftPoint.x += Math.abs(newWidth - newHeight * proportion);
      newWidth = newHeight * proportion;
    } else {
      newTopLeftPoint.y += Math.abs(newHeight - newWidth / proportion);
      newHeight = newWidth / proportion;
    }

    // 由于现在求的未旋转前的坐标是以没按比例缩减宽高前的坐标来计算的
    // 所以缩减宽高后，需要按照原来的中心点旋转回去，获得缩减宽高并旋转后对应的坐标
    // 然后以这个坐标和对称点获得新的中心点，并重新计算未旋转前的坐标
    const rotatedTopLeftPoint = calculateRotatedPointCoordinate(
      newTopLeftPoint,
      newCenterPoint,
      style.rotate
    );
    newCenterPoint = getCenterPoint(rotatedTopLeftPoint, symmetricPoint);
    newTopLeftPoint = calculateRotatedPointCoordinate(
      rotatedTopLeftPoint,
      newCenterPoint,
      -style.rotate
    );
    newBottomRightPoint = calculateRotatedPointCoordinate(
      symmetricPoint,
      newCenterPoint,
      -style.rotate
    );
    newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
    newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newTopLeftPoint.x);
    style.top = Math.round(newTopLeftPoint.y);
  }
}

function calculateRightTop(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  let newTopRightPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate
  );
  let newBottomLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  );
  let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newTopRightPoint.x -= Math.abs(newWidth - newHeight * proportion);
      newWidth = newHeight * proportion;
    } else {
      newTopRightPoint.y += Math.abs(newHeight - newWidth / proportion);
      newHeight = newWidth / proportion;
    }
    const rotatedTopRightPoint = calculateRotatedPointCoordinate(
      newTopRightPoint,
      newCenterPoint,
      style.rotate
    );
    newCenterPoint = getCenterPoint(rotatedTopRightPoint, symmetricPoint);
    newTopRightPoint = calculateRotatedPointCoordinate(
      rotatedTopRightPoint,
      newCenterPoint,
      -style.rotate
    );
    newBottomLeftPoint = calculateRotatedPointCoordinate(
      symmetricPoint,
      newCenterPoint,
      -style.rotate
    );
    newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
    newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newBottomLeftPoint.x);
    style.top = Math.round(newTopRightPoint.y);
  }
}

function calculateRightBottom(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  let newTopLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  );
  let newBottomRightPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate
  );

  let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newBottomRightPoint.x -= Math.abs(newWidth - newHeight * proportion);
      newWidth = newHeight * proportion;
    } else {
      newBottomRightPoint.y -= Math.abs(newHeight - newWidth / proportion);
      newHeight = newWidth / proportion;
    }
    const rotatedBottomRightPoint = calculateRotatedPointCoordinate(
      newBottomRightPoint,
      newCenterPoint,
      style.rotate
    );
    newCenterPoint = getCenterPoint(rotatedBottomRightPoint, symmetricPoint);
    newBottomRightPoint = calculateRotatedPointCoordinate(
      rotatedBottomRightPoint,
      newCenterPoint,
      -style.rotate
    );
    newTopLeftPoint = calculateRotatedPointCoordinate(
      symmetricPoint,
      newCenterPoint,
      -style.rotate
    );
    newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
    newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newTopLeftPoint.x);
    style.top = Math.round(newTopLeftPoint.y);
  }
}

function calculateLeftBottom(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPosition, symmetricPoint);
  let newBottomLeftPoint = calculateRotatedPointCoordinate(
    curPosition,
    newCenterPoint,
    -style.rotate
  );
  let newTopRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  );
  let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
  if (needLockProportion) {
    if(newWidth/newHeight > proportion){
      newBottomLeftPoint.x += Math.abs(newWidth - newHeight*proportion)
      newWidth = newHeight*proportion
    }else{
      newBottomLeftPoint.y -= Math.abs(newHeight - newWidth/proportion)
      newHeight = newWidth/proportion
    }
    const rotatedBottomLeftPoint = calculateRotatedPointCoordinate(newBottomLeftPoint,newCenterPoint,style.rotate)
    newCenterPoint = getCenterPoint(rotatedBottomLeftPoint,symmetricPoint)
    newBottomLeftPoint = calculateRotatedPointCoordinate(rotatedBottomLeftPoint,newCenterPoint,-style.rotate)
    newTopRightPoint = calculateRotatedPointCoordinate(symmetricPoint,newCenterPoint,-style.rotate)
    newWidth = newTopRightPoint.x - newBottomLeftPoint.x
    newHeight = newBottomLeftPoint.y - newTopRightPoint.y
  }
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newBottomLeftPoint.x);
    style.top = Math.round(newTopRightPoint.y);
  }
}

// top点只能使用y坐标，x坐标是不准的，以curPoint为中心逆向再正向旋转得到旋转后的top点正确坐标，其他3个点同理
function calculateTop(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint, curPoint } = pointInfo;
  let rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate
  );
  let rotatedTopMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedCurPositon.y,
    },
    curPoint,
    style.rotate
  );

  let newHeight = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newHeight > 0) {
    const newCenterPoint = {
      x: (rotatedTopMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedTopMiddlePoint.y + symmetricPoint.y) / 2,
    };
    let width = style.width;
    // 因为调整的是高度，所以需要根据锁定的比例调整宽度
    if (needLockProportion) {
      width = newHeight * proportion;
    }

    style.width = width;
    style.height = Math.round(newHeight);
    style.top = Math.round(newCenterPoint.y - newHeight / 2);
    style.left = Math.round(newCenterPoint.x - width / 2);
  }
}

function calculateRight(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint, curPoint } = pointInfo;
  let rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate
  );
  let rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedCurPositon.x,
      y: curPoint.y,
    },
    curPoint,
    style.rotate
  );

  let newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newWidth > 0) {
    const newCenterPoint = {
      x: (rotatedRightMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedRightMiddlePoint.y + symmetricPoint.y) / 2,
    };
    let height = style.height;
    // 因为调整的是宽度，所以需要根据锁定的比例调整高度
    if (needLockProportion) {
      height = newWidth / proportion;
    }

    style.height = height;
    style.width = Math.round(newWidth);
    style.top = Math.round(newCenterPoint.y - height / 2);
    style.left = Math.round(newCenterPoint.x - newWidth / 2);
  }
}

function calculateBottom(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint, curPoint } = pointInfo;
  let rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate
  );
  let rotatedBottomMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedCurPositon.y,
    },
    curPoint,
    style.rotate
  );

  let newHeight = Math.sqrt(
    (rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newHeight > 0) {
    const newCenterPoint = {
      x: (rotatedBottomMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedBottomMiddlePoint.y + symmetricPoint.y) / 2,
    };
    let width = style.width;
    // 因为调整的是高度 所以需要根据锁定的比例调整宽度
    if (needLockProportion) {
      width = newHeight * proportion;
    }

    style.width = width;
    style.height = Math.round(newHeight);
    style.top = Math.round(newCenterPoint.y - newHeight / 2);
    style.left = Math.round(newCenterPoint.x - width / 2);
  }
}

function calculateLeft(
  style,
  curPosition,
  proportion,
  needLockProportion,
  pointInfo
) {
  const { symmetricPoint, curPoint } = pointInfo;
  let rotatedCurPositon = calculateRotatedPointCoordinate(
    curPosition,
    curPoint,
    -style.rotate
  );
  let rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedCurPositon.x,
      y: curPoint.y,
    },
    curPoint,
    style.rotate
  );

  let newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );
  if (newWidth > 0) {
    const newCenterPoint = {
      x: (rotatedRightMiddlePoint.x + symmetricPoint.x) / 2,
      y: (rotatedRightMiddlePoint.y + symmetricPoint.y) / 2,
    };
    let height = style.height;
    // 因为调整的是宽度 所以需要根据锁定的比例调整高度
    if (needLockProportion) {
      height = newWidth / proportion;
    }

    style.height = height;
    style.width = Math.round(newWidth);
    style.top = Math.round(newCenterPoint.y - height / 2);
    style.left = Math.round(newCenterPoint.x - newWidth / 2);
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
  l: calculateLeft,
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
