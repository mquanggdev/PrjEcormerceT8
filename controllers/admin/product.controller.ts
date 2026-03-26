import { Request, Response } from 'express';
import CategoryProduct from '../../models/category-product.model';
import slugify from 'slugify';
import { buildCategoryTree } from '../../helpers/category.helper';
import { pathAdmin } from '../../configs/variable.config';

export const category = async (req: Request, res: Response) => {
  const find: {
    deleted: boolean,
    search?: RegExp
  } = {
    deleted: false
  };

  if(req.query.keyword) {
    const keyword = slugify(`${req.query.keyword}`, {
      replacement: " ",
      lower: true
    });
    const keywordRegex = new RegExp(keyword, "i");
    find.search = keywordRegex;
  }

  // Phân trang
  const limitItems = 20;
  let page = 1;
  if(req.query.page && parseInt(`${req.query.page}`) > 0) {
    page = parseInt(`${req.query.page}`);
  }
  const totalRecord = await CategoryProduct.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItems);
  const skip = (page - 1) * limitItems;
  const pagination = {
    totalRecord: totalRecord,
    totalPage: totalPage,
    skip: skip
  };
  // Hết Phân trang

  const recordList: any = await CategoryProduct
    .find(find)
    .sort({
      createdAt: "desc"
    })
    .limit(limitItems)
    .skip(skip)

  for (const item of recordList) {
    if(item.parent) {
      const parent = await CategoryProduct.findOne({
        _id: item.parent
      })

      item["parentName"] = parent?.name;
    }
  }


  res.render("admin/pages/product-category", {
    pageTitle: "Quản lý danh mục sản phẩm",
    recordList: recordList,
    pagination: pagination

  });
}

export const createCategory = async (req: Request, res: Response) => {
  const categoryList = await CategoryProduct.find({});

  const categoryTree = buildCategoryTree(categoryList);

  res.render("admin/pages/product-create-category", {
    pageTitle: "Tạo danh mục sản phẩm",
    categoryList: categoryTree
  });
}

export const createCategoryPost = async (req: Request, res: Response) => {
  try {
    const existSlug = await CategoryProduct.findOne({
      slug: req.body.slug
    })

    if(existSlug) {
      res.json({
        code: "error",
        message: "Đường dẫn đã tồn tại!"
      })
      return;
    }

    req.body.search = slugify(`${req.body.name}`, {
      replacement: " ",
      lower: true
    });

    const newRecord = new CategoryProduct(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Tạo danh mục thành công!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}


export const editCategory = async (req: Request, res: Response) => {
  try {
    const categoryList = await CategoryProduct.find({});

    const categoryTree = buildCategoryTree(categoryList);

    const id = req.params.id;

    const categoryDetail = await CategoryProduct.findOne({
      _id: id,
      deleted: false
    })

    if(!categoryDetail) {
      res.redirect(`/${pathAdmin}/product/category`);
      return;
    }

    res.render("admin/pages/product-edit-category", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      categoryList: categoryTree,
      categoryDetail: categoryDetail
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/product/category`);
  }
}

export const editCategoryPatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const existSlug = await CategoryProduct.findOne({
      _id: { $ne: id }, // Loại trừ bản ghi có _id trùng với id truyền vào
      slug: req.body.slug
    })

    if(existSlug) {
      res.json({
        code: "error",
        message: "Đường dẫn đã tồn tại!"
      })
      return;
    }

    req.body.search = slugify(`${req.body.name}`, {
      replacement: " ",
      lower: true
    });

    await CategoryProduct.updateOne({
      _id: id,
      deleted: false
    }, req.body)

    res.json({
      code: "success",
      message: "Cập nhật thành công!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}
