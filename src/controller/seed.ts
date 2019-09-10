import CryptUtil from '@pefish/js-util-crypto'
import ErrorHelper from '@pefish/js-error'

export default class Seed {
  async getSeed (req) {
    let { series, secret } = req['params']
    if (!global.config['seeds'][series]) {
      throw new ErrorHelper(`seed not exists`)
    }
    const seed = CryptUtil.aesDecrypt(global.config['seeds'][series], secret)
    return {
      seed
    }
  }

  async getAllSeeds (req) {
    let { secret } = req['params']
    const result = {}
    for (let [currency, crypedSeed] of Object.entries(global.config['seeds'])) {
      result[currency] = CryptUtil.aesDecrypt(crypedSeed, secret)
    }
    return {
      seeds: result
    }
  }
}