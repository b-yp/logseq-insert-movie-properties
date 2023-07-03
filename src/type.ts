type Person = {
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
  /**
   * 已知角色
   * TODO: 这个可以用枚举感觉
   */
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
}

/**
 * 查询电影列表参数
 */
export type SearchMoviesParams = {
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
export type SearchMoviesResponse = {
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
export type movieDetailParams = {
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
export type movieDetailResponse = {
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
export type movieCreditsParams = {
  language?: string
}

/**
 * 查询制作人员信息响应
 */
export type movieCreditsResponse = {
  /**
   * movie id
   */
  id: number
  /**
   * 演员
   */
  cast: (Person & {
    /**
     * 饰演人物
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
  })[]
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

/**
 * 查询人物列表参数
 */
export type PersonListsParams = {
  /**
   * 姓名 （包括昵称外号等其他名称）
   */
  query: string
  /**
   * 是否包括成人 （默认 false）
   */
  includeAdult?: boolean
  /**
   * 语言 (默认 en-US)
   */
  language?: string
  /**
   * 页数
   */
  page?: number
}

/**
 * 查询人物列表响应
 */
export type PersonListsResponse = {
  /**
   * 页数
   */
  page: number
  /**
   * 人物列表
   */
  results: (Person & {
    /**
     * 已知的
     */
    knownFor: {
      /**
       * 标题
       */
      title: string
    }[]
  })[]
}

/**
 * 查询人物详情参数
 */
export type PersonDetailParams = {
  appendToResponse?: string
  language?: string
}

/**
 * 查询人物详情响应
 */
export type PersonDetailResponse = Person & {
  /**
   * 别名
   */
  alsoKnownAs: string[],
  /**
   * 简介 (传记)
   */
  biography: string
  /**
   * 生日
   */
  birthday: string
  /**
   * 死亡日期
   */
  deathday: string | null
  /**
   * 主页
   */
  homepage: string | null
  /**
   * IMDB ID
   */
  imdbId: string
  /**
   * 出生地
   */
  placeOfBirth: string
}

/**
 * 查询电视剧列表参数
 */
export type TVListParams = {
  /**
   * 电视剧名称
   */
  query: string
  /**
   * 首次播出年份
   */
  firstAirDateYear?: string
  /**
   * 是否包括成人
   */
  includeAdult?: boolean
  /**
   * 语言 (默认 en-US)
   */
  language?: string
  /**
   * 页数
   */
  page?: number
  /**
   * 年份
   */
  year?: string
}

type TV = {
  /**
   * 是否是成人
   */
  adult: boolean
  /**
   * 背景图片
   */
  backdropPath: string
  /**
   * 类型 ID
   */
  genreIds: number[]
  /**
   * ID
   */
  id: number
  /**
   * 原产国
   */
  originCountry: string[]
  /**
   * 原语言
   */
  originalLanguage: string
  /**
   * 原名称
   */
  originalName: string
  /**
   * 概述
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
   * 首次播出年份
   */
  firstAirDate: string
  /**
   * 名称
   */
  name: string
  /**
   * 平均评分
   */
  voteAverage: number
  /**
   * 总评分
   */
  voteCount: number
}

/**
 * 查询电视剧列表响应
 */
export type TVListResponse = {
  page: number
  results: TV[]
  totalPages: number
  totalResults: number
}

export type TVDetailParams = {
  appendToResponse?: string
  language?: string
}

type Genre = {
  id: number; /** 类型为数字的ID */
  name: string; /** 类型为字符串的名称 */
}

type LastEpisode = {
  id: number; /** 类型为数字的ID */
  name: string; /** 类型为字符串的名称 */
  overview: string; /** 类型为字符串的概述 */
  voteAverage: number; /** 类型为数字的平均投票得分 */
  voteCount: number; /** 类型为数字的投票总数 */
  airDate: string; /** 类型为字符串的上映日期 */
  episodeNumber: number; /** 类型为数字的集数 */
  productionCode: string; /** 类型为字符串的制作代码 */
  runtime: number | null; /** 可以为数字或 null 的运行时间 */
  seasonNumber: number; /** 类型为数字的季数 */
  showId: number; /** 类型为数字的电视剧ID */
  stillPath: string | null; /** 可以为字符串或 null 的剧照路径 */
}

type Network = {
  id: number; /** 类型为数字的ID */
  logoPath: string; /** 类型为字符串的标志路径 */
  name: string; /** 类型为字符串的名称 */
  originCountry: string; /** 类型为字符串的原始国家 */
}

type ProductionCompany = {
  id: number; /** 类型为数字的ID */
  logoPath: string; /** 类型为字符串的标志路径 */
  name: string; /** 类型为字符串的名称 */
  originCountry: string; /** 类型为字符串的原始国家 */
}

type Season = {
  airDate: string; /** 类型为字符串的上映日期 */
  episodeCount: number; /** 类型为数字的集数 */
  id: number; /** 类型为数字的ID */
  name: string; /** 类型为字符串的名称 */
  overview: string; /** 类型为字符串的概述 */
  posterPath: string; /** 类型为字符串的海报路径 */
  seasonNumber: number; /** 类型为数字的季数 */
  voteAverage: number; /** 类型为数字的平均投票得分 */
}

type SpokenLanguages = {
  englishName: string; /** 类型为字符串的英文名称 */
  iso_639_1: string; /** 类型为字符串的ISO 639-1编码 */
  name: string; /** 类型为字符串的名称 */
}

/**
 * 查询电视剧详情响应 (ChatGPT 生成的类型)
 */
export type TVDetailResponse = {
  adult: boolean; /** 类型为布尔值的成人标志 */
  backdropPath: string | null; /** 可以为字符串或 null 的背景图片路径 */
  createdBy: any[]; /** 任意类型的数组，创建者信息 */
  episodeRunTime: number[]; /** 数字类型的数组，每集运行时间 */
  firstAirDate: string; /** 类型为字符串的首播日期 */
  genres: Genre[]; /** Genre类型的数组，类型为流派 */
  homepage: string; /** 类型为字符串的主页链接 */
  id: number; /** 类型为数字的ID */
  inProduction: boolean; /** 类型为布尔值的是否在制作中标志 */
  languages: string[]; /** 类型为字符串的语言列表 */
  lastAirDate: string; /** 类型为字符串的最后播出日期 */
  lastEpisodeToAir: LastEpisode; /** LastEpisode类型的最后一集信息 */
  name: string; /** 类型为字符串的名称 */
  nextEpisodeToAir: any; /** 任意类型的下一集信息 */
  networks: Network[]; /** Network类型的数组，表示网络信息 */
  numberOfEpisodes: number; /** 类型为数字的集数 */
  numberOfSeasons: number; /** 类型为数字的季数 */
  originCountry: string[]; /** 类型为字符串的原始国家列表 */
  originalLanguage: string; /** 类型为字符串的原始语言 */
  originalName: string; /** 类型为字符串的原始名称 */
  overview: string; /** 类型为字符串的概述 */
  popularity: number; /** 类型为数字的流行度 */
  posterPath: string; /** 类型为字符串的海报路径 */
  productionCompanies: ProductionCompany[]; /** 任意类型的制作公司信息 */
  productionCountries: { iso31661: string; name: string }[]; /** 包含iso31661和name字段的对象数组，表示制作国家 */
  seasons: Season[]; /** Season类型的数组，表示季数信息 */
  spokenLanguages: SpokenLanguages[]; /** Language类型的数组，表示语言信息 */
  status: string; /** 类型为字符串的状态 */
  tagline: string; /** 类型为字符串的标语 */
  type: string; /** 类型为字符串的类型 */
  voteAverage: number; /** 类型为数字的平均投票得分 */
  voteCount: number; /** 类型为数字的投票总数 */
}


// --- NeoDB ---
/**
 * 分类枚举
 */
export enum Category {
  Book = 'book',
  Movie = 'movie',
  TV = 'tv',
  Music = 'music',
  Game = 'game',
  Podcast = 'podcast',
  Performance = 'performance',
}

type ExternalResource = {
  url: string
}

type Catalog = {
  uuid: string
  url: string
  apiUrl: string
  category: string
  parentUuid: string
  displayTitle: string
  externalResources: ExternalResource[]
  title: string
  brief: string
  coverImageUrl: string
  rating: number
  ratingCount: number
}

/**
 * 目录查询参数
 */
export type CataLogSearchParams = {
  query: string
  page?: number
  category?: Category
}

/**
 * 目录查询响应
 */
export type CataLogSearchResponse = {
  data: Catalog[]
  pages: number
  count: number
}

/**
 * 书籍详情响应
 */
export type BookResponse = {
  /**
   * neodb uuid
   */
  uuid: string
  /**
   * neodb url
   */
  url: string
  /**
   * neodb api url
   */
  apiUrl: string
  /**
   * 分类 （枚举 Category）
   */
  category: string
  /**
   * 父级 uuid
   */
  parentUuid?: string
  /**
   * 显示标题
   */
  displayTitle: string
  /**
   * 外部资源
   */
  externalResources: ExternalResource[]
  /**
   * 标题j
   */
  title: string
  /**
   * 简介
   */
  brief: string
  /**
   * 封面图片
   */
  coverImageUrl: string
  /**
   * 平均评分
   */
  rating: number
  /**
   * 总评分
   */
  ratingCount: number
  /**
   * 副标题
   */
  subtitle: string
  /**
   * 原标题
   */
  origTitle: string
  /**
   * 作者
   */
  author: string[]
  /**
   * 译者
   */
  translator: string[]
  /**
   * 语言
   */
  language: string
  /**
   * 出版社
   */
  pubHouse: string
  /**
   * 出版年份
   */
  pubYear: number
  /**
   * 出版月份
   */
  pubMonth: number
  /**
   * 装帧
   */
  binding: string
  /**
   * 定价
   */
  price: string
  /**
   * 页数
   */
  pages: string
  /**
   * 系列、丛书
   */
  series: string
  /**
   * 出版社
   */
  imprint?: string
  /**
   * ISBN
   */
  isbn: string
}
