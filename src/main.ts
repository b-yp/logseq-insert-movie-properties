import "@logseq/libs";

import { logseq as PL } from "../package.json";

import { api, imageUrl } from "./api";
import { SearchMoviesParams, movieDetailParams } from "./type";
import { objectToProperties } from "./utils";
import { settings } from "./settings";

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);

  // 注册设置项
  logseq.useSettingsSchema(settings)

  const insertMovieProperties = async (language: string) => {
    const page = await logseq.Editor.getCurrentPage()

    if (!page?.name) return

    const searchMoviesParams: SearchMoviesParams = {
      language,
      query: page.name,
    }
    const moviesRes = await api.fetchSearchMovies(searchMoviesParams)
    // 暂时不考虑查询多条结果供用户选择，直接取第一条最符合的，如果后续有需要，再优化
    const movie = moviesRes.results[0]

    const movieDetailParams: movieDetailParams = {
      language
    }
    const movieDetailRes = await api.fetchMovieDetail(movie.id, movieDetailParams)

    // 获取设置的属性语言
    const isEnglish = logseq.settings ? logseq.settings['properties_language'] : true

    // 要插入的内容
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
        value: `${movieDetailRes.runtime} ${isEnglish ? 'minute': '分钟'}`
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

    // 查询到电影详情，使用 logseq API 更新到页面
    logseq.Editor.appendBlockInPage(page.uuid, objectToProperties(moviePropertiesOptions, isEnglish))
  }

  // 插入英文电影信息
  logseq.App.registerPageMenuItem('Insert movie properties', () => insertMovieProperties('en-US'))

  // 插入中文电影信息
  logseq.App.registerPageMenuItem('插入电影属性', () => insertMovieProperties('cn-ZH'))
}

logseq.ready(main).catch(console.error);
