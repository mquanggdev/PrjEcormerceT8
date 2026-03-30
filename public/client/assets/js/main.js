// pagination
const pagination = document.querySelector(".pagination");
if(pagination) {
  const url = new URL(window.location.href);

  const listItem = pagination.querySelectorAll(".page-item [page]");
  listItem.forEach(item => {
    item.addEventListener("click", () => {
      const value = item.getAttribute("page");
      if(value) {
        url.searchParams.set("page", value);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    })
  })
}
// End pagination

// button-share
const listButtonShare = document.querySelectorAll("[button-share]");
if(listButtonShare.length > 0) {
  listButtonShare.forEach(button => {
    button.href = button.href + window.location.href;
    // button.href = button.href + "https://28tech.com.vn/lap-trinh-backend-nodejs-middle";
  })
}
// End button-share

// filter-product-status
const listFilterProductStatus = document.querySelectorAll("[filter-product-status]");
if(listFilterProductStatus.length > 0) {
  const url = new URL(window.location.href);
  
  listFilterProductStatus.forEach(input => {
    const name = input.value;
    
    input.addEventListener("change", () => {
      const value = input.checked;
      if(value) {
        url.searchParams.set(name, value);
      } else {
        url.searchParams.delete(name);
      }
      window.location.href = url.href;
    })

    // Hiển thị giá trị mặc định
    const valueCurrent = url.searchParams.get(name);
    if(valueCurrent) {
      input.checked = true;
    }
  })
}
// End filter-product-status