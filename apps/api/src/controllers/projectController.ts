import { Request, Response } from 'express';
import { createProject as dbCreateProject, getAllProjects as fetchProjects } from '../services/projectService';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await fetchProjects();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await dbCreateProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
};
