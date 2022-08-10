import gsap from "gsap"

const animateInEasing = "back.out(1.7)"
const animateOutEasing = "ease.in"
const easeAnimateIn = "circ.out"

const animateCardIn = (element: HTMLElement) => {
  gsap.set(element, { opacity: 1, display: "block" })

  gsap.fromTo(
    element,
    {
      scale: 0.2,
      y: "20vh",
      duration: 1,
      rotateZ: 60 - Math.floor(Math.random() * 120),
      rotateX: 120,
      rotateY: 10,
      stagger: 0.2,
    },
    {
      scale: 1,
      y: 0,
      rotateZ: 0,
      rotateX: 0,
      duration: 0.6,
      rotateY: 0,
      ease: easeAnimateIn,
    }
  )
}

const animateCardOut = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 0.2,
    opacity: 0,
    y: "-40vh",
    rotateZ: 20 - Math.floor(Math.random() * 40),
    position: "absolute",
    rotateX: 0,
    rotateY: 20 - Math.floor(Math.random() * 40),
  })
}

const fadeIn = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      y: 20,
      position: "absolute",
      opacity: 0,
      ease: easeAnimateIn,
    },
    {
      y: 0,
      position: "relative",
      opacity: 1,
      ease: easeAnimateIn,
    }
  )
}

const fadeOut = (element: HTMLElement) => {
  gsap.to(element, {
    opacity: 0,
    y: -20,
  })
}

export default function rewardAnimation() {
  console.log("Module Loaded: Reward Animation")
  const $rewardView = document.querySelector(".reward-view") as HTMLElement
  const $body = document.querySelector("body") as HTMLElement
  const $rewardItems = document.querySelectorAll(
    "[data-component]"
  ) as NodeListOf<HTMLElement>

  if (!$rewardView) throw Error("No reward view element found")

  // Animate the background in
  $rewardView.style.backgroundColor = "#fff"
  $rewardView.insertAdjacentHTML(
    "beforeend",
    '<div id="circle" style="width: 0; height: 0; background-color: #9166c5; border-radius: 50%; position: absolute;"> <div/>'
  )
  gsap.to("#circle", {
    width: "120vh",
    height: "120vh",
    duration: 1,
    ease: animateOutEasing,
    onComplete: () => {
      setTimeout(function () {
        $rewardItems.forEach((element) => {
          animateCardOut(element)
        })
        gsap.to("#circle", {
          width: "4vh",
          height: "4vh",
          top: "10vh",
          opacity: 0,
          duration: 1,
          ease: animateInEasing,
        })
      }, 500)
    },
  })

  // Animate the cards in
  $rewardItems.forEach((element) => {
    animateCardIn(element)
  })
}
