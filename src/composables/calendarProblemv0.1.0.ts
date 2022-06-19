import type { Row } from '../interface'

// 接收一组参数，返回字符串结果
function calendarProblem(year: number, month: number, day: number): string {
    if (year < 1900 || year > 2100) {
        return "年份数值越界"
    }
    if (month <= 0 || month > 12) {
        return "月份数值越界"
    }

    let monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isLeap: number = 0
    if (year % 4 == 0) {
        isLeap = 1
    }
    if (year % 100 == 0 && year % 400 == 0) {
        isLeap = 1;
    }

    monthDays[1] += isLeap
    let maxDays: number = monthDays[month - 1]
    if (day <= 0 || day > maxDays) {
        return "日期数值越界"
    }

    let result: number[] = [year, month, day + 1]

    if (day == maxDays) {
        result[2] = 1
        result[1]++
    }
    if (result[1] > 12) {
        result[1] = 1
        result[0]++
    }
    return result[0] + "/" + result[1] + "/" + result[2]
}

// 根据.csv文件的表头字段提取对应的参数，返回参数数组
function getArgs(row: Row): number[] {
    let args = [Number.parseInt(row.Year as string), Number.parseInt(row.Month as string), Number.parseInt(row.Day as string)]
    return args
}

// 添加别名，进行导出
export { calendarProblem as useSingleTest, getArgs as useGetArgs }