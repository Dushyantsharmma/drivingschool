
import React, { memo } from "react";
import Home from "../components/home/Home";
import ImageSlideshow from "../components/home/ImageSlideshow";
import WhyHillDriving from "../components/home/WhyHillDriving";
import Team from "../components/home/Team";
import About from "../components/home/About";
import Courses from "../components/home/Courses";
import GoogleReviews from "../components/home/GoogleReviews";

const MemoizedImageSlideshow = memo(ImageSlideshow);
const MemoizedHome = memo(Home);
const MemoizedTeam = memo(Team);
const MemoizedWhyHillDriving = memo(WhyHillDriving);
const MemoizedAbout = memo(About);
const MemoizedCourses = memo(Courses);
const MemoizedGoogleReviews = memo(GoogleReviews);

export default function HomePage() {
  return (
    <>
      <MemoizedImageSlideshow />
      <MemoizedHome />
      <MemoizedTeam />
      <MemoizedWhyHillDriving />
      <MemoizedAbout variant="brief" />
      <MemoizedCourses />
      <MemoizedGoogleReviews />
    </>
  );
}
