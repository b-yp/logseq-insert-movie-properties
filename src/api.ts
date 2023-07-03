import { camelCaseToUnderscore, objectToParams, underscoreToCamelCase } from "./utils";
import { BookResponse, CataLogSearchParams, CataLogSearchResponse, PersonDetailParams, PersonDetailResponse, PersonListsParams, PersonListsResponse, SearchMoviesParams, SearchMoviesResponse, TVDetailParams, TVDetailResponse, TVListParams, TVListResponse, movieCreditsParams, movieCreditsResponse, movieDetailParams, movieDetailResponse } from "./type";

const apiBaseUrl = 'https://api.themoviedb.org/3';
// const baseUrl = 'https://www.themoviedb.org'
export const imageUrl = 'https://image.tmdb.org/'

const neodbApiBaseUrl = 'https://neodb.social/api'

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzU2NmJmNjQ0NmRiMmNhNGMyNGExZjk0NGM0MWNmNSIsInN1YiI6IjY0OWJlMGZkOTYzODY0MDBhZTdjZGQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HH-zS7wM1Zo0w59wP-j0jU_WELhPUlkVa-aSKXjpM9c'
  }
};

const neodbOptions: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer kB4QrDAETGyZRY5LXYhuyFwOpKio1r'
  }
} 

const fetchFn = async <T>(url: string, params?: string) =>
  new Promise<T>((resolve, reject) => {
    fetch(`${apiBaseUrl}${url}?${params}`, options)
      .then(response => response.json())
      .then(response => {
        resolve(underscoreToCamelCase(response) as T)
      })
      .catch(err => {
        reject(err)
        console.error(err)
      });
  })

const fetchNeodbFn = async <T>(url: string, params?: string) =>
  new Promise<T>((resolve, reject) => {
    fetch(`${neodbApiBaseUrl}${url}?${params}`, neodbOptions)
      .then(response => response.json())
      .then(response => {
        resolve(underscoreToCamelCase(response) as T)
      })
      .catch(err => {
        reject(err)
        console.error(err)
      });
  })

export const api = {
  /**
   * 根据电影原始名称、翻译名称、别名搜索符合条件的电影列表
   * @param params SearchMoviesParams
   * @returns Promise<SearchMoviesResponse>
   */
  fetchSearchMovies: (params: SearchMoviesParams) => fetchFn<SearchMoviesResponse>('/search/movie', objectToParams(camelCaseToUnderscore(params))),
  /**
   * 根据电影 id 查询电影详情
   * @param movieId number
   * @param params movieDetailParams
   * @returns Promise<movieDetailResponse>
   */
  fetchMovieDetail: (movieId: number, params: movieDetailParams) => fetchFn<movieDetailResponse>(`/movie/${movieId}`, objectToParams(underscoreToCamelCase(params))),
  /**
   * 根据电影 id 查询电影演员和工作人员列表
   * @param movieId number
   * @param param movieCreditsParams
   * @returns Promise<movieCreditsResponse>
   */
  fetchMovieCredits: (movieId: number, param: movieCreditsParams) => fetchFn<movieCreditsResponse>(`/movie/${movieId}/credits`, objectToParams(underscoreToCamelCase(param))),
  /**
   * 根据人员 名称（昵称外号都可以） 查询人员列表
   * @param params PersonListsParams
   * @returns Promise<PersonListsParams>
   */
  fetchPersonList: (params: PersonListsParams) => fetchFn<PersonListsResponse>('/search/person', objectToParams(camelCaseToUnderscore(params))),
  /**
   * 根据人员 id 查询人员详情
   * @param personId nubmer
   * @param params PersonDetailParams
   * @returns Promise<PersonDetailResponse>
   */
  fetchPersonDetail: (personId: number, params: PersonDetailParams) => fetchFn<PersonDetailResponse>(`/person/${personId}`, objectToParams(camelCaseToUnderscore(params))),
  /**
   * 查询电视剧列表
   * @param params TVListParams
   * @returns Promise<TVListResponse>
   */
  fetchTVList: (params: TVListParams) => fetchFn<TVListResponse>(`/search/tv`, objectToParams(camelCaseToUnderscore(params))),
  /**
   * 查询电视剧详情
   * @param seriesId number
   * @param params TVDetailParams
   * @returns Promise<TVDetailResponse>
   */
  fetchTVDetail: (seriesId: number, params: TVDetailParams) => fetchFn<TVDetailResponse>(`/tv/${seriesId}`),
}

export const neodbApi = {
  /**
   * 查询目录，支持 （电影、书籍、音乐等...）
   * @param params CataLogSearchParams
   * @returns Promise<CataLogSearchResponse>
   */
  fetchCatalog: (params: CataLogSearchParams) => fetchNeodbFn<CataLogSearchResponse>(`/catalog/search`, objectToParams(camelCaseToUnderscore(params))),
  /**
   * 查询书籍详情
   * @param uuid string 
   * @returns Promise<BookResponse>
   */
  fetchBook: (uuid: string) => fetchNeodbFn<BookResponse>(`/book/${uuid}`),
}
