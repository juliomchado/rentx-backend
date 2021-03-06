import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, (req, res) =>
    createCategoryController.handle(req, res)
);

categoriesRoutes.get("/", (req, res) =>
    listCategoriesController.handle(req, res)
);

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    (req, res) => importCategoryController.handle(req, res)
);

export { categoriesRoutes };
