import * as fs from 'fs/promises'
import { NetConfigParams } from './env'

export type Conf = {
  net: NetConfigParams
}

export async function read_conf() {
  return fs.readFile('./conf.json', 'utf8').then(_ => JSON.parse(_) as Conf)
}
