/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { getBlogPosts, BlogPost } from "@/lib/contentful";
import { Metadata } from "next";
import VerificationBadge from "@/components/VerificationBadge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my latest thoughts, insights, and tutorials on software development",
  openGraph: {
    title: "Blog | Fiston - Portfolio",
    description:
      "Read my latest thoughts, insights, and tutorials on software development",
  },
};

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  const breadcrumbItems = [{ label: "Blog", href: "/blog" }];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <section className="space-y-6">
          {blogPosts.length > 0 ? (
            blogPosts.map((post: BlogPost) => (
              <article key={post.sys.id}>
                <time className="text-gray-500 dark:text-gray-400">
                  {new Date(post.sys.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-lg sm:text-xl font-semibold truncate">
                  <Link
                    href={`/blog/${post.fields.slug}`}
                    className="hover:underline"
                  >
                    {post.fields.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  by {post.fields.author}
                  <VerificationBadge />
                </p>
              </article>
            ))
          ) : (
            <p>
              No blog posts found. Check Contentful for the &apos;blogPost&apos;
              content type.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
