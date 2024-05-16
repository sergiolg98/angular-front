export interface Note {
  id?: number,
  content: string,
  active: boolean,
  createdAt?: string,
  updatedAt?: string,
  categoriesIncludes?: any[];
}