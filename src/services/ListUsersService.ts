import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import { UsersRepositories } from '../repositories/UsersRepository'
import { classToPlain } from 'class-transformer'

class ListUsersService {
  async execute(): Promise<Record<string, User>> {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const users = await usersRepositories.find()

    return classToPlain(users)
  }
}

export { ListUsersService }
