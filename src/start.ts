import '@pefish/js-node-assist'
import Starter from '@pefish/js-util-starter'
import HttpServerHelper from '@pefish/js-helper-httpserver'
import { Os } from '@pefish/js-util-os'
import ErrorHelper from '@pefish/js-error'
import path from 'path'
import prompt from 'prompt'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any,
      config: object;
      debug: boolean;
    }
  }
}

function getArgsFromConsole(schema) {
  return new Promise(function (resolve, reject) {
    prompt.get(schema, function (err, result) {
      if (err) {
        reject(new ErrorHelper('失败', 0, null, err));
      } else {
        resolve(result);
      }
    });
  });
}

Starter.startAsync(async () => {
  global.config = {}
  global.debug = Os.getEnv('DEBUG') === 'true'

  const host = Os.getEnv('HOST'),
    port = Os.getEnv('PORT').toNumber_()

  if (!host || !port) {
    throw new ErrorHelper(`请指定host以及port环境变量`)
  }

  const schema = {
    properties: {
      data: {
        description: `Enter seeds`,
        type: 'string',
        required: true,
        hidden: true,
        replace: '*',
      }
    }
  }
  const args = await getArgsFromConsole(schema)
  global.config['seeds'] = {}
  for (let [currency, seed] of Object.entries(JSON.parse(args['data']))) {
    global.config['seeds'][currency] = seed
  }
  global.debug && global.logger.error(global.config['seeds'])

  const httpServerHelper = new HttpServerHelper(host, port)
  await httpServerHelper.listen(
    path.join(__dirname, './route'),
    path.join(__dirname, './controller')
  )
}, null, false)


