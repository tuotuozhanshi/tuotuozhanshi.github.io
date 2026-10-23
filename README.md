# Yang Li / 李杨 — bilingual academic homepage

本包基于你上传的最新仓库修改：保留既有学术资料、七篇论文、期刊版 PDF、CV、主页头像与背景；新增华为实习栏目、山东大学校徽 favicon 和中英文切换。

## 上传到 GitHub（不需要清空仓库）

1. 解压后进入 **能看到 `index.html` 的那一层**。
2. 打开现有个人主页仓库的根目录，选择 **Add file → Upload files**。
3. 将这一层的文件和文件夹上传到根目录，覆盖同路径文件。不要直接上传 ZIP，也不要把外层文件夹再套进去。
4. 提交 **Commit changes**。这只更新仓库文件；网页仍需完成原有的发布流程。
5. 使用原来的个人主页网址。不要为这次更新删除仓库或更改仓库名称。

主要文件/文件夹：`index.html`、`contents/`、`static/`、`papers/`、`favicon.ico`、`README.md`、`LICENSE`、`tools/`。`.nojekyll` 是静态站点标记。包内已去除 `.idea`、`__MACOSX` 和旧模板截图，不影响主页。

## 本地预览

直接打开 `index.html` 可查看页面并切换语言，无需先发布。图片和本地 PDF 使用相对路径，所以请完整解压并保留目录结构。

也可以在本目录运行 `python3 -m http.server 8000`，在浏览器打开 `http://localhost:8000/`。不需要安装网页框架或运行 npm。

## 中英文切换

- 默认英文；右上角 **EN / 中文** 切换导航、介绍、学术背景、实习、荣誉及其他界面文字。
- 电脑和手机均显示语言按钮。
- 浏览器允许本地存储时，会记住上次选择；隐私模式阻止存储时，按钮仍然正常工作。
- `?lang=zh` 和 `?lang=en` 可以指定链接语言，优先于已保存的选择。
- 论文题名、作者署名和期刊名保留英文原文。论文 PDF 及 CV 不会随语言切换而翻译；CV 仍为现有英文版本。

## 实习栏目

- 单位：华为技术有限公司 / Huawei Technologies Co., Ltd.
- 岗位：软件研发工程师（实习） / Software R&D Engineer (Internship)
- 时间：2023-06-28 至 2023-08-25，按所提供实习证明填写。
- 所提供的实习证明与园区夜景均已插入；点击可放大，按 Escape 或点击关闭按钮退出。
- 未添加未提供的具体工作职责、项目、技术栈或实习奖励。

### 实习证明隐私处理

**公开包只含脱敏后的图片。**证明中的中英文两处身份证/护照号码已用不透明色块直接覆盖到图像像素，不是 CSS 遮罩；未经遮挡的原图不在包中。姓名、实习日期、单位名称、证明文字及印章保留。请不要额外将未经遮挡的原图上传到公开仓库。

公开图：`static/assets/img/huawei-internship-certificate-redacted.png`。
园区照片：`static/assets/img/huawei-campus.jpg`（去除图片元数据后重新保存）。

## 网站小图标

使用提供的山东大学校徽，不再使用个人头像。包含多尺寸 `favicon.ico`、32/192 像素 PNG 及 Apple touch icon；校徽以浅色圆底适配深色标签页。HTML 中带有版本参数。主页大头像保持不变。

## 后续内容修改

| 内容 | 英文文件 | 中文文件 |
| --- | --- | --- |
| 页面标题、导航、界面文字 | `contents/config.yml` | `contents/zh/config.yml` |
| 简介与研究兴趣 | `contents/home.md` | `contents/zh/home.md` |
| 论文 | `contents/publications.md` | `contents/zh/publications.md` |
| 教育、课程、会议、技能 | `contents/background.md` | `contents/zh/background.md` |
| 实习 | `contents/internship.md` | `contents/zh/internship.md` |
| 荣誉 | `contents/awards.md` | `contents/zh/awards.md` |

已发布的网站会读取 Markdown 和 YAML 文件。请同时维护中英文两份内容。

为了让双击本地 `index.html` 的预览也同步显示后续修改，可在本目录运行：

```sh
node tools/build-content.cjs
```

这一步仅需要 Node.js，不需要安装额外依赖。它会更新 `static/js/site-content.js` 和 `index.html` 中的备用正文。普通 GitHub 在线 Markdown 更新不依赖此步骤；它主要用于同步离线预览副本。

## 论文与简历

- 七篇论文的顺序、署名、题名与原状态保持不变。
- 四篇已发表文章继续使用原上传的期刊 PDF。
- 向量停车函数预印本和欧拉数在审稿件使用原上传文件。
- 已录用的 stack-sortability 论文的 `[pdf]` 继续指向公开的 arXiv PDF，需要网络，不在本地 `papers/` 中。
- 所有 `[pdf]` 链接均保持蓝色，在新标签页打开。
- CV 位于 `static/assets/docs/Yang_Li_CV.pdf`，未增改 CV 本身。

## English maintenance notes

This is a static, bilingual academic homepage, with no server-side dependency. The original academic content and PDF files are retained. English content is in `contents/`; Chinese content is in `contents/zh/`. The main script falls back to locally embedded content if content requests are unavailable. The language choice is stored locally when browser storage is available.

The new internship entry contains only the employer, role, and dates supplied by the owner, with an irreversibly redacted certificate image and the supplied campus photograph. No unredacted certificate is included in this public package.

Original template attribution and license are retained in `LICENSE`; dependencies retain their existing license notices.
