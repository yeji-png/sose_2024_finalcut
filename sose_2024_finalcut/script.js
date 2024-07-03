document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button-container button");
  const galleries = document.querySelectorAll(".gallery");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const gallery = document.getElementById(`gallery${index + 1}`);
      if (gallery.style.display === "none" || gallery.style.display === "") {
        gallery.style.display = "block";
      } else {
        gallery.style.display = "none";
      }
    });
  });

  const leftPopupBtn = document.getElementById("left-popup-btn");
  const rightPopupBtn = document.getElementById("right-popup-btn");
  const leftPopup = document.getElementById("left-popup");
  const rightPopup = document.getElementById("right-popup");

  const leftImages = [
    "images/f.01.png",
    "images/f.02.png",
    "images/f.03.png",
    "images/f.04.png",
    "images/f.05.png",
    "images/f.06.png",
    "images/f.07.png",
    "images/f.08.png",
    "images/f.09.png",
    "images/f.10.png",
    "images/f.11.png",
    "images/f.12.png",
  ];

  const rightImages = [
    "images/c.01.png",
    "images/c.02.png",
    "images/c.03.png",
    "images/c.04.png",
    "images/c.05.png",
    "images/c.06.png",
    "images/c.07.png",
    "images/c.08.png",
    "images/c.09.png",
    "images/c.10.png",
  ];

  let leftImageIndex = 0;
  let rightImageIndex = 0;

  leftPopupBtn.addEventListener("click", () => {
    leftPopup.style.display =
      leftPopup.style.display === "none" || leftPopup.style.display === ""
        ? "flex"
        : "none";
  });

  rightPopupBtn.addEventListener("click", () => {
    rightPopup.style.display =
      rightPopup.style.display === "none" || rightPopup.style.display === ""
        ? "flex"
        : "none";
  });

  leftPopup.querySelector("img").addEventListener("click", () => {
    leftImageIndex = (leftImageIndex + 1) % leftImages.length;
    leftPopup.querySelector("img").src = leftImages[leftImageIndex];
  });

  rightPopup.querySelector("img").addEventListener("click", () => {
    rightImageIndex = (rightImageIndex + 1) % rightImages.length;
    rightPopup.querySelector("img").src = rightImages[rightImageIndex];
  });

  function dragElement(element, header) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  dragElement(leftPopup, document.getElementById("left-popup-header"));
  dragElement(rightPopup, document.getElementById("right-popup-header"));

  const resizeHandles = document.querySelectorAll(".resize-handle");
  resizeHandles.forEach((handle) => {
    handle.addEventListener("mousedown", function (e) {
      const gallery = handle.parentElement;
      const startY = e.clientY;
      const startHeight = parseInt(
        document.defaultView.getComputedStyle(gallery).height,
        10
      );

      function doDrag(e) {
        const newHeight = startHeight + e.clientY - startY;
        gallery.style.height = `${newHeight}px`;
        gallery.querySelector(
          ".scroll-container"
        ).style.height = `calc(100% - 40px)`;
      }

      function stopDrag() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      }

      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
    });
  });
});
