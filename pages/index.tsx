import type { GetServerSideProps, NextPage } from "next";
import { getTokenFromStorage } from "../utils/token";

const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookie } = req.headers;

  if (getTokenFromStorage(cookie) === "user") {
    return {
      redirect: {
        permanent: false,
        destination: "/shapes"
      }
    };
  } else if (getTokenFromStorage(cookie) === "admin") {
    return {
      redirect: {
        permanent: false,
        destination: "/admin"
      }
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    };
  }
};

export default Home;
