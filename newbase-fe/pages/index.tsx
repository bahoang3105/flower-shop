import { ReactElement, useState } from "react";
import Image from "next/image";
import PublicLayout from "components//Layout/Public";
import PublicImage from "public/images";
import RecommendProduct from "components//pages/homepage/RecommendProductInfiniteScroll";
import { useGetTopics } from "hooks/topic";
import ArrowRight from "public/svg/arrow_right";
import FlowerCollection from "components//pages/homepage/collection";

export default function Home() {
  return (
    <main className="homepage">
      <div className="homepage__thumbnail">
        <Image className="main-img" src={PublicImage.banner} alt="" />
      </div>
      <FlowerCollection />
      <div className="recommend-product__group">
        <RecommendProductWrapper />
      </div>
    </main>
  );
}

function RecommendProductWrapper() {
  const [limit, setLimit] = useState(4);
  const { data: topicList } = useGetTopics({
    params: { limit, page: 1, flowersPerTopic: 0 },
  });

  const getMoreTopic = () => {
    setLimit((prev) => {
      return (prev += 4);
    });
  };

  return (
    <>
      {topicList?.data?.items?.map((data: any) => {
        return (
          <RecommendProduct data={data} />
        );
      })}
      {topicList?.data?.meta?.totalItems > limit && (
        <div className="recommend-product__group__see-more-btn center-flex-item cursor-pointer">
          <span onClick={getMoreTopic}>
            Xem thêm <ArrowRight />
          </span>
        </div>
      )}
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
