"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: number | string;
  width?: number | string;
  circle?: boolean;
  duration?: number;
  baseColor?: string;
  highlightColor?: string;
}

function CustomSkeleton({
  className,
  count = 1,
  height,
  width,
  circle = false,
  duration = 1.5,
  baseColor = "#e5e7eb",
  highlightColor = "#f3f4f6",
  ...props
}: SkeletonProps) {
  return (
    <Skeleton
      className={className}
      count={count}
      height={height}
      width={width}
      circle={circle}
      duration={duration}
      baseColor={baseColor}
      highlightColor={highlightColor}
      {...props}
    />
  );
}

export { CustomSkeleton as Skeleton };
