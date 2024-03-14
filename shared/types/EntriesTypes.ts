export type Entry = {
  id: number;
  api: string;
  title: string;
  description: string;
  auth: string;
  https: boolean;
  cors: string;
  link: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EntryUpdate = {
  api?: string;
  title?: string;
  description?: string;
  auth?: string;
  https?: boolean;
  cors?: string;
  link?: string;
  category?: string;
};
