import { logger } from "../../lib/helpers/logger";
import { Request, Response } from "express";
import { BlogService } from "./Services";

class BlogControllers {
  private readonly blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getAllContent = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("req.params: ", req.params);
      // console.log("req.query: ", req.query);
      const offset = parseInt(req.query.offset as string) || 0;
      const limit = parseInt(req.query.limit as string) || 6;
      const sort = (req.query.sort as string) || "createdAt";

      const contentList = await this.blogService.getAllContent(
        offset,
        limit,
        sort,
      );

      if (!contentList || contentList.length === 0) {
        logger.warn("no content in db");
        res.status(404).json({ message: "no content in db" });
      } else {
        res.json(contentList);
      }
    } catch (error: any) {
      logger.error("error in getAll Api", error);
      res.status(500).json({ message: error.message });
    }
  };
  getContentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const content = await this.blogService.getContentById(req.params.id);
      if (!content) {
        logger.warn("content not found");
        res.status(404).json({ message: "content not found" });
      } else {
        res.status(200).json(content);
      }
    } catch (error: any) {
      logger.error("error in getContentById Api", error);
      res.status(500).json({ message: error.message });
    }
  };

  createContent = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);

      const createdContent = await this.blogService.createContent(req.body);
      res.status(201).json(createdContent);
    } catch (error: any) {
      logger.error("error in createContent Api", error);
      res.status(400).json({ message: error.message });
    }
  };

  updateContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedContent = await this.blogService.updateContent(
        req.params.id,
        req.body,
      );
      if (!updatedContent) {
        logger.warn("ID not found");
        res.status(404).json({ message: "ID not found" });
      }
      res.status(200).json(updatedContent);
    } catch (err: any) {
      logger.error("error in updateContent Api", err);
      res.status(400).json({ message: err.message });
    }
  };

  deleteContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedContent = await this.blogService.deleteContent(
        req.params.id,
      );
      res.status(200).json(deletedContent);
    } catch (err: any) {
      logger.error("error in deleteContent Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  getUserBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("req.query inside getUserBlogs: ", req.query);
      const offset = parseInt(req.query.offset as string) || 0;
      const limit = parseInt(req.query.limit as string) || 6;
      const sort = (req.query.sort as string) || "createdAt";

      const result = await this.blogService.getUserBlogs(
        req.params.userid,
        sort,
        offset,
        limit,
      );
      if (!result) {
        logger.warn(
          "No Result returned from getUserBlogs Service inside getUserBlogs Controller",
        );
        res
          .status(404)
          .json({
            message:
              "No Result returned from getUserBlogs Service inside getUserBlogs Controller",
          });
      }
      const { userPosts, totalUserPosts } = result;
      if (!userPosts || userPosts.length === 0) {
        logger.warn("No blogs found for this user");
        res.status(404).json({ message: "No blogs found for this user" });
      } else {
        res.status(200).json({ userPosts, totalUserPosts });
      }
    } catch (error: any) {
      logger.error("error in getUserBlogs Api", error);
      res.status(500).json({ message: error.message });
    }
  };

  getDocumentCount = async (req: Request, res: Response): Promise<void> => {
    try {
      const docCount = await this.blogService.getDocCount();
      res.status(200).json(docCount);
    } catch (error: any) {
      logger.error("error in getDocumentCount Api", error);
      res.status(500).json({ message: error.message });
    }
  };

  likeUnlikeContent = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("likeUnlikeContent Controller Pinged");
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);

      const userId = req.body.userId as string;

      console.log("req.params.id:", req.params.id);
      console.log("userId:", userId);

      const content = await this.blogService.likeUnlikeBlog(
        userId,
        req.params.id,
      );
      if (!content) {
        logger.warn("couldn't find blog post to like/unlike");
        res
          .status(404)
          .json({ message: "couldn't find blog post to like/unlike" });
      } else {
        res.status(200).json(content);
      }
    } catch (error: any) {
      logger.error("error in likeUnlikeContent Api", error);
      res.status(500).json({ message: error.message });
    }
  };
}

export { BlogControllers };
