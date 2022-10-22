import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    redirect: {
      permanent: false,
      destination: "/login"
    }
  };
};

export default Home;
