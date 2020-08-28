// 批处理 "日志"任务
module.exports = {
  // cron表达式
  interval: '*/3 * * * * *',
  handler() {
    console.log('定时任务，3秒执行一次' + new Date());
  }
}