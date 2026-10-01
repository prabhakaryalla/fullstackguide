import type { Topic, TopicConfig } from '../model/types'
import aiTopics from './ai-topics.json'
import angularTopics from './angular-topics.json'
import awsTopics from './aws-topics.json'
import azureTopics from './azure-topics.json'
import csharpTopics from './csharp-topics.json'
import csharpProgramsTopics from './csharp-programs-topics.json'
import databaseTopics from './database-topics.json'
import designPatternsTopics from './design-patterns-topics.json'
import dotnetTopics from './dotnet-topics.json'
import javascriptTopics from './javascript-topics.json'
import javascriptProgramsTopics from './javascript-programs-topics.json'
import leetCodeTopics from './leet-code-topics.json'
import microservicesTopics from './microservices-topics.json'
import reactJsTopics from './react-js-topics.json'
import sqlTopics from './sql-topics.json'
import sqlProgramsTopics from './sql-programs-topics.json'
import systemDesignTopics from './system-design-topics.json'

const topicConfigMap: Record<string, TopicConfig> = {
  ai: aiTopics as TopicConfig,
  angular: angularTopics as TopicConfig,
  aws: awsTopics as TopicConfig,
  azure: azureTopics as TopicConfig,
  csharp: csharpTopics as TopicConfig,
  'csharp-programs': csharpProgramsTopics as TopicConfig,
  cosmos: databaseTopics as TopicConfig,
  'design-patterns': designPatternsTopics as TopicConfig,
  dotnet: dotnetTopics as TopicConfig,
  javascript: javascriptTopics as TopicConfig,
  'javascript-programs': javascriptProgramsTopics as TopicConfig,
  'leet-code': leetCodeTopics as TopicConfig,
  microservices: microservicesTopics as TopicConfig,
  'react-js': reactJsTopics as TopicConfig,
  sql: sqlTopics as TopicConfig,
  'sql-programs': sqlProgramsTopics as TopicConfig,
  'system-design': systemDesignTopics as TopicConfig,
}

export function getMenuTopicSource(menuId: string): Topic[] {
  return topicConfigMap[menuId]?.topics ?? []
}

export function getTopicConfigMap(): Record<string, TopicConfig> {
  return topicConfigMap
}
