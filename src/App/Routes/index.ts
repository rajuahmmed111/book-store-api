import express from "express";
import { authorRoute } from "../Modules/Authors/author.route";
import { bookRoute } from "../Modules/Book/book.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/authors",
    route: authorRoute,
  },
  {
    path: "/books",
    route: bookRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
