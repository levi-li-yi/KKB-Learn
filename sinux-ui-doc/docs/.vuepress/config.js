//  总配置文件
module.exports = {
  title: 'sinux-ui',
  description: 'ui库',
  dest: './build',
  port: 1234,
  themeConfig: {
    nav: [{
      text: '主页',
      link: '/'
    }],
    sidebar: {
      '/components/': [{
        collapsable: true,
        children: [
          'button',
        ]
      }]
    }
  }
}