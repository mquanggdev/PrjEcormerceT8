import { Request, Response } from 'express';
import CategoryProduct from '../../models/category-product.model';
import Product from '../../models/product.model';

export const productByCategory = async (req: Request, res: Response) => {
  const categoryDetail = await CategoryProduct.findOne({
    slug: req.params.slug,
    deleted: false,
    status: "active"
  })

  if(!categoryDetail) {
    res.redirect("/");
    return;
  }

  const find: {
    category: string,
    status: string,
    deleted: boolean
  } = {
    deleted: false,
    status: "active",
    category: categoryDetail.id
  };

  // Phân trang
  let limitItems = 20;
  if(req.query.limitItems) {
    const currentLimitItems = parseInt(`${req.query.limitItems}`);
    if(currentLimitItems > 0) {
      limitItems = currentLimitItems;
    }
  }

  let page = 1;
  if(req.query.page) {
    const currentPage = parseInt(`${req.query.page}`);
    if(currentPage > 0) {
      page = currentPage;
    }
  }
  const totalRecord = await Product.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItems);
  const skip = (page - 1) * limitItems;
  const pagination = {
    totalPage: totalPage,
    currentPage: page,
    totalRecord: totalRecord,
    skip: skip
  };
  // Hết Phân trang

  const productList: any = await Product
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort({
      position: "desc"
    })

  for (const item of productList) {
    // Giảm giá
    item.discount = Math.floor(((item.priceOld - item.priceNew) / item.priceOld) * 100);

    // Màu sắc
    const colorSet = new Set();
    item.variants
      .filter((variant: any) => variant.status)
      .forEach((variant: any) => {
        variant.attributeValue.forEach((attr: any) => {
          if(attr.attrType == "color") {
            colorSet.add(attr.value);
          }
        })
      })
    item.colorList = [...colorSet];
  }

  res.render("client/pages/product-by-category", {
    pageTitle: categoryDetail.name,
    categoryDetail: categoryDetail,
    productList: productList,
    pagination: pagination
  });
}
