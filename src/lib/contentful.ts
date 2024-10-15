/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface BlogPost {
  sys: any;
  fields: {
    title: string;
    content: string;
    author: string;
    slug: string;
  };
}

export interface Project {
  sys: any;
  fields: {
    title: string;
    description: string;
    slug: string;
    link: string;
    tags: string;
  };
}

async function getEntries<T>(contentType: string, options = {}): Promise<T[]> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      ...options,
    });
    return response.items as T[];
  } catch (error) {
    console.error(
      `Error fetching entries for content type "${contentType}":`,
      error
    );
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  return getEntries<Project>("project");
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const items = await getEntries<Project>("project", {
    "fields.slug": slug,
    limit: 1,
  });
  return items[0];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getEntries<BlogPost>("blogPost", {
    order: ["-sys.createdAt"],
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const items = await getEntries<BlogPost>("blogPost", {
    "fields.slug": slug,
    limit: 1,
  });
  return items[0];
}
