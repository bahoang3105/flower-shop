import { ReactElement, useState } from "react";
import { Image } from "antd";
import PublicLayout from "components//Layout/Public";
import PublicImage from "public/images";
import RecommendProduct from "components//pages/homepage/RecommendProductInfiniteScroll";
import { useGetTopics } from "hooks/topic";
import ArrowRight from "public/svg/arrow_right";
import FlowerCollection from "components//pages/homepage/collection";

function Home() {
  return (
    <main className="homepage">
      <div className="homepage__thumbnail">
        <Image src={PublicImage.banner} preview={false} />
      </div>
      <FlowerCollection />
      <div className="recommend-product__group">
        <RecommendProductWrapper />
      </div>
    </main>
  );
}

function RecommendProductWrapper() {
  const [limit, setLimit] = useState(1);
  const { data: topicList } = useGetTopics({
    params: { limit, page: 1, flowersPerTopic: 0 },
  });

  return (
    <>
      {topicList?.data?.map((data: any) => {
        return <RecommendProduct data={data} />;
      })}
      <div className="recommend-product__group__see-more-btn center-flex-item cursor-pointer">
        <span
          onClick={() => {
            setLimit((prev) => {
              return (prev += 1);
            });
          }}
        >
          See More <ArrowRight />
        </span>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
