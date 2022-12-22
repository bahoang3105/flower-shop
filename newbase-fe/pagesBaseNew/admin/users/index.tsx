import { ReactElement } from "react";
import Admin from "components//Layout/Admin";

export default function Users() {
  return <h1 className="page-title">Quản lý người dùng</h1>;
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
Users.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
