const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loading = document.querySelector(".loading");
let page = 1;
let currentQuery = "";
let loadingMore = false;

const fetchImages = async (query, pageNum) => {
  const apiKey = "38505028-324bf22b555979973aad04484";
  const perPage = 20;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${pageNum}&per_page=${perPage}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const appendImagesToGallery = (images) => {
  const fragment = document.createDocumentFragment();
  images.forEach((image) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    const img = document.createElement("img");

    img.src = image.webformatURL;
    img.alt = image.tags;
    anchor.href = image.largeImageURL;
    anchor.dataset.source = image.largeImageURL;
    anchor.appendChild(img);
    listItem.appendChild(anchor);
    fragment.appendChild(listItem);
  });

  gallery.appendChild(fragment);
};

const loadMoreImages = async () => {
  if (loadingMore) return;
  loadingMore = true;
  const images = await fetchImages(currentQuery, ++page);
  appendImagesToGallery(images);
  loadingMore = false;
};

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMoreImages();
    }
  });
}, options);

observer.observe(loading);

const openModal = (event, imgElement) => {
  event.preventDefault();
  const largeImageUrl = imgElement.dataset.source;

  const instance = basicLightbox.create(
    `
    <img src="${largeImageUrl}" style="max-width: 100%; max-height: 100%;">
  `,
    {
      onShow: (instance) => {
        instance
          .element()
          .querySelector(".basicLightbox__placeholder").onclick =
          instance.close;
      },
    }
  );
  instance.show();
};

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = event.target.query.value.trim();
  if (query === currentQuery) return;

  page = 1;
  currentQuery = query;
  gallery.innerHTML = "";

  const images = await fetchImages(currentQuery, page);
  appendImagesToGallery(images);
});

gallery.addEventListener("click", (event) => {
  const targetImg = event.target.closest("img");
  if (targetImg) {
    const targetAnchor = targetImg.parentNode;
    openModal(event, targetAnchor);
  }
});
