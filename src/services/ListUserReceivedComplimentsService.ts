/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepository'

class ListUserReceivedComplimentsService {
  async execute(user_id: string): Promise<Compliment[]> {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id
      },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliments
  }
}

export { ListUserReceivedComplimentsService }
