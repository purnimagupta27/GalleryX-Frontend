const shimmerRatios = [
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[3/2]",
];

const Shimmer = () => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`
            mb-4
            break-inside-avoid
            rounded-xl
            bg-zinc-800
            animate-pulse
            ${shimmerRatios[index % shimmerRatios.length]}
          `}
        />
      ))}
    </div>
  );
};

export default Shimmer