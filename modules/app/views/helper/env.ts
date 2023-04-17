import { Env } from '../../env'

export let env!: Env

export function setEnv(e: Env) {
  env = e
}
