import { Response, Result } from "../interface/hongkong-atm-location";
import axios from "axios";

export const handler = async (event: any, context: any) => {
  console.log("event = ", event);

  let response = {};

  if (event) {
    const lang = event.queryStringParameters
      ? event.queryStringParameters.lang
      : "tc";
    const result = await getHongKongAtmLocation(lang);
    console.log("### result = ", result);

    if (result) {
      const data = {
        message: "getHongKongAtmLocation",
        records: result.records,
        count: result.datasize,
      };

      response = {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
  }

  console.log("response = ", response);
  return response;
};

const getHongKongAtmLocation = async (
  lang: string
): Promise<Result | undefined> => {
  let result;

  try {
    const rootUrl =
      "https://api.hkma.gov.hk/public/bank-svf-info/banks-atm-locator";
    const response = await axios.get(`${rootUrl}`, {
      params: {
        lang: lang || "tc",
        pagesize: "100000",
      },
    });
    console.log("response = ", response);

    if (response) {
      const responseData: Response = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        result = responseData.result;
      }
    }
  } catch (e) {
    console.log("getHongKongAtmLocation error = ", e);
  }

  return result;
};
