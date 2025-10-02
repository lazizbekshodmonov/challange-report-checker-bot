export interface IProject {
  id: string;
  boardId: number;
  quarterName: string;
  publicId: string;
  title: string;
  stage: string;
  createdDate: string;
  districtName: string;
  categoryName: string;
  regionName: string;
  description: string;
  voteCount: number;
  coefficient: number | null;
  grantedAmount: number;
  requestedAmount: number;
  publicControlQuality: string | null;
  images: string[];
}
