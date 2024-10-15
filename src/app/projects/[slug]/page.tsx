import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getProject } from "@/lib/contentful";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.fields.title,
    description: project.fields.description,
    openGraph: {
      title: `${project.fields.title} | Fiston - Portfolio`,
      description: project.fields.description,
      type: "website",
    },
  };
}

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: project.fields.title, href: `/projects/${params.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <Breadcrumb items={breadcrumbItems} />
        <article>
          <h1 className="text-4xl font-bold mb-4">{project.fields.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Created:{" "}
            {new Date(project.sys.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>{project.fields.description}</p>
            {/* Add more project details here as needed */}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
