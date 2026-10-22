# Yang Li — Academic Homepage

这是按最终版 `Yang_Li_CV.pdf` 更新的个人主页项目，保留原主页的背景图片、照片和蓝色配色。

## 本次更新

- 按 CV 更新博士身份、导师、教育经历、研究兴趣、课程、会议、荣誉及软件技能。
- 收录 CV 中六篇论文，再加上作者提供的欧拉数论文，共七篇。
- 每篇条目末尾都有蓝色 `[pdf]`，在新标签页打开论文，不是 GitHub 文件预览页。
- 四篇已发表论文使用作者上传的期刊 PDF，文件内容未修改。
- 欧拉数论文按作者提供的信息标为 `manuscript under review`，不显示投稿期刊名称。
- Annals of Combinatorics 论文保留 `accepted for publication`，其 `[pdf]` 直达 arXiv PDF。
- 添加当前 CV 链接；没有添加 CSC 资助、LLM 技能或未提供的经历。
- 移除重复的 MathJax 加载和旧兼容脚本，保留本地 Markdown、YAML、Bootstrap 和数学渲染依赖。

## 上传 GitHub

1. 解压整个 ZIP，进入 `tuotuozhanshi.github.io` 文件夹。
2. 把**该文件夹里面**的 `index.html`、`contents`、`static`、`papers`、`README.md` 等上传到原仓库的根目录，并覆盖同路径文件。
3. 不要把 ZIP 本身当作网页上传，也不要把 `tuotuozhanshi.github.io` 整个目录嵌套到仓库的下一层。
4. 提交修改后，按原有 GitHub Pages 设置部署。这个项目不需要运行构建命令。
5. 网站地址不变。若浏览器仍显示旧内容，强制刷新并确认 Pages 的部署完成。

若用 Git 操作，请先保留自己的原仓库备份，再覆盖内容、检查 `git diff` 后提交。这里没有代你推送或发布线上网站。

## 文件结构与今后修改

- `contents/home.md`：简介、研究兴趣、邮箱和 CV 链接。
- `contents/publications.md`：七篇论文及其 PDF 链接。
- `contents/background.md`：教育、课程、会议、技能及语言。
- `contents/awards.md`：CV 中的荣誉。
- `contents/config.yml`：页面标题、各栏目标题及页脚。
- `papers/`：六篇已随包提供的论文 PDF。
- `static/assets/docs/Yang_Li_CV.pdf`：当前一页 CV，仍保留原来的六篇论文。
- `static/css/main.css`：自定义样式，`.pdf-link` 控制蓝色 `[pdf]`。
- `index.html`：页面框架及本地预览备用内容。

线上页面会读取 `contents/*.md`，今后主要编辑这些文件即可。直接双击 `index.html` 可以查看本次打包时的完整页面；修改 Markdown 后要查看最新内容，请在项目文件夹运行：

```sh
python3 -m http.server 8000
```

然后打开 `http://localhost:8000`。

## PDF 来源及版本

| 论文 | 本项目使用的 PDF |
| --- | --- |
| Symmetries on vector parking functions via bounded lattice paths | 作者上传的 arXiv:2610.05665v1 |
| Involutive proofs of various combinatorial identities for Euler numbers | 作者上传的 Eul-Iden-0125.pdf（44 页） |
| A bijection between 321- and 213-avoiding permutations preserving t-stack-sortability | https://arxiv.org/pdf/2507.09187（外部直链，未在包内伪造本地文件） |
| Bijections in weakly increasing trees via binary trees | 作者上传的 Discrete Mathematics 348 (2025), 114632 |
| Bijections around Springer numbers | 作者上传的 Discrete Mathematics 348 (2025), 114570 |
| Two involutions on binary trees and generalizations | 作者上传的 Advances in Applied Mathematics 156 (2024), 102677 |
| A symmetry on parking functions via Dyck paths | 作者上传的 Discrete Mathematics 346 (2023), 113426 |

Annals 稿件的公开状态核对：
https://pureportal.strath.ac.uk/en/publications/a-bijection-between-321-and-213-avoiding-permutations-preserving-/

项目中的 CV 包含作者提供的联系方式等个人信息。正式公开网站前，请自行确认公开范围、合作者对未发表稿件公开的意见，以及期刊 PDF 的分享许可。本次没有修改任何论文或 CV 内容。

## 模板许可

原模板基于 Sen Li 的 academic-homepage-template 和 Start Bootstrap。
保留原 `LICENSE`；模板许可不覆盖各篇论文的版权。
