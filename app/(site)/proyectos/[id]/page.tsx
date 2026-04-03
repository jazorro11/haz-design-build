import type { Metadata } from "next";
import ProjectDetail, { ProjectNotFound } from "@/views/ProjectDetail";
import { getProjectById } from "@/data/projects";
import { buildPageMetadata } from "@/lib/site-metadata";

const typeLabels: Record<string, string> = {
  residential: "Residencial",
  commercial: "Comercial",
  institutional: "Institucional",
  industrial: "Industrial",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    return buildPageMetadata({
      title: "Proyecto no encontrado",
      path: `/proyectos/${id}`,
      noindex: true,
    });
  }
  const typeLabel = typeLabels[project.type] || project.type;
  return buildPageMetadata({
    title: project.name,
    description: `${project.name} — ${project.location}. Proyecto de ${typeLabel} por HAZ Arquitectura.`,
    path: `/proyectos/${project.id}`,
  });
}

export default async function ProyectoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    return <ProjectNotFound />;
  }
  return <ProjectDetail project={project} />;
}
