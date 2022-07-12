const serviceContent = document.querySelectorAll(
  ".company-services-content-item"
);
const serviceTitle = document.querySelector(".company-services-title");
const serviceTitleItem = document.querySelectorAll(
  ".company-services-title div"
);

serviceTitle.addEventListener("click", (e) => {
  for (i = 0; i < serviceContent.length; i++) {
    let contentClass = serviceContent[i].classList;
    serviceTitleItem[i].classList.remove("active-service-title");
    contentClass.remove("active-service-item");
    if (e.target.innerText === serviceContent[i].dataset.servicesTitle) {
      contentClass.add("active-service-item");
      e.target.classList.add("active-service-title");
    }
  }
});
const workTitle = document.querySelector(".company-work-title");
const workImg = document.querySelectorAll(".company-work-img-item");
const workTitleItem = document.querySelectorAll(".company-work-title div");
const spinnerWorks = document.querySelector(".company-work .spinner");
let maxLengthWorkImg = 11;

function maxLengthWork() {
  for (i = 0; i < workImg.length; i++) {
    if (i < maxLengthWorkImg) {
      workImg[i].classList.remove("display-none");
    } else {
      workImg[i].classList.add("display-none");
    }
  }
}
maxLengthWork();
workTitle.addEventListener("click", (e) => {
  for (i = 0; i < workImg.length; i++) {
    workImg[i].classList.add("display-none");
    if (workImg[i].dataset.imgType === e.target.innerText) {
      workImg[i].classList.remove("display-none");
    } else if (e.target.innerText === "All") {
      workImg[i].classList.remove("display-none");
      maxLengthWork();
    }
  }
});

const btnLoadImg = document.querySelector(".company-work .btn-load");
btnLoadImg.addEventListener("click", (e) => {
  spinner(btnLoadImg, spinnerWorks);
  setTimeout(loadPhotoWork, 2000);
});

function loadPhotoWork() {
  maxLengthWorkImg += 12;
  spinner(btnLoadImg, spinnerWorks);
  maxLengthWork();
  maxLengthPhoto(workImg, maxLengthWorkImg, btnLoadImg);
}
/*Comments*/
const peopleWhoComm = document.querySelectorAll(".user-comments-content div");
let widthPhoto = document.querySelector(".user-comments-content").offsetWidth;
let position = 0;
let operationNum = 0;

function peopleSay() {
  for (i = 0; i < peopleWhoComm.length; i++) {
    peopleWhoComm[i].style.cssText = `left: ${position}px; transition:1s`;
    position += widthPhoto;
  }
}
peopleSay();

const nextComm = document.querySelector(".next-img");
nextComm.addEventListener("click", (e) => {
  if (peopleWhoComm.length - 1 > operationNum) {
    operationNum++;
    position -= widthPhoto * (peopleWhoComm.length + 1);
  } else {
    operationNum = 0;
    position = 0;
  }
  peopleSay();
  animatedPhoto();
});
const previousComm = document.querySelector(".prevous-img");
previousComm.addEventListener("click", (e) => {
  if (operationNum > 0) {
    operationNum--;
    position -= widthPhoto * (peopleWhoComm.length - 1);
  } else {
    operationNum = 3;
    position = -widthPhoto * (peopleWhoComm.length - 1);
  }
  peopleSay();
  animatedPhoto();
});
const smallPeoplePhoto = document.querySelectorAll(
  ".user-comments-photo-box-item"
);
function animatedPhoto() {
  for (i = 0; i < peopleWhoComm.length; i++) {
    smallPeoplePhoto[i].style.bottom = `0`;
  }
  smallPeoplePhoto[
    operationNum
  ].style.cssText = `bottom: 10px;   transition: 1s;`;
}

const smallPhoto = document.querySelector(".user-comments-photo-box");
smallPhoto.addEventListener("click", (e) => {
  let photoIndex = e.target.alt.slice(-1);
  operationNum = photoIndex;
  position = widthPhoto * (photoIndex * -1);
  peopleSay();
  animatedPhoto();
});

/*Gallery Masonry*/
function masonryFun() {
  let galleryMasonry = new Masonry(gallery, {
    itemSelector: ".gallery-box > div",
    gutter: 20,
  });
}
const gallery = document.querySelector(".gallery-box");
window.onload = () => {
  masonryFun();
};

const galleryItem = document.querySelectorAll(".gallery-box > div");
const spinnerGallery = document.querySelector(".gallery .spinner");
const btnLoadImgGallery = document.querySelector(".gallery .btn-load");
let maxLengthGalleryImg = 8;

function maxLengthGallery() {
  for (i = 0; i < galleryItem.length; i++) {
    if (i < maxLengthGalleryImg) {
      galleryItem[i].classList.remove("display-none");
      masonryFun();
    } else {
      galleryItem[i].classList.add("display-none");
    }
  }
}
maxLengthGallery();

function loadPhoto(photo, length) {
  spinner(btnLoadImgGallery, spinnerGallery);
  maxLengthGalleryImg += 8;
  maxLengthGallery();
  maxLengthPhoto(galleryItem, maxLengthGalleryImg, btnLoadImgGallery);
}

btnLoadImgGallery.addEventListener("click", (e) => {
  spinner(btnLoadImgGallery, spinnerGallery);
  setTimeout(loadPhoto, 2000);
});

function spinner(btn, spinner) {
  btn.classList.toggle("display-none");
  spinner.classList.toggle("display-none");
}

function maxLengthPhoto(photo, length, btn) {
  if (photo.length < length || photo.length === length) {
    btn.remove();
    photo.length = length;
  }
}
