import { Feed } from "feed";
import { defineEventHandler, appendHeader } from "h3";
import { useAppConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig();
  const nowYear = new Date().getFullYear();
  const feed = new Feed({
    id: 'https://tripper.press/atom.xml',
    title: 'Tripper Press - Take Photo, Think Seriously.',
    link: 'https://tripper.press',
    feedLinks: {
      atom: 'https://tripper.press/atom.xml',
      sitemap: 'https://tripper.press/sitemap.xml',
    },
    copyright: `© $2016 - ${nowYear} Tripper Press`,
  });

  const postsData = await queryCollection(event, 'post').all()

  // 仅输出默认语言（en）的文章，排除 type=page 的独立页面
  const enPosts = postsData.filter((p: any) => p.lang !== 'zh' && p.type !== 'page')

  for (const post of enPosts) {
    const postDate = new Date(post.date);
    feed.addItem({
      title: post.title,
      id: `https://tripper.press${post.path}`,
      link: `https://tripper.press${post.path}`,
      description: post.description,
      date: postDate,
      author: [{ name: 'aiokr', email: 'aiokr@tripper.press', link: 'https://tripper.press' }],
    });
  }

  appendHeader(event, "Content-Type", "application/atom+xml");
  return feed.atom1();
});