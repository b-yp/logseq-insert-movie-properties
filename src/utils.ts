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
  if (typeof object !== 'object') {
    return object
  }

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
    value: string | number | null
  }
}, isEnglish: boolean): string => {
  const result = []
  for (const key  in object) {
    const k = isEnglish ? object[key].en : object[key].zh
    // TODO: 这里要过滤掉 value 为空的属性，但暂时留着，便于调试
    result.push(`${k}:: ${object[key].value || '🤡'}`)
  }
  return result.join('\n')
}

export const getGender = (value: number, language: string) => {
  let gender: string
  if (value === 1) {
    if (language === 'zh-CN') {
      gender = '女'
    } else {
      gender = 'Girl'
    }
  } else if (value === 2) {
    if (language === 'zh-CN') {
      gender = '男'
    } else {
      gender = 'Boy'
    }
  } else {
    if (language === 'zh-CN') {
      gender = '未知'
    } else {
      gender = 'Unknown'
    }
  }

  return gender
}
