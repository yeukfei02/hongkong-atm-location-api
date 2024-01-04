import { Response, Result } from "../interface/hongkong-atm-location";
import axios from "axios";

export const handler = async (event, context) => {
  let response = {};

  if (event) {
    if (event.queryStringParameters) {
      const lang = event.queryStringParameters.lang;
      const result = await getHongKongAtmLocation(lang);
      if (result) {
        response = {
          message: "getHongKongAtmLocation",
          records: result.records,
          count: result.datasize,
        };
      }
    }
  }

  return response;
};

const getHongKongAtmLocation = async (
  lang: string,
): Promise<Result | undefined> => {
  let result;

  try {
    const rootUrl =
      "https://api.hkma.gov.hk/public/bank-svf-info/banks-atm-locator";
    const response = await axios.get(`${rootUrl}`, {
      params: {
        lang: lang || "tc",
        pageSize: 100000,
      },
    });
    if (response) {
      const responseData: Response = response.data;
      if (responseData) {
        result = responseData.result;
      }
    }
  } catch (e) {
    console.log("getHongKongAtmLocation error = ", e);
  }

  return result;
};
