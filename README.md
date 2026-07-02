<div align="center">
  <img src="Survial_Guide/docs/img/logo.png" alt="OUC-HWU Academic Guide" width="168" />
  <h1>OUC-HWU Academic Guide</h1>
  <p><strong>OUC-HWU 计科中外学习与发展指南</strong></p>
  <p>
    面向中国海洋大学 - 赫瑞瓦特大学计算机科学与技术中外合作办学项目的开放式学生知识库。
  </p>
  <p>
    <a href="https://ouc-hw-survial-guidance.readthedocs.io/zh-cn/latest/">Read the Docs</a>
    ·
    <a href="Survial_Guide/docs/index.md">文档源码首页</a>
    ·
    <a href="Survial_Guide/docs/usage-license.md">使用协议</a>
    ·
    <a href="https://github.com/zhaorui-bi/OUC-HW-Survial-Guidance/issues">反馈与勘误</a>
  </p>
</div>

---

## 维护入口

为避免 README 与 Read the Docs 首页重复维护，本仓库只保留一个主内容入口：

**主文档内容请修改：** `Survial_Guide/docs/index.md`

本 `README.md` 仅作为 GitHub 仓库入口页，用于提供项目简介、在线文档链接和维护说明。专题正文、首页排版、文档结构与长期内容均以 Read the Docs 文档为准。

## 常用修改位置

| 修改目标 | 文件位置 |
| --- | --- |
| Read the Docs 首页正文 | `Survial_Guide/docs/index.md` |
| 专栏页面内容 | `Survial_Guide/docs/*.md` |
| 顶部导航与页面顺序 | `Survial_Guide/mkdocs.yml` |
| 字体、颜色、布局样式 | `Survial_Guide/docs/css/custom.css` |
| 顶部专栏下拉交互 | `Survial_Guide/docs/javascripts/nav-dropdown-v4.js` |

## 本地预览

```bash
pip install -r guide_requirement.txt
mkdocs serve -f Survial_Guide/mkdocs.yml
```

打开终端输出中的本地地址即可预览 Read the Docs 站点。

## 协议

本项目采用 [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](LICENSE) 协议（CC BY-NC-SA 4.0）。

你可以在署名、非商业、相同方式共享的前提下使用、转载和改编本项目内容；商业用途请先联系项目维护者获得授权。
