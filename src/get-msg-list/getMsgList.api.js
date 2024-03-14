
import { ServiceApi } from "@uxid/service";
const authorization = "Basic cC5tYWxla2k6QUtCcmM1OCE=";

export const getMsgListApi = async () =>{
    try {
        const result = await ServiceApi.POST(
          'http://172.20.146.184:7801/dmnRefDatas/fnrRefDtMng/oprSrvCore2GetError',
          {},
          { Authorization: authorization }
        );
        return result.dmnRefDatas.fnrRefDtMng.oprSrvCore2GetError.Core2GetErrorList;
      } catch (error) {
        return false;
      }
}