export default function testingUseCases(testData) {
    let result = []
    for (side of testData) {
        let testResult;
        if (side[0] < 0) testResult = "数据非法，边长数值越界";
        if (side[1] < 0) testResult = "数据非法，边长数值越界";
        if (side[2] < 0) testResult = "数据非法，边长数值越界";
        if (side[0] >= 999) testResult = "数据非法，边长数值越界";
        if (side[1] >= 999) testResult = "数据非法，边长数值越界";
        if (side[2] >= 999) testResult = "数据非法，边长数值越界";
        if (
            side[0] + side[1] > side[2] &&
            side[0] + side[2] > side[1] &&
            side[1] + side[2] > side[0]
        ) {
            if (side[0] == side[1] && side[0] == side[2])
                testResult = "该三角形的是等边三角形";
            else if (side[0] == side[1] || side[0] == side[2] || side[1] == side[2])
                testResult = "该三角形的是等腰三角形";
            else testResult = "该三角形的是普通三角形";
        } else testResult = "所给三边数据不能构成三角形";
        result.pushback(testResult);
    }
    return result;
}