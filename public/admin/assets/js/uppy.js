import { Uppy, Dashboard, XHRUpload } from "https://releases.transloadit.com/uppy/v4.18.2/uppy.min.mjs"

const uppy = new Uppy()

uppy.use(Dashboard, {
  target: '#uppy-upload',
  inline: true,
  width: "100%"
})

uppy.use(XHRUpload, {
  endpoint: `/${pathAdmin}/file-manager/upload`, // backend sẽ nhận được file tại link này
  fieldName: "files",
  bundle: true
})

uppy.on('complete', (result) => {
	if(result.successful.length > 0) {
    drawNotify("success", `Upload thành công ${result.successful.length} file`);
  }
  if(result.failed.length > 0) {
    drawNotify("error", `Upload lỗi ${result.successful.length} file`);
  }
  window.location.reload();
});
