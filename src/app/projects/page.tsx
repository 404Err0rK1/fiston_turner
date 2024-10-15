/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, Project } from "@/lib/contentful";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of software development projects and applications",
  openGraph: {
    title: "Projects | Fiston - Portfolio",
    description:
      "Explore my portfolio of software development projects and applications",
  },
};

export default async function Projects() {
  const projects = await getProjects();

  const breadcrumbItems = [{ label: "Projects", href: "/projects" }];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <section className="grid gap-6 sm:grid-cols-2">
          {projects.length > 0 ? (
            projects.map((project: Project) => (
              <ProjectCard key={project.sys.id} project={project} />
            ))
          ) : (
            <p>
              No projects found. Check Contentful for the &quot;project&quot;
              content type.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
