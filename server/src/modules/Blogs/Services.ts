import { IBlog } from "./entities";

import { BlogRepository } from "./repositories";

class BlogService {
  blogRepository: BlogRepository;

  constructor() {
    this.blogRepository = new BlogRepository();
  }

  getAllContent = async (
    offset: number,
    limit: number,
    sort: string,
  ): Promise<IBlog[] | null> => {
    return await this.blogRepository.getAll(offset, limit, sort);
  };

  getContentById = async (id: string): Promise<IBlog | null> => {
    return await this.blogRepository.getById(id);
  };
  createContent = async (data: IBlog): Promise<IBlog> => {
    return await this.blogRepository.create(data);
  };
  updateContent = async (id: string, data: IBlog): Promise<IBlog | null> => {
    return await this.blogRepository.update(id, data);
  };
  deleteContent = async (id: string): Promise<any> => {
    return await this.blogRepository.delete(id);
  };

  getUserBlogs = async (
    userId: string,
    sort: string,
    offset: number,
    limit: number,
  ): Promise<{ userPosts: IBlog[]; totalUserPosts: number }> => {
    return await this.blogRepository.getByUser(userId, sort, offset, limit);
  };

  getDocCount = async (): Promise<number> => {
    return await this.blogRepository.docCount();
  };

  likeUnlikeBlog = async (
    userId: string,
    postId: string,
  ): Promise<IBlog | null> => {
    console.log("userId inside likeUnlikeBlog service", userId);
    console.log("postId inside likeUnlikeBlog service", postId);
    return await this.blogRepository.likeUnlike(userId, postId);
  };
}

export { BlogService };
