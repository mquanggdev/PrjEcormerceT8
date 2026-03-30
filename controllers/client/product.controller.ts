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
    deleted: boolean,
    priceNew?: {
      $gte: number,
      $lte: number
    },
    discount?: {
      $gt: number
    },
    stock?: {
      $gt: number
    }

  } = {
    deleted: false,
    status: "active",
    category: categoryDetail.id
  };

  
  // Mức giá
  if(req.query.price) {
    const [priceMin, priceMax] = `${req.query.price}`.split("-").map(item => parseInt(item));
    find.priceNew = {
      $gte: priceMin,
      $lte: priceMax
    };
  }
  // Hết Mức giá
  
  // Đang giảm giá
  if(req.query.onSale && req.query.onSale == "true") {
    find.discount = {
      $gt: 0
    }
  }
  // Hết Đang giảm giá

  // Còn hàng
  if(req.query.inStock && req.query.inStock == "true") {
    find.stock = {
      $gt: 0
    }
  }
  // Hết Còn hàng


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
    // Sắp xếp
  const sort: any = {};
  if(req.query.sort) {
    const [sortKey, sortValue] = `${req.query.sort}`.split("-");
    switch (sortKey) {
      case "position":
        sort.position = sortValue;
        break;
      case "price":
        sort.priceNew = sortValue;
        sort.position = sortValue;
        break;
      case "createdAt":
        sort.createdAt = sortValue;
        break;
      case "discount":
        sort.discount = sortValue;
        sort.position = sortValue;
        break;
      default:
        sort.position = "desc";
        break;
    }
  } else {
    sort.position = "desc";
  }
  // Hết Sắp xếp

  const productList: any = await Product
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort)

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
