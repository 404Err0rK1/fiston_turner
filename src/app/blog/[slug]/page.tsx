import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getBlogPost } from "@/lib/contentful";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.fields.title,
    description: post.fields.content.substring(0, 160), // First 160 characters as description
    openGraph: {
      title: `${post.fields.title} | Fiston - Portfolio`,
      description: post.fields.content.substring(0, 160),
      type: "article",
      authors: [post.fields.author],
      publishedTime: post.sys.createdAt,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.fields.title, href: `/blog/${params.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <Breadcrumb items={breadcrumbItems} />
        <article>
          <h1 className="text-4xl font-bold mb-4">{post.fields.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            by {post.fields.author} |{" "}
            {new Date(post.sys.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.fields.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
