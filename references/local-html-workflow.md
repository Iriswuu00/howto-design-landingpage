# 本地 HTML 工作流

## 原则

页面完全在本地生成和评审，不使用第三方设计平台 API。

设计系统是唯一视觉来源，HTML/CSS 是最终实现。每一步都要能解释为什么这样做。

## 项目开始

创建：

```text
{project-name}/
  assets/
  design/
    DESIGN.md
    color-tokens.json
  .howto-design-landingpage/
    metadata.json
    versions/
```

如果需要统一工程起点，可以使用：

```bash
cp assets/landing-page-starter.html {project-name}/index.html
```

之后必须替换所有示例内容和占位符。起始模板不是最终设计。

## 实现顺序

1. 编写语义化 HTML 结构。
2. 用 `design/color-tokens.json` 定义 CSS variables。
3. 先实现移动版。
4. 扩展到平板和桌面。
5. 接入图片并检查裁切与焦点。
6. 添加轻量交互。
7. 按需求加入 Cookie 和邮件订阅状态。
8. 运行 HTML 校验。
9. 在本机浏览器检查多个宽度。

## HTML 规则

- 只有一个 `<main>` 和一个主 `<h1>`。
- 使用 `<header>`、`<nav>`、`<main>`、`<footer>`。
- 标题层级必须合理。
- 动作使用 `<button>`，导航使用 `<a>`。
- 所有图片必须有 `alt` 属性；纯装饰图使用 `alt=""`。
- 已知图片尺寸时写入 `width` 和 `height`。
- 非首屏图片使用 `loading="lazy"`。
- 大图可以使用 `decoding="async"`。
- 外部新窗口链接必须有 `rel="noopener"` 或 `noreferrer`。
- 表单必须有 label 和可见的错误反馈。
- 表单和 Consent 状态使用 `aria-live`。

## CSS 规则

- 设计令牌放在 `:root`。
- 使用 Grid 和 Flexbox，不要用大量绝对定位堆页面。
- 保持正文行宽可读。
- 移动端不是桌面缩小版。
- 提供可见 focus 状态。
- 支持 `prefers-reduced-motion`。
- 不要在可能换行的文本外使用固定高度。
- 导航吸顶要实际测试；祖先元素的 overflow 可能让 sticky 失效。
- 遮罩、图片和文字的 z-index 要实际验证。
- 不使用不透明卡片覆盖产品主体，除非产品仍然清楚可见。

## 响应式检查

至少检查：

- 390px 手机
- 768px 平板
- 1280px 桌面
- 1440px 宽屏

重点查看：

- 横向溢出
- 标题被截断
- 产品主体被裁切
- 导航碰撞
- 文字压在复杂图片上不可读
- Cookie 弹窗遮挡移动 CTA
- 页脚列顺序是否合理
- 小图是否被放大变模糊

## 图片处理

照片优先使用 WebP 或 AVIF，Logo 根据需要使用透明 PNG 或 SVG。

使用前检查源文件尺寸：

- 不把小尺寸 Logo 放大显示。
- Logo 模糊是资源尺寸和 CSS 尺寸不匹配，不是“风格问题”。
- 设计需要 Logo 与按钮对齐时，使用明确的一致高度。
- 奖项/证书属于证据内容时，使用自然比例或 `object-fit: contain`，不要裁切。

## 状态与版本

每个重要版本保存为独立文件：

```text
.howto-design-landingpage/versions/desktop-v1.html
.howto-design-landingpage/versions/desktop-v2.html
.howto-design-landingpage/versions/mobile-v1.html
```

也可以在版本目录中保存变体：

```text
desktop-v2-option-a.html
desktop-v2-option-b.html
desktop-v2-option-c.html
```

不覆盖旧版本。

## 反馈循环

每次修改：

1. 判断用户反馈属于内容、构图、视觉还是实现问题。
2. 检查问题真正来自文案数量、图层、素材，还是布局。
3. 做解决该问题的最小改动。
4. 重新打开页面。
5. 使用访谈框架中的三个反馈问题。

## 变体

- **定向优化**：保留构图，只改一个方面
- **探索**：改变布局或色彩，但保留产品事实
- **重想**：重新组织整个页面

一次最多三个变体。编号并记录用户最终选择。

## 邮件订阅和 Cookie

### 邮件订阅

- 表单必须有 label
- 说明谁可以提交，例如家长或成年购买者
- 包含同意文案
- 不收集儿童个人信息
- endpoint 必须可配置
- 未接后端时不能伪装成已上线表单

### Cookie

- 区分必要、分析和营销
- 可选类别默认关闭
- 提供全部接受和拒绝可选
- 需求允许时提供重新查看偏好的入口
- 未获得有效偏好前，不加载可选脚本

## 本地交付

最终可以是：

- 目录包：`index.html` + `assets/`
- 单文件 HTML：字体和图片内嵌

两种都可以。根据可移植性和后续编辑需求选择。

不包含部署步骤。页面在本地打开、没有坏图、并且 `REVIEW.md` 明确列出缺口，即视为本地交付完成。
