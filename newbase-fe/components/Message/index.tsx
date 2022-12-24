// @ts-nocheck

import { message } from "antd";

export default function showMessage(
  msgType?: any,
  msgContent = "message.E35",
  objValue?: any,
  modifyMessage?: boolean
) {
  message.config({
    maxCount: 1,
  });

  let fieldMsg;
  if (objValue) {
    const key = (Object.keys(objValue) || [])[0];
    const val = objValue[key];
    if (modifyMessage) {
      fieldMsg = {
        [key]: `${val}`,
      };
    } else {
      fieldMsg = {
        [key]: `${val}`,
      };
    }
  }

  message[msgType]({
    content: msgContent,
    className: "event-message",
    duration: 3,
    maxCount: 1,
  });
}
