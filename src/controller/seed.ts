import CryptUtil from '@pefish/js-util-crypto'
import ErrorHelper from '@pefish/js-error'

export default class Seed {
  async getSeed (req) {
    let { series } = req['params']
    if (!global.config['seeds'][series]) {
      throw new ErrorHelper(`seed not exists`)
    }
    return {
      seed: global.config['seeds'][series],
    }
  }

  async getAllSeeds (req) {
    const result = {}
    for (let [currency, crypedSeed] of Object.entries(global.config['seeds'])) {
      result[currency] = crypedSeed
    }
    return {
      seeds: result
    }
  }
}