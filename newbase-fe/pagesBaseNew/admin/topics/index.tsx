import { ReactElement } from "react";
import Admin from "components//Layout/Admin";

export default function Topics() {
  return <h1 className="page-title">Quản lý loại hoa</h1>;
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
Topics.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
