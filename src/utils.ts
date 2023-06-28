/**
 * 移除对象空属性
 * @param object 
 * @returns 
 */
const removeEmptyProperties = (object: { [key: string]: any; }): { [key: string]: any; } => {
  for (const key in object) {
    if (object[key] === null || object[key] === undefined || object[key] === '') {
      delete object[key];
    }
  }
  return object
}

/**
 * 将对象参数转为 URL 可用的字符串参数
 * @param object 
 * @returns 
 */
export const objectToParams = (object: { [key: string]: any }): string => {
  const nweObject = removeEmptyProperties(object)
  const params = new URLSearchParams()
  for (const key in nweObject) {
    params.append(key, nweObject[key])
  }
  return params.toString()
}

/**
 * 驼峰转下划线
 * @param str string
 * @returns string
 */
export const toUnderline = (str: string) => str.replace(/([A-Z])/g, "_$1").toLowerCase()

/**
 * 下划线转驼峰
 * @param str string 
 * @returns string
 */
export const toCamelCase = (str: string) => str.replace(/_(\w)/g, (match, letter) => letter.toUpperCase())

/**
 * 下划线属性对象转驼峰属性对象
 * @param object 
 * @returns 
 */
export const underscoreToCamelCase = (object: { [key: string]: any; }): { [key: string]: any; } => {
  const nweObject = removeEmptyProperties(object)
  const result: { [key: string]: any; } = {}
  for (const key in nweObject) {
    let res = nweObject[key]
    if (nweObject[key] instanceof Object) {
      res = underscoreToCamelCase(nweObject[key])
    }
    if (nweObject[key] instanceof Array) {
      res = nweObject[key].map((item: { [key: string]: any; }) => underscoreToCamelCase(item))
    }
    result[toCamelCase(key)] = res
  }
  return result
}

/**
 * 驼峰属性对象转下划线属性对象
 * @param object 
 * @returns 
 */
export const camelCaseToUnderscore = (object: { [key: string]: any; }): { [key: string]: any; } => {
  const nweObject = removeEmptyProperties(object)
  const result: { [key: string]: any; } = {}
  for (const key in nweObject) {
    result[toUnderline(key)] = nweObject[key]
  }
  return result
}

/**
 * 将对象参数转为 Logseq 中属性写法
 * @param object 
 * @returns 
 */
export const objectToProperties = (object: {
  [key: string]: {
    en: string
    zh: string
    value: string | number
  }
}, isEnglish: boolean): string => {
  const result = []
  for (const key  in object) {
    const k = isEnglish ? object[key].en : object[key].zh
    result.push(`${k}:: ${object[key].value || '🤡'}`)
  }
  return result.join('\n')
}
