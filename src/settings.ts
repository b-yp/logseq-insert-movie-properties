import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";

export const settings: SettingSchemaDesc[] = [
  {
    key: 'properties_language',
    title: 'The properties language is English',
    description: 'If set to false, it will be Chinese',
    default: true,
    type: 'boolean', 
  }
]