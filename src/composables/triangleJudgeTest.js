export function judgeTriangle(a, b, c) {
    let result
    if (a <= 0 || b <= 0 || c <= 0 ||  a > 200 || b > 200 || c > 200){
        return result = "数据非法，边长数值越界"
    }
    if (
        a + b > c &&
        a + c > b &&
        b + c > a
    ) {
        if (a === b && a === c){
            return result = "该三角形的是等边三角形"
        }else if (a === b || a === c || b === c){
            return result = "该三角形的是等腰三角形"
        }else {
            return result = "该三角形的是普通三角形"
        }
    } else {
        return result = "所给三边数据不能构成三角形"
    }
}