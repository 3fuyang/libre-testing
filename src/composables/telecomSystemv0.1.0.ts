import type { Row } from '../interface'

// 接收一组参数，返回字符串结果
function telecomSystem(callingTime: number, count: number): string {
    if (callingTime < 0 || callingTime > 31 * 24 * 60) {
        return "通话时长数值越界"
    }
    if (count < 0 || count > 11) {
        return "未按时缴费次数越界"
    }

    let maxNum: number[] = [1, 2, 3, 3, 6]
    let level: number = getLevel(callingTime)
    if (count <= maxNum[level - 1]) {
        return String((25 + 0.15 * callingTime * (1 - (level + 1) * 0.005)))
    } else {
        return String((25 + 0.15 * callingTime))
    }
}

//获取折扣档位
function getLevel(time: number): number {
    if (time > 0 && time <= 60)
        return 1
    else if (time > 60 && time <= 120)
        return 2
    else if (time > 120 && time <= 180)
        return 3
    else if (time > 180 && time <= 300)
        return 4
    else
        return 5
}

// 根据.csv文件的表头字段提取对应的参数，返回参数数组
function getArgs(row: Row): number[] {
    let args = [Number.parseInt(row.CallingTime as string), Number.parseInt(row.Count as string)]
    return args
}

// 添加别名，进行导出
export { telecomSystem as useSingleTest, getArgs as useGetArgs }