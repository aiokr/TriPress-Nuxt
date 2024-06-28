---
title: 宣布 Tripper Press @ Nuxt
date: 2024-06-30T00:00:00.000Z
category: 开发
slug: release-tripper-nuxt
cover: https://imgur.lzmun.com/tricms/1712709442394-20230218-web.jpeg_itp
type: post
---

好家伙，Tripper Press 又改版了。

这次，我把 Tripper Press 从 Next.js 迁移到了 Nuxt.js。这个决定是因为 Next.js 依托于 Vercel，然而我的 Vercel 现在已经寄了。

![402 PAYMENT\_REQUIRED](https://imgur.lzmun.com/tricms/1718632444912-Snipaste_2024-06-17_21-53-55.png_itp)

自从接入 Sanity 之后，Vercel 的 Edge Requests、Fast Origin Transfer 以及 Bandwidth 等项目用量就大幅飙升，仅 6 月 2 日单日，Tripper-Next 项目的 Fast Origin Transfer 消耗高达 8.57GB，Bandwidth 消耗高达 5.74GB，在过去 30 天中，Fast Origin Transfer 消耗共计 34GB，Bandwidth 消耗 10GB。感觉我的博客应该不会有这么高的访问量，应该是哪里出了问题，也许是 RSS 等爬虫在爬取网站的时候，将图片等静态资源也大量下载，导致了这个问题。

兜兜转转，最终我又放弃了 CMS + SSR 的方案，转而使用之前静态网站生成器的方案。这次我选择了 Nuxt.js，首先因为不能再使用 Vercel，并且之前用的 Contentlayer 并不支持在 Windows 上运行，加上我最近做的几个小工具都是基于 Nuxt 或者 VUE 的，所以这次就选择了 Nuxt。

Nuxt 的优势有很多， 基于 VUE 所带来优势不谈，Nuxt 的众多官方插件，包括 Nuxt Content、Nuxt Studio 等，绝对是一大优势，事实上，这一篇文章就是在 Nuxt Studio 中敲出来的。

按照惯例，这次的网站依然在 [aiokr/TriPress-Nuxt](https://github.com/aiokr/TriPress-Nuxt) 上开源，欢迎大家 star，当然在 fork 之后，记得删除仓库内的 Markdown 文件，修改 `nuxt.config.js` 中的一些配置，比如 turnstile 的 siteKey、分析插件的 ID 等。

在这次改版中，我除了保留了之前版本的一些设计样式之外，还借鉴了不少其他个人站点的创意：

- [Hong - A Full Stack Developer](https://honghong.me/)
- [可可托海没有海](https://darmau.design/)
- [Camarts](https://camarts.cn/)
- [Maxime Heckel's Blog](https://blog.maximeheckel.com/)

---

## Markdown 样式测试

```js
var s = "JavaScript syntax highlighting";
alert(s);
```
