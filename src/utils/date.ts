/**
 * 从内容日期字段中提取 YYYY-MM-DD 部分，避免 new Date() 在服务器/客户端时区不一致时产生 hydration mismatch。
 */
export function formatDate(date: string): string {
  return date.slice(0, 10)
}

/**
 * 从内容日期字段中提取 MM/DD 部分，同样不依赖时区。
 */
export function formatMonthDay(date: string): string {
  return date.slice(0, 10).split('-').slice(1).join('/')
}
