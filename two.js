const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxIndex: 257,
};
const images = [];
let imagesLoaded = 0;
function perload() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./images/frame_${i.toString().padStart(4, "0")}.png`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = function () {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}
function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  }
}
function startAnimation() {
  let t1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      scrub: 2,
      end: "bottom bottom",
    },
  });
  function updateAnimation(index) {
    return {
      currentIndex: index,
      ease: "linear",
      onUpdate: function () {
        loadImage(Math.floor(frames.currentIndex));
      },
    };
  }
  t1.to(frames, updateAnimation(40), "a")
    .to(".animate1", { opacity: 0, ease: "linear" }, "a")

    .to(frames, updateAnimation(55), "b")
    .to(".animate2", { opacity: 1, ease: "linear" }, "b")

    .to(frames, updateAnimation(70), "c")
    .to(".animate2", { opacity: 0, ease: "linear" }, "c")

    .to(frames, updateAnimation(85), "d")
    .to(".animate3", { opacity: 1, ease: "linear" }, "d")

    .to(frames, updateAnimation(100), "e")
    .to(".animate3", { opacity: 0, ease: "linear" }, "e")

    .to(frames, updateAnimation(115), "f")
    .to(".panel", { x: "0%", ease: "expo" }, "f")

    .to(frames, updateAnimation(130), "g")
    .to(".panel", { opacity: 1, ease: "linear" }, "g")

    .to(frames, updateAnimation(145), "h")
    .to(".panel", { opacity: 0, ease: "linear" }, "h")

    .to(frames, updateAnimation(160), "i")
    .to("canvas", { scale: 0.6, ease: "linear" }, "i")

    .to(frames, updateAnimation(175), "j")
    .to(".panelism", { opacity: 1, ease: "linear" }, "j")

    .to(frames, updateAnimation(190), "j")
    .to(".panelism span", { width: 100, ease: "expo" }, "j")

    .to(frames, updateAnimation(205), "k")
    .to("canvas", { scale: 1, ease: "linear" }, "k")

    .to(frames, updateAnimation(257), "l")
    .to(".panelism", { scale: 12, ease: "circ" }, "l");
}

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
perload();
window.addEventListener("resize", function () {
  loadImage(Math.floor(frames.currentIndex));
});

document.querySelectorAll(".headings h3").forEach(function (elem) {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      end: "bottom 20%",
      scrub: 2,
    },
    opacity: 0.3,
  });
});
