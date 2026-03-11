import { Request, Response } from "express";
import CategoryBlog from "../../models/categories-blog.model";
import { buildCategoryTree } from "../../helpers/category.helper";

export const category = (req: Request, res: Response) => {
  res.render("admin/pages/article-category", {
    pageTitle: "Quản lý danh mục bài viết",
  });
};

export const createCategory = async (req: Request, res: Response) => {
  const categoryList = await CategoryBlog.find({});

  const categoryTree = buildCategoryTree(categoryList);

  res.render("admin/pages/article-create-category", {
    pageTitle: "Tạo danh mục bài viết",
    categoryList: categoryTree,
  });
};

export const createCategoryPost = async (req: Request, res: Response) => {
  const existSlug = await CategoryBlog.findOne({
    slug: req.body.slug,
  });

  if (existSlug) {
    res.json({
      code: "error",
      message: "Đường dẫn đã tồn tại!",
    });
    return;
  }

  const newRecord = new CategoryBlog(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo danh mục thành công!",
  });
};
