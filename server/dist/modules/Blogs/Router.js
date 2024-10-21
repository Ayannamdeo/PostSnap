"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const Controllers_1 = require("./Controllers");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../lib/middlewares/authMiddleware");
class Blog_Router_Class {
    constructor() {
        this.router = express_1.default.Router();
        this.blogControllers = new Controllers_1.BlogControllers();
        // this.setMiddlewares();
        this.setupRoutes();
    }
    static getInstance() {
        if (!Blog_Router_Class.instance) {
            Blog_Router_Class.instance = new Blog_Router_Class();
        }
        return Blog_Router_Class.instance;
    }
    // private setMiddlewares(): void {
    //   this.router.use(AuthMiddleware.authenticate);
    // }
    setupRoutes() {
        this.router.get("/", this.blogControllers.getAllContent);
        this.router.get("/:id", this.blogControllers.getContentById);
        this.router.get("/count/documentcount", this.blogControllers.getDocumentCount);
        this.router.post("/", authMiddleware_1.AuthMiddleware.authenticate, this.blogControllers.createContent);
        this.router.put("/:id", authMiddleware_1.AuthMiddleware.authenticate, this.blogControllers.updateContent);
        this.router.delete("/:id", authMiddleware_1.AuthMiddleware.authenticate, this.blogControllers.deleteContent);
        this.router.get("/userblogs/:userid", authMiddleware_1.AuthMiddleware.authenticate, this.blogControllers.getUserBlogs);
        this.router.post("/likeunlike/:id", authMiddleware_1.AuthMiddleware.authenticate, this.blogControllers.likeUnlikeContent);
    }
}
const Blog_Router_Class_instance = Blog_Router_Class.getInstance();
const BlogRouter = Blog_Router_Class_instance.router;
exports.BlogRouter = BlogRouter;
