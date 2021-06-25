import { getCustomRepository } from 'typeorm'
import { Tag } from '../entities/Tag'
import { TagsRepositories } from '../repositories/TagsRespoisitory'
import { classToPlain } from 'class-transformer'

class ListTagsService {
  async execute(): Promise<Record<string, Tag>> {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    const tags = await tagsRepositories.find()

    return classToPlain(tags)
  }
}

export { ListTagsService }
