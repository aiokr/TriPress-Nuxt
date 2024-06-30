import { Feed } from "feed";
import { defineEventHandler, appendHeader } from "h3";
import { serverQueryContent } from "#content/server";

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig();
  const feed = new Feed({
    id: 'https://tripper.press/atom.xml',
    title: 'Tripper Press - Take Photo, Think Seriously.',
    link: 'https://tripper.press',
    feedLinks: {
      atom: 'https://tripper.press/atom.xml',
      sitemap: 'https://tripper.press/sitemap.xml',
    },
    copyright: `© $2016 - {new Date().getFullYear()} Tripper Press`,
  });
  const docs = (await serverQueryContent(event).where({ type: { $ne: 'draft' } })
    .find()).filter((post) => post._path?.startsWith("/post"));
  for (const post of docs) {
    const postDate = new Date(post.date);
    feed.addItem({
      id: `https://tripper.press${post._path}`,
      title: post.title as string,
      link: `https://tripper.press${post._path}`,
      date: postDate,
    });
  }
  appendHeader(event, "Content-Type", "application/atom+xml");
  return feed.atom1();
});