/**
 * 查询电影列表参数
 */
export interface SearchMoviesParams {
  /**
   * 电影名称
   */
  query: string
  /**
   * 包括成人内容
   */
  includeAdult?: boolean
  /**
   * 语言
   */
  language?: string
  /**
   * 主要发行年份
   */
  primary_release_year?: string
  /**
   * 页数
   */
  page?: number
  /**
   * 地区
   */
  region?: string
  /**
   * 年份
   */
  year?: string
}

/**
 * 查询电影列表响应
 */
export interface SearchMoviesResponse {
  /**
   * 电影列表
   */
  results: {
    /**
     * 是否是成人内容 
     */
    adult: boolean
    /**
     * ID
     */
    id: number
    /**
     * 原始名称
     */
    originalTitle: string
    /**
     * 原始语言
     */
    originalLanguage: string
    /**
     * 电影名称
     */
    title: string
  }[]
  /**
   * 页数
   */
  page: number
  /**
   * 总页数
   */
  totalPages: number
  /**
   * 总条数
   */
  totalResults: number
}

/**
 * 查询电影详情参数
 */
export interface movieDetailParams {
  /**
   * 语言
   */
  language?: string
  /**
   * TODO: 不知道是干啥的
   */
  appendToResponse?: string
}

/**
 * 查询电影详情响应
 */
export interface movieDetailResponse {
  /**
   * 是否是成人内容
   */
  adult: boolean
  /**
   * 背景图片
   */
  backdropPath: string
  /**
   * 属于集合
   */
  belongsToCollection: string
  /**
   * 预算
   */
  budget: number
  /**
   * 类型
   */
  genres: [
    {
      /**
       * ID
       */
      id: number
      /**
       * 类型名称
       */
      name: string
    },
  ],
  /**
   * 主页
   */
  homepage: string
  /**
   * ID
   */
  id: number
  /**
   * imdb ID
   */
  imdbId: string,
  /**
   * 原始语言
   */
  originalLanguage: string
  /**
   * 原始名称
   */
  originalTitle: string
  /**
   * 剧情简介
   */
  overview: string
  /**
   * 人气
   */
  popularity: number
  /**
   * 海报
   */
  posterPath: string
  /**
   * 制作公司
   */
  productionCompanies: [
    {
      id: number
      /**
       * Logo
       */
      logoPath: string
      /**
       * 名称
       */
      name: string
      /**
       * 原国家
       */
      originCountry: string
    }
  ],
  /**
   * 制片国家
   */
  productionCountries: [
    {
      /**
       * 代码： US
       */
      "iso_3166_1": string
      /**
       * 名称
       */
      name: string
    }
  ],
  /**
   * 上映日期
   */
  releaseDate: string,
  /**
   * 票房
   */
  revenue: number
  /**
   * 时长 (分钟)
   */
  runtime: number
  /**
   * 发音语言
   */
  spokenLanguages: [
    {
      /**
       * 英语名称
       */
      englishName: string
      /**
       * 代码 : en
       */
      "iso_639_1": string
      /**
       * 名称
       */
      name: string
    }
  ],
  /**
   * 状态 (已上映、未上映)
   */
  status: string
  /**
   * 标语
   */
  tagline: string
  /**
   * 名称
   */
  title: string
  /**
   * 视频
   */
  video: boolean
  /**
   * 平均票数
   */
  voteAverage: number
  /**
   * 总票数
   */
  voteCount: number
}

/**
 * 查询制作人员信息参数
 */
export interface movieCreditsParams {
  language?: string
}

/**
 * 查询制作人员信息响应
 */
export interface movieCreditsResponse {
  /**
   * movie id
   */
  id: number
  /**
   * 演员
   */
  cast: {
    /**
     * 是否是成人
     */
    adult: boolean
    /**
     * 性别 1: 女生 2: 男生
     */
    gender: number
    /**
     * ID
     */
    id: number
    knownForDepartment: string
    /**
     * 姓名
     */
    name: string
    /**
     * 原始名称
     */
    originalName: string
    /**
     * 人气
     */
    popularity: number
    /**
     * 形象
     */
    profilePath: string
    /**
     * 人物
     */
    character: string
    /**
     * credit_id
     */
    creditId: string
    /**
     * 排序
     */
    order: number
  }[]
  /**
   * 全体工作人员
   */
  crew: {
    /**
     * 是否是成人
     */
    adult: boolean
    /**
     * 性别 1: 女生 2: 男生
     */
    gender: number
    /**
     * ID
     */
    id: number
    knownForDepartment: string
    /**
     * 姓名
     */
    name: string
    /**
     * 原始名称
     * */
    originalName: string
    /**
     * 人气
     */
    popularity: number
    /**
     * 形象
     */
    profilePath: string
    /**
     * credit_id
     */
    creditId: string
    /**
     * 部门
     */
    department: string
    /**
     * 工作
     */
    job: string
  }[]
}
