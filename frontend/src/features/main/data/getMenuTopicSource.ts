import type { Topic, TopicConfig } from '../model/types'
import aiTopics from './ai-topics.json'
import azureTopics from './azure-topics.json'
import csharpTopics from './csharp-topics.json'
import databaseTopics from './database-topics.json'
import dotnetTopics from './dotnet-topics.json'
import leetCodeTopics from './leet-code-topics.json'
import microservicesTopics from './microservices-topics.json'
import reactJsTopics from './react-js-topics.json'
import systemDesignTopics from './system-design-topics.json'

const topicConfigMap: Record<string, TopicConfig> = {
  ai: aiTopics as TopicConfig,
  azure: azureTopics as TopicConfig,
  csharp: csharpTopics as TopicConfig,
  cosmos: databaseTopics as TopicConfig,
  dotnet: dotnetTopics as TopicConfig,
  'leet-code': leetCodeTopics as TopicConfig,
  microservices: microservicesTopics as TopicConfig,
  'react-js': reactJsTopics as TopicConfig,
  'system-design': systemDesignTopics as TopicConfig,
}

export function getMenuTopicSource(menuId: string): Topic[] {
  return topicConfigMap[menuId]?.topics ?? []
}

export function getTopicConfigMap(): Record<string, TopicConfig> {
  return topicConfigMap
}
