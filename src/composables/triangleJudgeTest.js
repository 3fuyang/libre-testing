export function judgeTriangle(a, b, c) {
    let result
    
    if (a < 0) result = "数据非法，边长数值越界";
    if (b < 0) result = "数据非法，边长数值越界";
    if (c < 0) result = "数据非法，边长数值越界";
    if (a >= 999) result = "数据非法，边长数值越界";
    if (b >= 999) result = "数据非法，边长数值越界";
    if (c >= 999) result = "数据非法，边长数值越界";
    if (
        a + b > c &&
        a + c > b &&
        b + c > a
    ) {
        if (a == b && a == c)
            result = "该三角形的是等边三角形";
        else if (a == b || a == c || b == c)
            result = "该三角形的是等腰三角形";
        else result = "该三角形的是普通三角形";
    } else result = "所给三边数据不能构成三角形";
    
    return result;
}