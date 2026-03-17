import { Request, Response } from "express";

import FormData from "form-data";
import axios from "axios";
import Media from "../../models/media.model";

import moment from "moment";
import { formatFileSize } from "../../helpers/format.helper";
import { domainCDN } from "../../configs/variable.config";

export const fileManager = async (req: Request, res: Response) => {
  // Phân trang
  const limitItems = 20;
  let page = 1;
  if (req.query.page && parseInt(`${req.query.page}`) > 0) {
    page = parseInt(`${req.query.page}`);
  }
  const totalRecord = await Media.countDocuments({});
  const totalPage = Math.ceil(totalRecord / limitItems);
  const skip = (page - 1) * limitItems;
  const pagination = {
    totalRecord: totalRecord,
    totalPage: totalPage,
    skip: skip,
  };
  // Hết Phân trang

  const listFile: any = await Media.find({})
    .sort({
      createdAt: "desc",
    })
    .limit(limitItems)
    .skip(skip);

  for (const item of listFile) {
    item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    item.sizeFormat = formatFileSize(item.size);
  }

  res.render("admin/pages/file-manager", {
    pageTitle: "Quản lý file",
    listFile: listFile,
    pagination: pagination,
  });
};

export const uploadPost = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    const formData = new FormData();

    files?.forEach((file) => {
      formData.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });

    const response = await axios.post(
      "http://localhost:4000/file-manager/upload",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    if (response.data.code == "success") {
      await Media.insertMany(response.data.saveLinks);
      res.json({
        code: "success",
        message: "Upload thành công!",
      });
    } else {
      res.json({
        code: "error",
        message: "Lỗi upload!",
      });
    }
  } catch (error) {
    res.json({
      code: "error",
      message: "Lỗi upload!",
    });
  }
};

export const changeFileNamePatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newFileName = req.body.fileName;

    const record = await Media.findOne({
      _id: id,
    });

    if (!record) {
      res.json({
        code: "error",
        message: "Không tìm thấy file!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("folder", record.folder);
    formData.append("oldFileName", record.filename);
    formData.append("newFileName", newFileName);

    const response = await axios.patch(
      `${domainCDN}/file-manager/change-file-name`,
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    if (response.data.code == "error") {
      res.json({
        code: "error",
        message: response.data.message,
      });
      return;
    }

    // Cập nhật lại trường filename trong CSDL
    await Media.updateOne(
      {
        _id: id,
      },
      {
        filename: newFileName,
      },
    );

    res.json({
      code: "success",
      message: "Đã đổi tên file!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Không tìm thấy file!",
    });
  }
};
