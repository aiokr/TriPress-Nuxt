import { Feed } from "feed";
import { defineEventHandler, appendHeader } from "h3";
import { serverQueryContent } from "#content/server";

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
  const docs = (await serverQueryContent(event).where({ type: { $ne: 'draft' } })
    .find()).filter((post) => post._path?.startsWith("/post"));
  for (const post of docs) {
    const postDate = new Date(post.date);
    const postText = post.body?.children.map((child) => {
      if (child.type === "element" && child.tag === "p") {
        // Paragraph
        return child.children?.map((child) => {
          if (child.type === "text") {
            // Plain Text
            return child.value;
          } else if (child.type === "element" && child.tag === "img") {
            // Image in Paragraph
            return `<img src="${child.props?.src}" alt="${child.props?.alt}" />`;
          } else if (child.type === "element" && child.tag === "blockquote") {
            // Blockquote
            return `<blockquote>${child.children?.map((child) => {
              if (child.type === "text") {
                return child.value;
              }
            }).join('')}</blockquote>`;
          } else if (child.type === "element" && child.tag === "code") {
            // Code Block
          } else if (child.type === "element" && child.tag === "a") {
            return `<a href="${child.props?.href}">${child.children?.map((child) => {
              if (child.type === "text") {
                return child.value;
              }
            }).join('')}</a>`;
          }
        }).join('');
        // End of Paragraph //
      } else if (child.tag === "h1" || child.tag === "h2" || child.tag === "h3" || child.tag === "h4" || child.tag === "h5" || child.tag === "h6") {
        // Heading 1-6
        return `<${child.tag}>${child.children?.map((child) => {
          if (child.type === "text") {
            return child.value;
          }
        }).join('')}</${child.tag}>`;
      } else if (child.tag === "img") {
        // Image
        return `<img src="${child.props?.src}" alt="${child.props?.alt}" />`;
      }
    }).join('');

    // Add Item to Feed
    feed.addItem({
      id: `https://tripper.press${post._path}`,
      title: post.title as string,
      link: `https://tripper.press${post._path}`,
      description: post.description as string,
      author: [{ name: 'aiokr', email: 'aiokr@tripper.press', link: 'https://tripper.press' }],
      date: postDate,
      content: '<span>Feed function is under development. If the content displayed in the feed is incomplete, you can visit the source website to view the article</span><br />' + postText,
    });
  }
  appendHeader(event, "Content-Type", "application/atom+xml");
  return feed.atom1();
});