import { Col, Row } from "antd";
import { useGetTopics } from "hooks/topic";
import React from "react";

type TagItemType = {
  description: string;
  id: number;
  isDeleted: boolean;
  name: string;
};

export default function TagList({ onClick }: { onClick?: any }) {
  const { data: topicList } = useGetTopics({
    params: { limit: 10000000000, page: 1, flowersPerTopic: 0 },
  });

  return (
    <Row justify="center" align="middle" className="tag-list" gutter={16}>
      {topicList?.length &&
        topicList?.data?.items?.map((topicItem: TagItemType) => {
          const { name, id } = topicItem || {};
          return (
            <Col
              onClick={() => onClick(id)}
              key={id}
              className="tag-list__item cursor-pointer"
            >
              {name}
            </Col>
          );
        })}
    </Row>
  );
}
