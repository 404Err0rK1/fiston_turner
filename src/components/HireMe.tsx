import ShinyButton from "./ui/shiny-button";

const HireMe = () => {
  return (
    <div className="mb-12">
      <ShinyButton>
        <span className="flex items-center">
          <span className="mr-2 size-3 bg-green-500 rounded-full animate-pulse" />
          Work with me
        </span>
      </ShinyButton>
    </div>
  );
};

export default HireMe;
