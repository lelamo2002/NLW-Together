import { getCustomRepository } from 'typeorm'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { UsersRepositories } from '../repositories/UsersRepository'

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest): Promise<string> {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign({
      email: user.email
    }, 'fc313e2f9369ea9fc1b1ee3f795933cd', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateUserService }
