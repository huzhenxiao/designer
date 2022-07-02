import { reactive } from "vue";
import { getPointList } from "@/apis";

export default function usePointData() {
  const queryList = reactive({
    isUnited: "",
    currentPage: 1,
    pageSize: 15,
    search: "",
    gatewayCode: "",
    gatewayCodeSymbol: "",
    gatewayName: "",
    gatewayNameSymbol: "",
    name: "",
    nameSymbol: "",
    code: "",
    codeSymbol: "like",
    facName: "",
    time: "",
    timeSign: "",
    starttime: "",
    endtime: "",
    online: "",
    onlineSymbol: "",
    type: "",
    typeSymbol: "",
    tag: "",
    ctrType: "",
    categoryName: "",
    selectedId: ""
  });
  const tableData = reactive({
    list: [],
    total: 0
  });
  const getPointData = () => {
    return getPointList({
      isUnited: queryList.isUnited,
      gatewayName: queryList.gatewayName,
      gatewayNameSymbol: queryList.gatewayNameSymbol,
      gatewayCode: queryList.gatewayCode,
      gatewayCodeSymbol: queryList.gatewayCodeSymbol,
      online: queryList.online,
      onlineSymbol: queryList.onlineSymbol,
      categoryName: queryList.categoryName,
      categoryId: queryList.selectedId || -1,
      search: queryList.search,
      name: queryList.name,
      nameSign: queryList.nameSymbol,
      code: queryList.code,
      codeSign: queryList.codeSymbol,
      facName: queryList.facName,
      time: queryList.time,
      timeSign: queryList.timeSign,
      pageSize: queryList.pageSize,
      pageNum: queryList.currentPage,
      starttime: queryList.starttime,
      endtime: queryList.endtime,
      type: queryList.type,
      typeSymbol: queryList.typeSymbol,
      tag: queryList.tag,
      ctrType: queryList.ctrType
    }).then(res => {
      if (res && res.result) {
        tableData.list = res.result.list || [];
        tableData.total = res.result.total;
      }
    });
  };
  return {
    queryList,
    tableData,
    getPointData
  };
}
