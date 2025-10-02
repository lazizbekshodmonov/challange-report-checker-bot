import type { PaginatedResponse } from '../types/global.js';
import axios from 'axios';
import type { IProject } from '../types/project.js';

export async function getProjects() {
  try {
    const response = await axios.get<PaginatedResponse<IProject>>(
      'https://openbudget.uz/api/v2/info/board/52?regionId=5&districtId=62&categoryId=&page=0&size=10&stage=PASSED&quality='
    );

    return response.data.content;
  } catch (error) {}
}
