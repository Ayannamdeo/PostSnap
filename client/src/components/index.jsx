import { lazy } from "react";

// const ErrorMessage = lazy(() => import("./ErrorMessage").then(module => ({ default: module.ErrorMessage })));

const ArticleCard = lazy(()=> import("./ArticleCard").then(module => ({ default: module.ArticleCard})));
const ErrorMessage = lazy(()=> import("./ErrorMessage").then(module => ({ default: module.ErrorMessage})));
const Footer = lazy(()=> import("./Footer").then(module => ({ default: module.Footer})));
const BreadCrumbs = lazy(()=> import("./BreadCrumbs").then(module => ({ default: module.BreadCrumbs})));
const Header = lazy(()=> import("./Header").then(module => ({ default: module.Header})));
const SkeletonArticleCard = lazy(()=> import("./SkeletonArticleCard").then(module => ({ default: module.SkeletonArticleCard})));
import { MainLayout } from "./MainLayout";

export { ArticleCard, ErrorMessage, Footer, BreadCrumbs, Header, MainLayout, SkeletonArticleCard };
