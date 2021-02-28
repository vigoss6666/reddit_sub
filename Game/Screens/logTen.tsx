import { getBaseLog } from './getBaseLog';
import { serverData, serverDataWithDimension } from './SelfGame';

export function logTen(arr: serverData[] | serverData): serverDataWithDimension[] | serverDataWithDimension {
  if (Array.isArray(arr)) {
    const result = arr.map(val => ({
      ...val,
      charisma: parseFloat(getBaseLog(5, val.charisma).toFixed(1)),
      dimension: parseFloat(getBaseLog(5, val.charisma + val.creativity + val.empathetic + val.honest + val.humor + val.looks + val.status + val.wealthy).toFixed(1)),
      creativity: parseFloat(getBaseLog(5, val.creativity).toFixed(1)),
      honest: parseFloat(getBaseLog(5, val.honest).toFixed(1)),
      looks: parseFloat(getBaseLog(5, val.looks).toFixed(1)),
      empathetic: parseFloat(getBaseLog(5, val.empathetic).toFixed(1)),
      status: parseFloat(getBaseLog(5, val.status).toFixed(1)),
      wealthy: parseFloat(getBaseLog(5, val.wealthy).toFixed(1)),
      humor: parseFloat(getBaseLog(5, val.humor).toFixed(1)),
      narcissistic: parseFloat(getBaseLog(5, val.narcissistic).toFixed(1)),
    }

    ));
    return result;
  }
  return {
    ...arr,
    dimension: parseFloat(getBaseLog(5, arr.charisma + arr.creativity + arr.empathetic + arr.honest + arr.humor + arr.looks + arr.status + arr.wealthy).toFixed(1)),
    charisma: parseFloat(getBaseLog(5, arr.charisma).toFixed(1)),
    creativity: parseFloat(getBaseLog(5, arr.creativity).toFixed(1)),
    honest: parseFloat(getBaseLog(5, arr.honest).toFixed(1)),
    looks: parseFloat(getBaseLog(5, arr.looks).toFixed(1)),
    empathetic: parseFloat(getBaseLog(5, arr.empathetic).toFixed(1)),
    status: parseFloat(getBaseLog(5, arr.status).toFixed(1)),
    wealthy: parseFloat(getBaseLog(5, arr.wealthy).toFixed(1)),
    humor: parseFloat(getBaseLog(5, arr.humor).toFixed(1)),
    narcissistic: parseFloat(getBaseLog(5, arr.narcissistic).toFixed(1)),
  };

}
