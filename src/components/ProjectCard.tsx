import Link from "next/link";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiGooglegemini,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { DiRedis } from "react-icons/di";
import { Project } from "@/lib/contentful";
import { ExternalLink } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  react: FaReact,
  nodejs: FaNodeJs,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  mongodb: SiMongodb,
  nextjs: RiNextjsFill,
  redis: DiRedis,
  gemini: SiGooglegemini,
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const tags =
    project.fields.tags?.split(",").map((tag) => tag.trim().toLowerCase()) ||
    [];

  return (
    <article className="border border-gray-200 dark:border-neutral-800 p-4 rounded-lg flex flex-col">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        <Link
          href={`/projects/${project.fields.slug}`}
          className="hover:underline"
        >
          {project.fields.title}
        </Link>
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2 line-clamp-5">
        {project.fields.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => {
          const Icon = iconMap[tag];
          return (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {Icon && <Icon className="mr-1" />}
              {tag}
            </span>
          );
        })}
      </div>
      {project.fields.link && (
        <a
          href={project.fields.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black rounded-md dark:hover:bg-gray-200 dark:hover:text-gray-800 bg-black hover:bg-gray-800  transition-colors duration-150"
        >
          View Project
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      )}
    </article>
  );
};

export default ProjectCard;
