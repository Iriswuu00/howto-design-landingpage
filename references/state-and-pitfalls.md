# 状态管理、素材权利与常见错误

## 状态结构

项目开始时创建 `.howto-design-landingpage/metadata.json`。

```json
{
  "projectTitle": "",
  "outputDirectory": "",
  "market": "",
  "language": "",
  "conversionModel": "",
  "designSystemId": "local-design-system-v1",
  "screens": {
    "desktop": {
      "current": "",
      "history": []
    },
    "mobile": {
      "current": "",
      "history": []
    }
  },
  "interview": {
    "projectName": "",
    "description": "",
    "targetUsers": "",
    "cta": "",
    "brandFeel": [],
    "colorMode": "",
    "primaryColor": "",
    "headlineFont": "",
    "bodyFont": "",
    "roundness": ""
  },
  "requiredModules": [],
  "knownGaps": [],
  "assetRights": [],
  "iterationCount": 0,
  "status": "interview"
}
```

状态流转：

```text
interview -> designing -> reviewing -> approved -> local_handoff
```

规则：

- 阶段 0 创建 `.howto-design-landingpage/`。
- 每次项目创建、设计系统完成、页面生成、修改、变体选择和批准后都写入状态。
- 如果状态文件已存在，从已保存状态继续。
- `designing`：打开最新版本并继续评审。
- `approved`：进入本地交付。
- `local_handoff`：说明本地文件已经生成，询问是否继续修改。

## 素材权利

用户提供图片时：

- 记录来源和预期用途。
- 记录用户是否确认可商用。
- 公开 URL 不等于授权。
- 如果图片包含可识别人物，尤其是儿童，必须由用户确认广告使用和肖像授权。
- 没有授权时不要把图片上传到第三方服务。

## 声明纪律

禁止虚构：

- 奖项名称
- 认证机构
- 用户评价
- 客户数量
- 营收或增长数据
- 安全保证
- 兼容性承诺
- 医疗、发育或教育效果

无法核验的声明必须删除，或写入 `REVIEW.md` 的待确认项。

## 法律文案

最终商标声明、隐私政策、Cookie 政策和地区合规文案必须由用户或权威来源提供。

模型不能凭记忆编造最终法律文本。占位文案必须明确标记为未完成。

## Cookie 与隐私

装饰性的 Cookie 弹窗不等于法律合规。

如果后续接入分析和营销脚本，必须确认：

- 分类模型
- 同意记录
- 非必要脚本是否等待授权
- 隐私政策和地区披露
- 是否需要在页脚或设置中提供撤回入口

## 可访问性底线

- 文字对比足够
- 焦点状态可见
- 标题层级合理
- 表单控件有 label
- 有意义图片有 alt
- 不依赖颜色传达唯一信息
- 支持 reduced-motion

## 常见错误

| 错误 | 正确做法 |
|---|---|
| 一次问 20 个问题 | 一次一个，最多 10 个 |
| CTA 未确认就开始做页面 | 先锁定用户和行动 |
| 把参考网站当模板 | 提取原则，不复制具体页面 |
| Hero 文案盖住产品 | 重新安排构图和遮罩 |
| 认为遮罩一定可见 | 检查层级和实际对比度 |
| 小 Logo 被放大 | 让显示尺寸匹配源分辨率 |
| 奖项/证书被裁切 | 用自然比例完整展示 |
| 为了丰富而增加板块 | 只保留支持转化的模块 |
| 用假评价填空 | 使用真实授权评价或删除 |
| 本地 Demo 说成生产完成 | 写清楚的 Review 说明 |
| 把部署步骤写进 Skill | 在本地交付处停止 |
| 默认调用第三方设计 API | 使用本地 HTML 实现 |
| 表单没有后端却看起来能用 | 显示预览状态并记录集成缺口 |
| 占位内容混进最终页面 | 在 `REVIEW.md` 中明确列出 |

## 恢复策略

- **会话中断：** 读取状态，打开最新版本，询问从哪里继续。
- **改坏了：** 从版本目录恢复上一版，不覆盖历史。
- **图片缺失：** 使用明确占位块。
- **法律文本未确认：** 删除或标记待确认。
- **用户要求部署：** 说明部署超出本 Skill 范围，需要单独授权。

## 本地交付 `REVIEW.md` 模板

```markdown
# {项目名称} — 本地交付说明

## 已包含
- `index.html`：本地可打开的落地页
- `mobile.html`：移动版，如适用
- `design/DESIGN.md`：设计系统与理由
- `design/color-tokens.json`：结构化设计令牌
- `assets/`：已提供的图片和字体

## 已确认内容
- 产品名称：
- 主要 CTA：
- 已确认的品牌资产：
- 已确认的图片授权：

## 待替换或待接通
- [ ] {CTA URL}
- [ ] {邮件平台 endpoint}
- [ ] {Privacy Policy URL}
- [ ] {正式产品图}
- [ ] {需要核验的奖项或认证}

## 生产集成
- 分析脚本：
- Cookie 同意执行：
- 表单后端：
- UTM 转发：

## 法律与合规
- 商标声明：
- 版权主体：
- 地区合规：
- 儿童肖像或隐私要求：

## 已知限制
- 当前为本地设计交付，不是部署版本。
```
