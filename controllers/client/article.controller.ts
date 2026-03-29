
import { Request, Response } from 'express';

import CategoryBlog from '../../models/categories-blog.model';
import Blog from '../../models/blog.model';
import moment from 'moment';
import AccountAdmin from '../../models/account-admin.model';

export const articleByCategory = async (req: Request, res: Response) => {
    const categoryDetail = await CategoryBlog.findOne({
    slug: req.params.slug,
    deleted: false,
    status: "active"
  })

  if(!categoryDetail) {
    res.redirect("/");
    return;
  }


  const articleList: any = await Blog
    .find({
      category: categoryDetail.id,
      status: "published",
      deleted: false
    })
    .sort({
      createdAt: "desc"
    })

      console.log(articleList);

  for (const item of articleList) {
    // if(item.createdAt) {
    //   item.createdAtFormat = moment(item.createdAt).format("DD/MM/YYYY");
    // }

    if(item.updatedBy) {
      const accountInfo = await AccountAdmin.findOne({
        _id: item.updatedBy
      })
      if(accountInfo) {
        item.authorName = accountInfo.fullName;
        item.date = moment(item.updatedAt).format("DD/MM/YYYY");
      }
    } else {
      const accountInfo = await AccountAdmin.findOne({
        _id: item.createdBy
      })
      if(accountInfo) {
        item.authorName = accountInfo.fullName;
        item.date = moment(item.createdAt).format("DD/MM/YYYY");
      }
    }
  }



  



  res.render("client/pages/article-by-category", {
    pageTitle: categoryDetail.name,
    categoryDetail: categoryDetail,
    articleList: articleList
  });
}
