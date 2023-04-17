import express from 'express'
import * as views from './views'
import { Conf, read_conf } from './config'
import { Env, NetConfig } from './env'
import { setEnv as setHelperEnv } from './views/helper'

import rateLimit from 'express-rate-limit'

import { join as pathjoin, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

export async function app_start(port: string) {
  const app = express()

  let mode = app.get('env')
  let conf = await read_conf()
  let env = new Env(
    new NetConfig(conf.net, mode)
  )
  setHelperEnv(env)

  let apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: 'Too many requests',
    standardHeaders: true,
    legacyHeaders: false
  })

  app.use('/assets', express.static(pathjoin(__dirname, '../public')))

  app.get('/', apiLimiter, (req, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url))
    res.send(views.home())
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })


  return app
}
