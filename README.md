# Yang Li / 李杨 — bilingual academic homepage

## 本次版本：compact-sdu-r6

- 预印本小标题为 **Preprints / 预印本**，两篇条目均写 **preprint**，不再显示 manuscript under review。
- 中英文版的论文条目使用一致的英文信息，包括 preprint、accepted for publication、Article；作者、题名、期刊、卷号、年份和文章号均保留。
- 实习经历保留一个简洁条目，公司、日期和岗位分层排列，窄屏自然换行，后面只显示两个相邻的蓝色 **[pdf][pdf]** 链接，不加可见的说明或分隔符；第一个打开实习证明，第二个打开园区照片。页面不加载或展开图片。
- 两个实习链接均指向真实 PDF。证明中的两处证件号已在像素层面遮挡，未经脱敏的原图不在本包中。
- 浏览器图标使用山东大学校徽。使用新的 `sdu-favicon-*-r4` 文件名，同时替换根目录 `favicon.ico`、旧路径图标及 Apple touch icon。
- 仍有七篇论文；原有论文 PDF、CV、头像、背景、学术经历与中英文切换保留。

## 上传到 GitHub

1. 解压后打开 `tuotuozhanshi.github.io` 文件夹，进入能看到 `index.html` 的这一层。
2. 打开原仓库的根目录，选择 **Add file → Upload files**。
3. 上传这一层里的文件和文件夹并提交。不要上传 ZIP，也不要多套一层外部文件夹，不必先删除原仓库。
4. 特别确认 `index.html`、`contents/`、`static/` 和根目录 `favicon.ico` 均更新。只换正文不会同步修复图标。
5. 发布完成后重新打开个人主页。本包只修改文件，不会自动替你更新 GitHub 上的内容。

若仍显示旧图标，先确认最新 HTML 引用的是 `static/assets/sdu-favicon-r4.ico` 等新文件，且这些文件已上传成功。旧标签页或浏览器存储可能仍保留旧显示；关闭原标签页后重新打开，或使用新隐私窗口核对。无需先清除整个浏览器历史或删除所有网站数据。

## 本地预览

完整解压后双击 `index.html` 即可预览并切换语言。也可以在项目目录运行：

```sh
python3 -m http.server 8000
```

再访问 `http://localhost:8000/`。

## 维护内容

| 内容 | 英文 | 中文 |
| --- | --- | --- |
| 导航与页面标题 | contents/config.yml | contents/zh/config.yml |
| 个人介绍 | contents/home.md | contents/zh/home.md |
| 论文 | contents/publications.md | contents/zh/publications.md |
| 学术背景 | contents/background.md | contents/zh/background.md |
| 实习 | contents/internship.md | contents/zh/internship.md |
| 荣誉 | contents/awards.md | contents/zh/awards.md |

在线网页读取上述文件。修改后可运行 `node tools/build-content.cjs`，同步离线预览正文和 `static/js/site-content.js`。不需要 npm install。

## 实习文件与隐私

- `static/assets/docs/huawei-internship-certificate.pdf`：已脱敏证明。
- `static/assets/docs/huawei-campus-photo.pdf`：园区照片 PDF。
- `static/assets/img/huawei-internship-certificate-redacted.png`：已脱敏图片，仅作源素材，不内嵌到主页。
- `static/assets/img/huawei-campus.jpg`：园区照片源素材，不内嵌到主页。

PDF 由上述公开素材直接转换，保留原图比例，不添加工作职责或项目描述。不要把未经遮挡的证件号码原图另外上传至公开仓库。

## 论文与 CV

四篇已发表论文继续使用用户提供的期刊版文件；两篇预印本使用提供的稿件。已录用的 stack-sortability 论文继续外链 arXiv PDF，因此这一条打开时需要网络。CV 位于 `static/assets/docs/Yang_Li_CV.pdf`，本轮没有修改 CV 或论文 PDF 本身。

原模板许可证及署名保留在 `LICENSE`。
