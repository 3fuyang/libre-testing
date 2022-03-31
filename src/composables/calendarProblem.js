// 接收一组参数，返回字符串结果
function calendarProblem(year, month, day) {
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
function getMonthDays(year, month) {
    let thisDate = new Date(year, month, 0); //当天数为0时，js会自动处理为上一月的最后一天
    return thisDate.getDate();
}

// 根据.csv文件的表头字段提取对应的参数，返回参数数组
function getArgs(row) {
    let args = [Number.parseInt(row.Year), Number.parseInt(row.Month), Number.parseInt(row.Day)]
    return args
}

// 添加别名，进行导出
export { calendarProblem as useSingleTest, getArgs as useGetArgs }