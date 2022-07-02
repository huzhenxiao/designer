import { reactive, onMounted } from 'vue';
import { mod360 } from 'utils/translate';

// 八个角
const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'];

// 每个点对应的初始角度
const initialAngle = {
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315
};

// 每个范围的角度对应的光标
const angleToCursor = [
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' }
];

export const useGetPointStyle = () => {
  const cursors = reactive({});

  const getPointStyle = (point, defaultStyle) => {
    const { width, height } = defaultStyle;
    let newLeft = 0;
    let newTop = 0;
    const hasT = /t/.test(point);
    const hasR = /r/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);

    if (point.length === 2) {
      // 四个角
      newLeft = hasL ? 0 : width.value;
      newTop = hasT ? 0 : height.value;
    } else {
      if (hasT || hasB) {
        newLeft = width.value / 2;
        newTop = hasT ? 0 : height.value;
      }
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width.value;
        newTop = height.value / 2;
      }
    }
    const style = {
      transform: 'translateX(-50%) translateY(-50%)',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: cursors[point]
    };
    return style;
  };

  const getCursor = (curComponent) => {
    if (!curComponent) return;
    const rotate = mod360(curComponent.style.rotate.value); // 取余 360
    pointList.forEach((point) => {
      const angle = mod360(initialAngle[point] + rotate);
      let len = -1;
      while (len < 8) {
        len++;
        const angleLimit = angleToCursor[len];
        if (angle >= 338 || angle < 23) {
          return (cursors[point] = 'nw-resize');
        }
        if (angleLimit.start <= angle && angleLimit.end > angle) {
          return (cursors[point] = `${angleLimit.cursor}-resize`);
        }
      }
    });
  };

  onMounted(() => {
    getCursor();
  });

  return {
    pointList,
    getCursor,
    getPointStyle
  };
};
