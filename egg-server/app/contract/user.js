module.exports = {
  createUserRequest: {
    mobile: {
      type: 'string',
      required: true,
      description: '手机号',
      example: '18888888888',
      format: /^1[34578]\d{9}$/
    },
    password: {
      type: 'string',
      required: true,
      description: '123456',
      example: '1213'
    },
    realName: {
      type: 'string',
      required: true,
      description: '姓名',
      example: 'Tom'
    }
  }
};