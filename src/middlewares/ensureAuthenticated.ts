
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Ipayload {
  sub: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ensureAthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')
  try {
    const { sub } = verify(token, 'fc313e2f9369ea9fc1b1ee3f795933cd') as Ipayload

    request.user_id = sub

    return next()
  } catch (err) {
    return response.status(401).end()
  }
}
