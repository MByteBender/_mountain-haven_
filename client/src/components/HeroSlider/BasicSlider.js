import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import Wrapper from "./Wrapper";
import Title from "./Title";
import Subtitle from "./Subtitle";
import styles from "./Heroslider.module.css";

export default function BasicSlider(props) {
  const { image1, image2, image3, image4 } = props;
  const { imageLabel1, imageLabel2, imageLabel3, imageLabel4 } = props;

  return (
    <HeroSlider
      height={"100vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide),
      }}
    >
      <Overlay>
        <Wrapper>
          <div className={`${styles.titleDiv} br-2`}>
            <Title>{props.Title}</Title>

            <Subtitle>{props.Apartmentdescription}</Subtitle>
          </div>
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        label={imageLabel1}
        background={{
          backgroundImageSrc: image1,
        }}
      />

      <Slide
        shouldRenderMask
        label={imageLabel2}
        background={{
          backgroundImageSrc: image2,
        }}
      />

      <Slide
        shouldRenderMask
        label={imageLabel3}
        background={{
          backgroundImageSrc: image3,
        }}
      />

      <Slide
        shouldRenderMask
        label={imageLabel4}
        background={{
          backgroundImageSrc: image4,
        }}
      />

      <MenuNav />
    </HeroSlider>
  );
}
