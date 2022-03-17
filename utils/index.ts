import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SDK from "js-conflux-sdk/dist/js-conflux-sdk.umd.min.js";

dayjs.extend(relativeTime);

export const toThousands = (num, delimiter = ",", prevDelimiter = ",") => {
  if ((typeof num !== "number" || isNaN(num)) && typeof num !== "string")
    return "";
  let str = num + "";
  return str
    .replace(new RegExp(prevDelimiter, "igm"), "")
    .split(".")
    .reduce((acc, cur, index) => {
      if (index) {
        return `${acc}.${cur}`;
      } else {
        return cur.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, `$1${delimiter}`);
      }
    }, "");
};

/**
 * 获取给定时间戳 from 到给定时间 to 的 duration
 * @param {string | number} from syncTimestamp
 * @param {string | number} to current serverTimestamp or current browserTimestamp
 */
export const getDuration = (pFrom: number, pTo?: number) => {
  try {
    const to = pTo || +new Date();
    const from = pFrom * 1000;

    if (from > to) {
      throw new Error("invalid timestamp pair");
    }

    const dayjsTo = dayjs(to);

    const fullDay = dayjsTo.diff(from, "day");
    const fullHour = dayjsTo.diff(from, "hour");
    const fullMinute = dayjsTo.diff(from, "minute");

    const day = dayjsTo.diff(from, "day");
    const hour = dayjsTo.subtract(fullDay, "day").diff(from, "hour");
    const minute = dayjsTo.subtract(fullHour, "hour").diff(from, "minute");
    const second = dayjsTo.subtract(fullMinute, "minute").diff(from, "second");

    return [day, hour, minute, second];
  } catch (e) {
    return [0, 0, 0, 0];
  }
};

export const formatTimeStamp = (
  time: number,
  type?: "standard" | "timezone"
) => {
  let result: string;
  try {
    switch (type) {
      case "standard":
        result = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        break;
      case "timezone":
        result = dayjs(time).format("YYYY-MM-DD HH:mm:ss Z");
        break;
      default:
        result = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    }
  } catch (error) {
    result = "";
  }
  return result;
};

export const formatBalance = (
  balance,
  decimals = 18,
  isShowFull = false,
  opt = {},
  ltValue?
) => {
  try {
    const num = new BigNumber(balance).div(new BigNumber(10).pow(decimals));
    if (num.eq(0)) {
      return num.toFixed();
    }
    if (isShowFull) {
      return toThousands(num.toFixed());
    }
    if (ltValue && num.lt(ltValue)) {
      return `<${ltValue}`;
    }
    return formatNumber(num.toString(), opt);
  } catch {
    return "";
  }
};

/**
 * 格式化字符串，向下取整
 * @param {number|string} num 数字或字符串，应尽量使用字符串格式，数字格式如果长度超过 Number.MAX_SAFE_INTEGER 或 Number.MIN_SAFE_INTEGER 可能会有精度损失
 * @param {object} opt 配置参数
 * @returns {string} 格式化后字符串格式数字
 * @todo: 支持四舍五入，向上取整
 * @todo: 支持整数位小数设置精度
 * @todo: 支持负数格式化
 */
export const formatNumber = (num, opt?) => {
  // 无法通过 bignumber.js 格式化的不处理
  let bNum = new BigNumber(num).toFixed();
  if (bNum === "NaN") {
    return "";
  }
  const option = {
    precision: 3, // 保留小数精度数（注意整数位小数的精度固定为 3，原因是受千分符影响）
    keepDecimal: true, // 是否保留小数位（注意如果整数部分带有小数位，则不保留实际小数位，原因是会显示两个小数点，会误解）
    keepZero: false, // 是否保留小数位的 0（注意此配置优先级高于 precision，会清除 precision 添加的 0）
    delimiter: ",", // 自定义分隔符
    withUnit: true, // 是否显示单位
    unit: "", // 指定单位
    ...opt,
  };
  // 0. 定义返回值
  let int = "";
  let decimal = "";
  let result = "";
  /**
   * 1. 定义单位
   * K - kilo, 10³
   * M - mega, 10⁶
   * G - giga, 10⁹
   * T - tera, 10¹²
   * P - peta, 10¹⁵
   * E - exa, 10¹⁸
   * Z - zetta, 10²¹
   * Y - yotta, 10²⁴
   */
  const UNITS = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  // 2. 拆分出整数和小数，小数默认值为 0
  const [intStr, decimalStr = "0"] = bNum.split(".");
  // 3. 只能处理 27 位数的单位，大于 27 位的字符串从头部截断保留
  // 3.1 获取大于小数点前 27 位的数字 intStrFront
  let intStrFront = intStr.slice(-Infinity, -27);
  // 3.2 获取小数点前 27 位数字 intStrEnd
  let intStrEnd = intStr.slice(-27);
  // 4. intStrEnd 转千分符形式
  const intStrEndAfterToThousands = toThousands(intStrEnd, option.delimiter);
  // 5. intStrEnd 添加单位，此处不对数字有效性做验证，即可能值为 100.000，100.000k 或 000.000Y
  let intStrEndWithUnit = "";

  if (option.withUnit === false) {
    intStrEndWithUnit = intStrEndAfterToThousands;
  } else {
    let unitIndex = 1;
    if (option.unit !== "" && UNITS.includes(option.unit)) {
      unitIndex =
        intStrEndAfterToThousands.split(option.delimiter).length -
        UNITS.findIndex(u => u === option.unit);
    }
    if (unitIndex > 0) {
      intStrEndWithUnit = intStrEndAfterToThousands
        .split(option.delimiter)
        .reduce((prev, curr, index, arr) => {
          const len = arr.length;
          // 无单位整数，为了后面方便处理统一格式
          if (len === 1) {
            return `${curr}.000`;
          }
          if (index === 0) {
            return curr;
          } else if (index === unitIndex) {
            return `${prev}.${curr}${UNITS[len - index]}`;
          } else if (index < unitIndex) {
            return `${prev},${curr}`;
          } else {
            return prev;
          }
        }, "");
    } else {
      intStrEndWithUnit = intStrEndAfterToThousands;
    }
  }
  // 6. 格式化整数
  if (intStrFront) {
    // 如果数字长度超过 27 位，则前面的数字用千分符分割
    int = `${toThousands(intStrFront, option.delimiter)}${
      option.delimiter
    }${intStrEndWithUnit}`;
  } else {
    int = intStrEndWithUnit;
  }
  // 7. 格式化小数
  decimal = new BigNumber(`0.${decimalStr}`).toPrecision(option.precision, 1);
  // 8. 拼接整数，小数和单位
  let unit = int.slice(-1);
  let intWithoutUnit = int;
  if (int && UNITS.includes(unit)) {
    // 8.1 整数位包含单位，则不显示实际小数部分
    if (option.keepDecimal) {
      // 保留整数位整数 + 整数位小数
      intWithoutUnit = int.slice(-Infinity, -1);
    } else {
      // 仅保留整数位整数
      intWithoutUnit = intWithoutUnit.split(".")[0];
    }
    result = `${intWithoutUnit}${unit}`;
  } else {
    unit = "";
    // 8.2 整数位为 0 或无单位整数，拼接小数位
    if (option.keepDecimal) {
      result = new BigNumber(int.toString().replace(/,/g, ""))
        .plus(new BigNumber(decimal))
        .toFixed(option.precision, 1);
    } else {
      result = int.split(".")[0];
    }
    intWithoutUnit = result;
  }
  // 9. 处理小数部分的 0
  if (!option.keepZero) {
    result = `${new BigNumber(
      replaceAll(intWithoutUnit, option.delimiter, "")
    ).toFormat()}${unit}`;
  }
  // 10. 格式化千分符
  result = toThousands(result);
  return result;
};

// alternative of String.prototype.replaceAll
export const replaceAll = (str: string, find: string, replace) => {
  return str.replace(
    new RegExp(find.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"), "g"),
    replace
  );
};

/**
 * Verify is an address is the zero address
 * @param address the address cto check
 * @returns
 */
export function isZeroAddress(address: string): boolean {
  try {
    // @todo, wait for sdk upgrade to accept both base32 and hex address
    return SDK.address.isZeroAddress(formatAddress(address, "hex"));
  } catch (e) {
    return false;
  }
}

export const isCfxHexAddress = (address: string): boolean => {
  try {
    return SDK.address.isValidCfxHexAddress(address);
  } catch (e) {
    return false;
  }
};

export const formatAddress = (
  address: string,
  outputType = "base32" // base32 or hex
): string => {
  // return input address as default value if it can not convert to conflux chain base32/hex format
  // if necessary, check for errors at the call site
  const invalidAddressReturnValue = address;
  try {
    if (isCfxHexAddress(address)) {
      if (outputType === "hex") {
        return address;
      } else if (outputType === "base32") {
        return SDK.format.address(address, 1029);
      } else {
        return invalidAddressReturnValue;
      }
    } else if (isBase32Address(address)) {
      if (outputType === "hex") {
        return SDK.format.hexAddress(address);
      } else if (outputType === "base32") {
        const reg = /(.*):(.*):(.*)/;
        let lowercaseAddress = address;

        // compatibility with verbose address, will replace with simply address later
        if (typeof address === "string" && reg.test(address)) {
          lowercaseAddress = address.replace(reg, "$1:$3").toLowerCase();
        }
        return lowercaseAddress;
      } else {
        return invalidAddressReturnValue;
      }
    } else {
      return invalidAddressReturnValue;
    }
  } catch (e) {
    return invalidAddressReturnValue;
  }
};

export const isBase32Address = (address: string): boolean => {
  try {
    return SDK.address.isValidCfxAddress(address);
  } catch (e) {
    return false;
  }
};
