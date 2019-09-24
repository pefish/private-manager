
export default [
  {
    desc: '获取种子',
    path: '/seed/get_seed',
    method: 'post',
    apiHandler: 'getSeed',
    preHandlers: {
      api_params_validate: {},
    },
    params: {
      currency: {
        desc: '货币名',
        policies: [
          ['notEmpty']
        ]
      },
      secret: {
        desc: '解密密钥',
        policies: [
          ['notEmpty']
        ],
      },
    },
    expects: [

    ]
  },
  {
    desc: '获取种子',
    path: '/v1/seed/get_seed',
    method: 'post',
    apiHandler: 'getSeedV1',
    preHandlers: {
      api_params_validate: {},
    },
    params: {
      series: {
        desc: '地址系列',
        policies: [
          ['notEmpty']
        ]
      },
      secret: {
        desc: '解密密钥',
        policies: [
          ['notEmpty']
        ],
      },
    },
    expects: [

    ]
  },
  {
    desc: '获取所有种子',
    path: '/seed/get_all_seeds',
    method: 'post',
    apiHandler: 'getAllSeeds',
    preHandlers: {
      api_params_validate: {},
    },
    params: {
      secret: {
        desc: '解密密钥',
        policies: [
          ['notEmpty']
        ],
      },
    },
    expects: [

    ]
  },
]
