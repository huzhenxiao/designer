import { reactive } from 'vue';
import { getPointParseAlarm } from '@/apis';
import cloneDeep from 'lodash/cloneDeep';
const default_customRule_creater = () => ({
  id: '',
  min: null,
  max: null,
  content: '',
  textcolor: ''
});

export default function useRules() {
  const platformRules = reactive([]);
  const customRules = reactive([]);
  const initData = ({ code, oldPlatFormRules, oldCustomRules }) => {
    platformRules.length = 0;
    customRules.length = 0;
    getPointParseAlarm({ code }).then((res) => {
      if (res) {
        // 把上一次存的规则和最新获取的平台规则合并
        (res.result || []).forEach((item) => {
          const findRuleById = oldPlatFormRules.find((i) => i.id === item.id) || {};
          platformRules.push({
            id: item.id,
            chara: item.chara,
            type: item.type,
            value: item.value,
            bufferValue: item.bufferValue,
            content: findRuleById.content || '',
            textcolor: findRuleById.textcolor || ''
          });
        });
      }
    });
    oldCustomRules.forEach((i) => {
      customRules.push(cloneDeep(i));
    });
  };
  const delRow = (ruleType, idx) => {
    if (ruleType === 'platform') {
      platformRules.splice(idx, 1);
    } else if (ruleType === 'custom') {
      customRules.splice(idx, 1);
    }
  };

  const addRow = () => {
    customRules.push(default_customRule_creater());
  };
  return {
    platformRules,
    customRules,
    initData,
    addRow,
    delRow
  };
}
