import axios from "axios";
import CryptoJS from "crypto-js";
import { NCP_accessKey, NCP_secretKey, NCP_serviceID } from "env";

const Cache = require("memory-cache");

export function send_message(phone) {
  console.log(phone);
  var user_phone_number = phone;
  const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  Cache.put(phone, verifyCode.toString());
  var resultCode = 404;
  const date = Date.now().toString();
  const uri = process.env.NCP_serviceID || NCP_serviceID;
  const secretKey = process.env.NCP_secretKey || NCP_secretKey;
  const accessKey = process.env.NCP_accessKey || NCP_accessKey;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  axios
    .post(
      url,
      {
        type: "SMS",
        countryCode: "82",
        from: "01062848167",
        content: `인증번호 ${verifyCode} 입니다.`,
        messages: [
          {
            to: `${user_phone_number}`,
          },
        ],
      },
      {
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": accessKey,
          "x-ncp-apigw-timestamp": Number(date),
          "x-ncp-apigw-signature-v2": signature,
        },
      }
    )
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  return resultCode;
}

/**인증번호 인증 */
export const verify = function (req, res) {
  const phoneNumber = req.phoneNumber;
  const verifyCode = req.verifyCode;

  const CacheData = Cache.get(phoneNumber);

  if (!CacheData) {
    return "try";
  } else if (CacheData !== verifyCode) {
    return "different";
  } else {
    Cache.del(phoneNumber);
    return "success";
  }
};
