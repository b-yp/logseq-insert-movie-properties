import "@logseq/libs";

import { logseq as PL } from "../package.json";

import { api, imageUrl } from "./api";
import { PersonDetailParams, PersonListsParams, SearchMoviesParams, movieCreditsParams, movieDetailParams } from "./type";
import { getGender, objectToProperties } from "./utils";
import { settings } from "./settings";

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);

  // 注册设置项
  logseq.useSettingsSchema(settings)

  // 获取设置的属性语言
  const isEnglish = logseq.settings ? logseq.settings['properties_language'] : true

  // 插入电影信息
  const insertMovieProperties = async (language: string) => {
    const page = await logseq.Editor.getCurrentPage()

    if (!page?.name) return

    // 查询电影列表参数
    const searchMoviesParams: SearchMoviesParams = {
      language,
      query: page.name,
    }
    // 查询电影详情参数
    const movieDetailParams: movieDetailParams = {
      language
    }
    // 查询电影工作人员参数
    const movieCeditsParams: movieCreditsParams = {
      language
    }

    // 查询电影列表
    const moviesRes = await api.fetchSearchMovies(searchMoviesParams)
    // 暂时不考虑查询多条结果供用户选择，直接取第一条最符合的，如果后续有需要，再优化
    const movie = moviesRes.results[0]

    // 查询电影详情
    const movieDetailRes = await api.fetchMovieDetail(movie.id, movieDetailParams)

    // 查询电影工作人员列表
    const movieCreditsRes = await api.fetchMovieCredits(movie.id, movieCeditsParams)

    /**
     * 这里对演员处理一下，只取 (Acting)
     */
    const movieActors = movieCreditsRes.cast.filter(c => c.knownForDepartment === 'Acting')

    /**
     * 这里要对全体工作人员处理一下，只取 导演 (Director) 、编剧 (Screenplay) ，不然列表太长爆炸了，而且别人可能也不会关心其他的
     */
    const movieDirectors = movieCreditsRes.crew.filter(c => c.job === 'Director')
    const movieScreenwriters = movieCreditsRes.crew.filter(c => c.job === 'Screenplay')

    // 要插入的电影内容
    const moviePropertiesOptions: {
      [key: string]: {
        en: string
        zh: string
        value: string | number
      }
    } = {
      /**
       * 特殊的属性
       */
      alias: {
        en: 'alias',
        zh: 'alias',
        value: movieDetailRes.originalTitle
      },
      title: {
        en: 'title',
        zh: '标题',
        value: movieDetailRes.title,
      },
      directors: {
        en: 'directors',
        zh: '导演',
        value: movieDirectors.map(d => `#[[${d.name}]]`).join(' '),
      },
      screenWriters: {
        en: 'screenWriters',
        zh: '编剧',
        value: movieScreenwriters.map(s => `#[[${s.name}]]`).join(' '),
      },
      cast: {
        en: 'actors',
        zh: '主演',
        value: movieActors.map(a => `#[[${a.name}]]`).join(' '),
      },
      posterPath: {
        en: 'poster',
        zh: '海报',
        value: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${movieDetailRes.posterPath}){:height 225, :width 150}`,
      },
      originalTitle: {
        en: 'originalTitle',
        zh: '原始名称',
        value: movieDetailRes.originalTitle
      },
      originalLanguage: {
        en: 'originalLanguage',
        zh: '原始语言',
        value: movieDetailRes.originalLanguage
      },
      releaseDate: {
        en: 'releaseDate',
        zh: '上映日期',
        value: movieDetailRes.releaseDate
      },
      runtime: {
        en: 'runtime',
        zh: '时长',
        value: `${movieDetailRes.runtime} ${isEnglish ? 'minute' : '分钟'}`
      },
      genres: {
        en: 'genres',
        zh: '类型',
        value: movieDetailRes.genres.map(i => (`#${i.name}`)).join(' '),
      },
      spokenLanguages: {
        en: 'spokenLanguages',
        zh: '语言',
        value: movieDetailRes.spokenLanguages.map(i => (`#${i.name}`)).join(' '),
      },
      status: {
        en: 'status',
        zh: '状态',
        value: movieDetailRes.status
      },
      tagline: {
        en: 'tagline',
        zh: '标语',
        value: movieDetailRes.tagline
      },
      overview: {
        en: 'overview',
        zh: '剧情简介',
        value: movieDetailRes.overview
      },
      budget: {
        en: 'budget',
        zh: '预算',
        value: movieDetailRes.budget
      },
      revenue: {
        en: 'revenue',
        zh: '票房',
        value: movieDetailRes.revenue
      },
      homepage: {
        en: 'homepage',
        zh: '主页',
        value: movieDetailRes.homepage
      },
      IMDB_ID: {
        en: 'IMDB_ID',
        zh: 'IMDB ID',
        value: movieDetailRes.imdbId
      },
      productionCompanies: {
        en: 'productionCompanies',
        zh: '制作公司',
        value: movieDetailRes.productionCompanies.map(i => (`#[[${i.name}]]`)).join(' '),
      },
      productionCountries: {
        en: 'productionCountries',
        zh: '制片国家',
        value: movieDetailRes.productionCountries.map(i => (`#[[${i.name}]]`)).join(' '),
      },
      backdropPath: {
        en: 'backdrop',
        zh: '背景图片',
        value: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${movieDetailRes.backdropPath}){:height 225, :width 150}`,
      },
    }

    /**
     * 查询到电影详情，使用 logseq API 更新到页面
     * TODO: 这里不解的是 prependBlockInPage 居然不是在最前面插入, 那么修改已有 page 的 properties 应该用什么方法呢 ？ 
     * 看到 discord 也有人有这样的疑问:  https://discord.com/channels/725182569297215569/766475028978991104/1076386778937839616
     * 插入属性块还有另一种写法: logseq.Editor.prependBlockInPage(page.uuid, '', { properties: { ... } })
     * 我这里就不改了，感觉区别不大
     */
    logseq.Editor.prependBlockInPage(page.uuid, objectToProperties(moviePropertiesOptions, isEnglish))
  }

  const insertPersonProperties = async (language: string) => {
    const page = await logseq.Editor.getCurrentPage()

    if (!page?.name) return

    // 查询人员列表参数
    const personListsParams: PersonListsParams = {
      language,
      query: page.name
    }

    // 查询人员详情参数
    const personDetailParams: PersonDetailParams = {
      language,
    }

    // 查询人员列表
    // 这里也不考虑供用户选择，直接取第一条，最相关的
    const personListsRes = await api.fetchPersonList(personListsParams)

    // 查询人员详情
    const personDetailRes = await api.fetchPersonDetail(personListsRes.results[0].id, personDetailParams)

    // 要插入的人员内容
    const personPropertiesOptions: {
      [key: string]: {
        en: string
        zh: string
        value: string | number | null
      }
    } = {
      name: {
        en: 'name',
        zh: '姓名',
        value: personDetailRes.name,
      },
      alias: {
        en: 'alias',
        zh: 'alias',
        value: personDetailRes.alsoKnownAs.map(i => `#[[${i}]]`).join(' '),
      },
      gender: {
        en: 'gender',
        zh: '性别',
        value: getGender(personDetailRes.gender, language)
      },
      birthday: {
        en: 'birthday',
        zh: '生日',
        value: personDetailRes.birthday,
      },
      deathday: {
        en: 'deathday',
        zh: '死亡日期',
        value: personDetailRes.deathday,
      },
      homepage: {
        en: 'homepage',
        zh: '主页',
        value: personDetailRes.homepage
      },
      imdbId: {
        en: 'IMDB_ID',
        zh: 'IMDB ID',
        value: personDetailRes.imdbId
      },
    }

    // 查询到人员详情，使用 logseq API 更新到页面
    logseq.Editor.prependBlockInPage(page.uuid, objectToProperties(personPropertiesOptions, isEnglish))
  }

  // 插入英文电影信息菜单项
  logseq.App.registerPageMenuItem('Insert movie properties', () => insertMovieProperties('en-US'))

  // 插入中文电影信息菜单项
  logseq.App.registerPageMenuItem('插入电影属性', () => insertMovieProperties('zh-CN'))

  // 插入英文演员信息菜单项
  logseq.App.registerPageMenuItem('Insert person properties', () => insertPersonProperties('en-US'))

  // 插入中文演员信息菜单项
  logseq.App.registerPageMenuItem('插入人物属性', () => insertPersonProperties('zh-CN'))
}

logseq.ready(main).catch(console.error);