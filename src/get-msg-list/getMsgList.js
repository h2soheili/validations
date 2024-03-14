import { getMsgListApi } from "./getMsgList.api";
import { useText } from "@uxid/utils";
const { replaceCp1252ToUtf8 } = useText();

export const getMsgList = async () => {
  const result = await getMsgListApi();
  let data = {};
  try {
    result.map((item) => {
      let newObj = {}
      newObj[item.ERRORCODE] = replaceCp1252ToUtf8(item.ERRORDESC)
    return  data = {...data , ...newObj}
    });
  } catch (error) {
    return {};
  }
  return data;
};
