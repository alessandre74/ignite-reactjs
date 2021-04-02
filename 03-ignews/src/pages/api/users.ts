import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Alessandre' },
    { id: 2, name: 'Bruna' },
    { id: 3, name: 'Mário' },
    { id: 4, name: 'Mike' },
    { id: 5, name: 'Silvana' },
    { id: 6, name: 'Silvia' }
  ]

  return response.json(users)
}
