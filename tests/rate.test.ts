import { it, expect } from 'vitest'

import { app_start } from '../modules/app/app'
import request from 'supertest'

it('rate limits', async () => {

  let app = await app_start('3000')


  const agent = request.agent(app)

  for (let i = 0; i < 110; i++) {
    const response = await agent.get('/')

    if (i < 100) {
      expect(response.statusCode).toBe(200)
    } else {
      expect(response.statusCode).toBe(429)
      expect(response.text).toBe('Too many requests')
    }

  }

})
