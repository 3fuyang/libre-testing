import { Row } from '../interface'

// 接收一组参数，返回字符串结果
function calendarProblem(year: number, month: number, day: number): string {
    if (year < 1900 || year > 2100) {
        return "年份数值越界"
    }
    if (month <= 0 || month > 12) {
        return "月份数值越界"
    }
    let maxDays = getMonthDays(year, month)
    if (day <= 0 || day > maxDays) {
        return "日期数值越界"
    }

    let tomorrowDate = new Date(year, month - 1, day + 1);
    return tomorrowDate.getFullYear() + "/" + (tomorrowDate.getMonth()+ 1) + "/" + tomorrowDate.getDate()
}

//获取特定月份的天数
function getMonthDays(year: number, month: number): number {
    let thisDate = new Date(year, month, 0); //当天数为0时，js会自动处理为上一月的最后一天
    return thisDate.getDate();
}

// 根据.csv文件的表头字段提取对应的参数，返回参数数组
function getArgs(row: Row): number[] {
    let args = [Number.parseInt(row.Year as string), Number.parseInt(row.Month as string), Number.parseInt(row.Day as string)]
    return args
}

// 添加别名，进行导出
export { calendarProblem as useSingleTest, getArgs as useGetArgs }