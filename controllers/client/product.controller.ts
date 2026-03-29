
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
  const productList: any = await Product
    .find({
      deleted: false,
      status: "active",
      category: categoryDetail.id
    })
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
    productList: productList
  });
}