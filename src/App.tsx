import { PageEntity } from "@logseq/libs/dist/LSPlugin";
import React, { useEffect, useState, useRef } from "react";

import { api, imageUrl, neodbApi } from "./api";
import {
  PersonDetailParams,
  PersonListsParams,
  SearchMoviesParams,
  movieCreditsParams,
  movieDetailParams,
  Category,
  SearchMoviesResponse,
  PersonListsResponse,
  TVListResponse,
  CataLogSearchResponse,
  ArrayElementType,
} from "./type";
import { camelCaseToKababCase, getGender, objectToProperties } from "./utils";
import { Lang, Language, languages } from "./constants";

import "./style.css";

const App = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [movieList, setMovieList] = useState<SearchMoviesResponse["results"]>(
    []
  );
  const [personList, setPersonList] = useState<PersonListsResponse["results"]>(
    []
  );
  const [tvList, setTvList] = useState<TVListResponse["results"]>([]);
  const [bookList, setBookList] = useState<CataLogSearchResponse["data"]>([]);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [currentPage, setCurrentPage] = useState<PageEntity>();

  useEffect(() => {
    const emojiPrefix = logseq.settings
      ? logseq.settings["emoji_prefix"]
      : "🤡";

    const isInsertMoviePropertiesEn = logseq.settings
      ? logseq.settings["insert_movie_properties_en"]
      : true;
    const isInsertMoviePropertiesZh = logseq.settings
      ? logseq.settings["insert_movie_properties_zh"]
      : true;
    const isInsertPersonPropertiesEn = logseq.settings
      ? logseq.settings["insert_person_properties_en"]
      : true;
    const isInsertPersonPropertiesZh = logseq.settings
      ? logseq.settings["insert_person_properties_zh"]
      : true;
    const isInsertTvPropertiesEn = logseq.settings
      ? logseq.settings["insert_tv_properties_en"]
      : true;
    const isInsertTvPropertiesZh = logseq.settings
      ? logseq.settings["insert_tv_properties_zh"]
      : true;
    const isInsertBookInfo = logseq.settings
      ? logseq.settings["insert_book_info"]
      : true;

    // 插入英文电影信息菜单项
    isInsertMoviePropertiesEn &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: Insert movie properties`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          if (!page?.name) return;
          setCurrentPage(page as PageEntity);

          setLanguage(Language.EN);
          fetchMovieList(Language.EN, page as PageEntity);
        }
      );

    // 插入中文电影信息菜单项
    isInsertMoviePropertiesZh &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: 插入电影属性`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          setCurrentPage(page as PageEntity);
          if (!page?.name) return;

          setLanguage(Language.ZH);
          fetchMovieList(Language.ZH, page as PageEntity);
        }
      );

    // 插入英文演员信息菜单项
    isInsertPersonPropertiesEn &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: Insert person properties`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          setCurrentPage(page as PageEntity);
          if (!page?.name) return;

          setLanguage(Language.EN);
          fetchPersonList(Language.EN, page as PageEntity);
        }
      );

    // 插入中文演员信息菜单项
    isInsertPersonPropertiesZh &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: 插入人物属性`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          setCurrentPage(page as PageEntity);
          if (!page?.name) return;

          setLanguage(Language.ZH);
          fetchPersonList(Language.ZH, page as PageEntity);
        }
      );

    isInsertTvPropertiesEn &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: Insert TV properties`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          setCurrentPage(page as PageEntity);
          if (!page?.name) return;

          setLanguage(Language.EN);
          fetchTvList(Language.EN, page as PageEntity);
        }
      );
    isInsertTvPropertiesZh &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: 插入电视剧属性`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          setCurrentPage(page as PageEntity);
          if (!page?.name) return;

          setLanguage(Language.ZH);
          fetchTvList(Language.ZH, page as PageEntity);
        }
      );

    // 插入书籍信息
    isInsertBookInfo &&
      logseq.App.registerPageMenuItem(
        `${emojiPrefix}: Insert book info`,
        async () => {
          const page = await logseq.Editor.getCurrentPage();
          setCurrentPage(page as PageEntity);
          if (!page?.name) return;

          fetchBookList(page as PageEntity);
        }
      );

    logseq.hideMainUI();
  }, []);

  useEffect(() => {
    if (
      !!movieList.length ||
      !!tvList.length ||
      !!personList.length ||
      !!bookList.length
    ) {
      logseq.showMainUI();
    }
  }, [movieList.length, tvList.length, personList.length, bookList.length]);

  const fetchMovieList = async (language: Language, page: PageEntity) => {
    setLanguage(language);
    // 查询电影列表参数
    const searchMoviesParams: SearchMoviesParams = {
      language,
      query: page.name,
    };

    // 查询电影列表
    const moviesRes = await api.fetchSearchMovies(searchMoviesParams);

    setMovieList(moviesRes.results);
  };

  const fetchPersonList = async (language: Language, page: PageEntity) => {
    setLanguage(language);
    // 查询人员列表参数
    const personListsParams: PersonListsParams = {
      language,
      query: page.name,
    };

    // 查询人员列表
    const personListsRes = await api.fetchPersonList(personListsParams);
    setPersonList(personListsRes.results);
  };

  const fetchTvList = async (language: Language, page: PageEntity) => {
    setLanguage(language);
    const TVListRes = await api.fetchTVList({
      query: page.name,
      language,
    });
    setTvList(TVListRes.results);
  };

  const fetchBookList = async (page: PageEntity) => {
    const bookCatalog = await neodbApi.fetchCatalog({
      query: page.name,
      category: Category.Book,
    });

    setBookList(bookCatalog.data);
  };

  // 插入电影信息
  const insertMovieProperties = async (
    movie: ArrayElementType<SearchMoviesResponse["results"]>
  ) => {
    if (!currentPage) return;
    setMovieList([]);
    logseq.hideMainUI();
    // 查询电影详情参数
    const movieDetailParams: movieDetailParams = {
      language,
    };
    // 查询电影工作人员参数
    const movieCeditsParams: movieCreditsParams = {
      language,
    };

    // 查询电影详情
    const movieDetailRes = await api.fetchMovieDetail(
      movie.id,
      movieDetailParams
    );

    // 查询电影工作人员列表
    const movieCreditsRes = await api.fetchMovieCredits(
      movie.id,
      movieCeditsParams
    );

    /**
     * 这里对演员处理一下，只取 (Acting)
     */
    const movieActors = movieCreditsRes.cast.filter(
      (c) => c.knownForDepartment === "Acting"
    );

    /**
     * 这里要对全体工作人员处理一下，只取 导演 (Director) 、编剧 (Screenplay) ，不然列表太长爆炸了，而且别人可能也不会关心其他的
     */
    const movieDirectors = movieCreditsRes.crew.filter(
      (c) => c.job === "Director"
    );
    const movieScreenwriters = movieCreditsRes.crew.filter(
      (c) => c.job === "Screenplay"
    );

    // 要插入的电影内容
    const moviePropertiesOptions: {
      [key: string]: {
        en: string;
        zh: string;
        value: string | number;
      };
    } = {
      /**
       * 特殊的属性
       */
      alias: {
        en: "alias",
        zh: "alias",
        value: movieDetailRes.originalTitle,
      },
      title: {
        en: "title",
        zh: "标题",
        value: movieDetailRes.title,
      },
      directors: {
        en: "directors",
        zh: "导演",
        value: movieDirectors.map((d) => `#[[${d.name}]]`).join(" "),
      },
      screenWriters: {
        en: "screen-writers",
        zh: "编剧",
        value: movieScreenwriters.map((s) => `#[[${s.name}]]`).join(" "),
      },
      cast: {
        en: "actors",
        zh: "主演",
        value: movieActors.map((a) => `#[[${a.name}]]`).join(" "),
      },
      posterPath: {
        en: "poster",
        zh: "海报",
        value: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${movieDetailRes.posterPath}){:height 225, :width 150}`,
      },
      originalTitle: {
        en: "original-title",
        zh: "原始名称",
        value: movieDetailRes.originalTitle,
      },
      originalLanguage: {
        en: "original-language",
        zh: "原始语言",
        value: movieDetailRes.originalLanguage,
      },
      releaseDate: {
        en: "release-date",
        zh: "上映日期",
        value: movieDetailRes.releaseDate,
      },
      runtime: {
        en: "runtime",
        zh: "时长",
        value: `${movieDetailRes.runtime} minutes`,
      },
      genres: {
        en: "genres",
        zh: "类型",
        value: movieDetailRes.genres.map((i) => `#${i.name}`).join(" "),
      },
      spokenLanguages: {
        en: "spoken-languages",
        zh: "语言",
        value: movieDetailRes.spokenLanguages
          .map((i) => `#${i.name}`)
          .join(" "),
      },
      status: {
        en: "status",
        zh: "状态",
        value: movieDetailRes.status,
      },
      tagline: {
        en: "tagline",
        zh: "标语",
        value: movieDetailRes.tagline,
      },
      overview: {
        en: "overview",
        zh: "剧情简介",
        value: movieDetailRes.overview,
      },
      budget: {
        en: "budget",
        zh: "预算",
        value: movieDetailRes.budget,
      },
      revenue: {
        en: "revenue",
        zh: "票房",
        value: movieDetailRes.revenue,
      },
      homepage: {
        en: "homepage",
        zh: "主页",
        value: movieDetailRes.homepage,
      },
      IMDB_ID: {
        en: "IMDB_ID",
        zh: "IMDB ID",
        value: movieDetailRes.imdbId,
      },
      productionCompanies: {
        en: "production_companies",
        zh: "制作公司",
        value: movieDetailRes.productionCompanies
          .map((i) => `#[[${i.name}]]`)
          .join(" "),
      },
      productionCountries: {
        en: "production_countries",
        zh: "制片国家",
        value: movieDetailRes.productionCountries
          .map((i) => `#[[${i.name}]]`)
          .join(" "),
      },
      backdropPath: {
        en: "backdrop",
        zh: "背景图片",
        value: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${movieDetailRes.backdropPath}){:height 225, :width 150}`,
      },
    };

    /**
     * 查询到电影详情，使用 logseq API 更新到页面
     * TODO: 这里不解的是 prependBlockInPage 居然不是在最前面插入, 那么修改已有 page 的 properties 应该用什么方法呢 ？
     * 看到 discord 也有人有这样的疑问:  https://discord.com/channels/725182569297215569/766475028978991104/1076386778937839616
     * 插入属性块还有另一种写法: logseq.Editor.prependBlockInPage(currentPage.uuid, '', { properties: { ... } })
     * 我这里就不改了，感觉区别不大
     */
    logseq.Editor.prependBlockInPage(
      currentPage.uuid,
      objectToProperties(moviePropertiesOptions)
    );
  };

  // 插入人物信息
  const insertPersonProperties = async (
    person: ArrayElementType<PersonListsResponse["results"]>
  ) => {
    if (!currentPage) return;
    setPersonList([]);
    logseq.hideMainUI();
    // 查询人员详情参数
    const personDetailParams: PersonDetailParams = {
      language,
    };

    // 查询人员详情
    const personDetailRes = await api.fetchPersonDetail(
      person.id,
      personDetailParams
    );

    // 要插入的人员内容
    const personPropertiesOptions: {
      [key: string]: {
        en: string;
        zh: string;
        value: string | number | null;
      };
    } = {
      name: {
        en: "name",
        zh: "姓名",
        value: personDetailRes.name,
      },
      alias: {
        en: "alias",
        zh: "alias",
        value: personDetailRes.alsoKnownAs.map((i) => `#[[${i}]]`).join(" "),
      },
      gender: {
        en: "gender",
        zh: "性别",
        value: getGender(personDetailRes.gender, language),
      },
      birthday: {
        en: "birthday",
        zh: "生日",
        value: personDetailRes.birthday,
      },
      profilePath: {
        en: "profile",
        zh: "头像",
        value: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${personDetailRes.profilePath}){:height 225, :width 150}`,
      },
      placeOfBirth: {
        en: "place-of-birth",
        zh: "出生地",
        value: personDetailRes.placeOfBirth,
      },
      popularity: {
        en: "popularity",
        zh: "人气",
        value: personDetailRes.popularity,
      },
      deathday: {
        en: "deathday",
        zh: "死亡日期",
        value: personDetailRes.deathday,
      },
      homepage: {
        en: "homepage",
        zh: "主页",
        value: personDetailRes.homepage,
      },
      imdbId: {
        en: "IMDB_ID",
        zh: "IMDB ID",
        value: personDetailRes.imdbId,
      },
      // 由于人物简介或传记太长了，不宜放在属性里面，所以新建一个 block 插入传记
      // biography: {
      //   en: 'biography',
      //   zh: '简介',
      //   value: personDetailRes.biography
      // },
    };

    // 查询到人员详情，使用 logseq API 更新到页面
    await logseq.Editor.prependBlockInPage(
      currentPage.uuid,
      objectToProperties(personPropertiesOptions)
    );
    // 在此处插入人物简介
    logseq.Editor.appendBlockInPage(
      currentPage.uuid,
      personDetailRes.biography
    );
  };

  // 插入电视剧信息
  const insertTvProperties = async (
    tv: ArrayElementType<TVListResponse["results"]>
  ) => {
    if (!currentPage) return;
    setTvList([]);
    logseq.hideMainUI();
    const TVId = tv.id;
    const TVDetailRes = await api.fetchTVDetail(TVId, { language });

    // 查询电视剧工作人员列表
    const TVCredits = await api.fetchTVCredits(TVId, { language });

    /**
     * 这里对演员处理一下，只取 (Acting)
     */
    const TVActors = TVCredits.cast.filter(
      (c) => c.knownForDepartment === "Acting"
    );

    /**
     * 这里要对全体工作人员处理一下，只取 导演 (Director) 、编剧 (Screenplay) ，不然列表太长爆炸了，而且别人可能也不会关心其他的
     */
    const TVDirectors = TVCredits.crew.filter((c) => c.job === "Director");
    const TVScreenwriters = TVCredits.crew.filter(
      (c) => c.job === "Screenplay"
    );

    const TVPropertiesOptions = {
      /** 特殊属性 */
      alias: `#[[ ${TVDetailRes.originalName} ]]`,
      title: TVDetailRes.name,
      /** --- */
      directors: TVDirectors.map((d) => `#[[${d.name}]]`).join(" "),
      actors: TVActors.map((a) => `#[[${a.name}]]`).join(" "),
      screenWriters: TVScreenwriters.map((s) => `#[[${s.name}]]`).join(" "),
      /** --- */
      poster: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${TVDetailRes.posterPath}){:height 225, :width 150}`,
      genres: TVDetailRes.genres.map((i) => `#[[${i.name}]]`).join(" "),
      homepage: TVDetailRes.homepage,
      languages: TVDetailRes.languages.join(", "),
      lastAirDate: TVDetailRes.lastAirDate,
      numberOfSeasons: TVDetailRes.numberOfSeasons,
      numberOfEpisodes: TVDetailRes.numberOfEpisodes,
      originCountry: TVDetailRes.originCountry.join(", "),
      originalLanguage: TVDetailRes.originalLanguage,
      originalName: TVDetailRes.originalName,
      popularity: TVDetailRes.popularity,
      productionCompanies: TVDetailRes.productionCompanies
        .map((i) => i.name)
        .join(", "),
      productionCountries: TVDetailRes.productionCountries
        .map((i) => i.name)
        .join(", "),
      spokenLanguages: TVDetailRes.spokenLanguages
        .map((i) => i.name)
        .join(", "),
      status: TVDetailRes.status,
      tagline: TVDetailRes.tagline,
      type: TVDetailRes.type,
      voteAverage: TVDetailRes.voteAverage,
      voteCount: TVDetailRes.voteCount,
      backdrop: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${TVDetailRes.backdropPath}){:height 225, :width 150}`,
    };

    await logseq.Editor.prependBlockInPage(currentPage.uuid, "", {
      properties: camelCaseToKababCase(TVPropertiesOptions),
    });

    // 在此处插入电视剧简介
    await logseq.Editor.appendBlockInPage(
      currentPage.uuid,
      TVDetailRes.overview
    );

    // 插入电视剧季数
    TVDetailRes.seasons.forEach(async (i) => {
      const block = await logseq.Editor.appendBlockInPage(
        currentPage.uuid,
        i.name
      );
      if (!block?.uuid) return;
      logseq.Editor.insertBatchBlock(
        block?.uuid,
        [
          { content: `${language === "en-US" ? "name: " : "名称："}${i.name}` },
          {
            content: `${language === "en-US" ? "air date: " : "上映日期："}${
              i.airDate
            }`,
          },
          {
            content: `${language === "en-US" ? "episode count: " : "集数："}${
              i.episodeCount
            }`,
          },
          {
            content: `${language === "en-US" ? "season count: " : "季数："}${
              i.seasonNumber
            }`,
          },
          {
            content: `${language === "en-US" ? "vote average: " : "评分："}${
              i.voteAverage
            }`,
          },
          {
            content: `![](${imageUrl}/t/p/w600_and_h900_bestv2/${i.posterPath}){:height 225, :width 150}`,
          },
        ],
        { sibling: false }
      );
    });
  };

  // 插入书籍信息函数
  const insertBookBookMetadata = async (
    bookItem: ArrayElementType<CataLogSearchResponse["data"]>
  ) => {
    if (!currentPage) return;
    setBookList([]);
    logseq.hideMainUI();
    const uuid = bookItem.uuid;
    const book = await neodbApi.fetchBook(uuid);

    // 要插入的书籍内容
    const bookOptions: { [key: string]: string | number | null } = {
      /**
       * 特殊属性
       * 将原名称和显示名称都设置为别名
       */
      alias: `#[[ ${book.origTitle} ]] #[[ ${book.displayTitle} ]]`,
      title: book.title,
      subTitle: book.subtitle,
      coverImage: `![](${book.coverImageUrl}){:height 225, :width 150}`,
      author: book.author.map((i) => `#[[${i}]]`).join(" "),
      translator: book.translator.map((i) => `#[[${i}]]`).join(" "),
      language: book.language,
      isbn: book.isbn,
      pubHouse: book.pubHouse,
      pubYear: book.pubYear,
      pubMonth: book.pubMonth,
      price: book.price,
      pages: book.pages,
      binding: book.binding,
      series: book.series,
      imprint: book.imprint || "",
      rating: book.rating,
      ratingCount: book.ratingCount,
      externalResources: book.externalResources.map((i) => i.url).join(", "),
      // brief: book.brief,
    };

    await logseq.Editor.prependBlockInPage(currentPage.uuid, "", {
      properties: camelCaseToKababCase(bookOptions),
    });
    // 简介另起一个 block 承载
    logseq.Editor.appendBlockInPage(currentPage.uuid, book.brief);
  };

  const getLanguage = (lang: Lang) => {
    if (language === Language.EN) {
      return languages[lang]?.englishName || lang;
    }
    if (language === Language.ZH) {
      return languages[lang]?.chineseName || lang;
    }
    return lang;
  };

  const getGender = (gender: number) => {
    if (language === Language.EN) {
      return gender === 1 ? "female" : "male";
    }
    if (language === Language.ZH) {
      return gender === 1 ? "女" : "男";
    }
    return gender === 1 ? "female" : "male";
  };

  return (
    <div
      className="logseq-insert-movie-properties-main"
      onClick={(e) => {
        if (!innerRef.current?.contains(e.target as any)) {
          logseq.hideMainUI();
          setMovieList([]);
          setPersonList([]);
          setTvList([]);
          setBookList([]);
        }
      }}
    >
      <div className="modal">
        <div ref={innerRef} className="list">
          {movieList.map((i) => (
            <div
              key={i.id}
              className="list-item"
              onClick={() => insertMovieProperties(i)}
            >
              <div className="image">
                <img
                  src={`${imageUrl}/t/p/w600_and_h900_bestv2/${i.posterPath}`}
                />
              </div>
              <div className="info">
                <div className="title">
                  <span className="name">{i.title}</span>
                  <span className="date">{i.releaseDate}</span>
                </div>
                <span>{getLanguage(i.originalLanguage as Lang)}</span>
                <span>{i.originalTitle}</span>
              </div>
            </div>
          ))}
          {personList.map((i) => (
            <div
              key={i.id}
              className="list-item"
              onClick={() => insertPersonProperties(i)}
            >
              <div className="image">
                <img
                  src={`${imageUrl}/t/p/w600_and_h900_bestv2/${i.profilePath}`}
                />
              </div>
              <div className="info">
                <div className="title">
                  <span className="name">{i.name}</span>
                  <span className="gender">{getGender(i.gender)}</span>
                </div>
                <span>{i.originalName}</span>
                <span>{i.knownForDepartment}</span>
              </div>
            </div>
          ))}
          {tvList.map((i) => (
            <div
              key={i.id}
              className="list-item"
              onClick={() => insertTvProperties(i)}
            >
              <div className="image">
                <img
                  src={`${imageUrl}/t/p/w600_and_h900_bestv2/${i.posterPath}`}
                />
              </div>
              <div className="info">
                <div className="title">
                  <span className="name">{i.name}</span>
                  <span className="date">{i.firstAirDate}</span>
                </div>
                <span className="">{i.originCountry}</span>
                <span>{getLanguage(i.originalLanguage as Lang)}</span>
              </div>
            </div>
          ))}
          {bookList.map((i) => (
            <div
              key={i.uuid}
              className="list-item"
              onClick={() => insertBookBookMetadata(i)}
            >
              <div className="image">
                <img src={i.coverImageUrl} />
              </div>
              <div className="info">
                <div className="title">
                  <span className="name">{i.title}</span>
                  <div>
                    <span className="author" style={{ marginRight: 10 }}>
                      {i.author.join(", ")}
                    </span>
                    <span className="date">{`${i.pubYear}-${i.pubMonth}`}</span>
                  </div>
                </div>
                <span>{i.rating}</span>
                <span>ISBN: {i.isbn}</span>
                <span>页数: {i.pages}</span>
                <span>{i.series}</span>
                <span>{i.pubHouse}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
