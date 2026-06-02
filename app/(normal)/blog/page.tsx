import BlogGridTabs from "@/components/blogs/allBlogsTabs";
import BlogFeatureHero from "@/components/blogs/banner";

const page = () => {
  return (
    <div>
      <BlogFeatureHero />
      <BlogGridTabs />
    </div>
  );
};

export default page;
