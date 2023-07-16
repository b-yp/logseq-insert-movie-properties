import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";

export const settings: SettingSchemaDesc[] = [
  // {
  //   key: 'properties_language',
  //   title: 'The properties language is English',
  //   description: 'If set to false, it will be Chinese',
  //   default: true,
  //   type: 'boolean', 
  // },
  {
    key: 'emoji_prefix',
    title: 'Emoji prefix',
    description: 'Emoji prefix',
    default: '🤡',
    type: 'string'
  },
  {
    key: 'insert_movie_properties_en',
    title: 'Show "Insert movie properties" menu',
    description: 'Show "Insert movie properties" menu',
    default: true,
    type: 'boolean'
  },
  {
    key: 'insert_movie_properties_zh',
    title: 'Show "插入电影属性" menu',
    description: 'Show "插入电影属性" menu',
    default: true,
    type: 'boolean'
  },
  {
    key: 'insert_person_properties_en',
    title: 'Show "Insert person properties" menu',
    description: 'Show "Insert person properties" menu',
    default: true,
    type: 'boolean'
  },
  {
    key: 'insert_person_properties_zh',
    title: 'Show "插入人物属性" menu',
    description: 'Show "插入人物属性" menu',
    default: true,
    type: 'boolean'
  },
  {
    key: 'insert_tv_properties_en',
    title: 'Show "Insert tv properties" menu',
    description: 'Show "Insert tv properties" menu',
    default: true,
    type: 'boolean'
  },
  {
    key: 'insert_tv_properties_zh',
    title: 'Show "插入电视剧属性" menu',
    description: 'Show "插入电视剧属性" menu',
    default: true,
    type: 'boolean'
  },
  {
    key: 'insert_book_info',
    title: 'Show "Insert book info" menu',
    description: 'Show "Insert book info" menu',
    default: true,
    type: 'boolean'
  }
]