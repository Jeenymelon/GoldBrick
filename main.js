auto.waitFor();
log("🚀 启动 GoldBrick 2.0 - 精准打击版");

// --- 1. 唤醒并进入飞书 ---
app.launchPackage("com.ss.android.lark");
sleep(4000);

// --- 2. 函数：封装华为最稳的坐标按压 ---
function forcePress(obj, label) {
    if (obj) {
        var b = obj.bounds();
        var x = b.centerX();
        var y = b.centerY();
        log("📍 点击 " + label + ": (" + x + "," + y + ")");
        // 增加按压深度，模拟真人
        press(x, y, 180);
        return true;
    }
    log("❌ 未找到: " + label);
    return false;
}

/**
 * 比例盲点按压函数
 * @param {number} xRate - 宽度比例 (0 ~ 1)
 * @param {number} yRate - 高度比例 (0 ~ 1)
 * @param {string} label - 日志标签
 */
function blindPress(xRate, yRate, label) {
    var w = device.width;
    var h = device.height;
    var x = Math.round(w * xRate);
    var y = Math.round(h * yRate);

    log("🎯 比例定位 [" + label + "]: (" + x + "," + y + ")");

    // 华为手机建议稍微增加按压时间，模拟真人深度点击
    if (press(x, y, 200)) {
        return true;
    } else {
        log("❌ 点击失败，请检查无障碍权限");
        return false;
    }
}

// ==========================================
// 步骤 1: 在消息列表找到机器人
// ==========================================
// 使用正则匹配，确保只要名字包含“假勤”或“打卡”的机器人都能抓到
const robot = textMatches(/.*(假勤|打卡|机器人).*/).findOne(5000);
if (robot) {
    forcePress(robot, "机器人头像/名字");
    sleep(3000); // 进入聊天室
}

log("正在下滑寻找最新的打卡提醒...");
// 连续下滑 3 次确保到最底部
for (var i = 0; i < 3; i++) {
    swipe(500, 1500, 500, 500, 400);
    sleep(500);
}

sleep(3000)

blindPress(0.5, 0.6, "再不打卡就要迟到了/去打卡");

sleep(3000)

blindPress(0.5, 0.6, "别忘记打下班卡哦/去打卡");

log("程序执行结束");
home();