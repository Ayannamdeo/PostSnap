import { BlogControllers } from "./Controllers";

import express, { Request, Response, Router } from "express";
import { AuthMiddleware } from "../../lib/middlewares/authMiddleware";

class Blog_Router_Class {
  private static instance: Blog_Router_Class;
  router: Router;
  private readonly blogControllers: BlogControllers;

  private constructor() {
    this.router = express.Router();
    this.blogControllers = new BlogControllers();
    // this.setMiddlewares();
    this.setupRoutes();
  }

  static getInstance(): Blog_Router_Class {
    if (!Blog_Router_Class.instance) {
      Blog_Router_Class.instance = new Blog_Router_Class();
    }
    return Blog_Router_Class.instance;
  }
  // private setMiddlewares(): void {
  //   this.router.use(AuthMiddleware.authenticate);
  // }

  private setupRoutes(): void {
    this.router.get("/", this.blogControllers.getAllContent);

    this.router.get("/:id", this.blogControllers.getContentById);

    this.router.get( "/count/documentcount", this.blogControllers.getDocumentCount,);

    this.router.post( "/", AuthMiddleware.authenticate, this.blogControllers.createContent,);

    this.router.put( "/:id", AuthMiddleware.authenticate, this.blogControllers.updateContent,);

    this.router.delete( "/:id", AuthMiddleware.authenticate, this.blogControllers.deleteContent,);

    this.router.get( "/userblogs/:userid", AuthMiddleware.authenticate, this.blogControllers.getUserBlogs,);

    this.router.post( "/likeunlike/:id", AuthMiddleware.authenticate, this.blogControllers.likeUnlikeContent,);
  }
}
const Blog_Router_Class_instance: Blog_Router_Class =
  Blog_Router_Class.getInstance();
const BlogRouter = Blog_Router_Class_instance.router;

export { BlogRouter };
