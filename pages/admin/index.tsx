import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { getEmailFromStorage, getTokenFromStorage } from "../../utils/token";

const AdminIndex = ({ email }: { email: string }) => {
  return (
    <Layout>
      <div>
        <h1>{email}</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookie } = req.headers;

  if (!getTokenFromStorage(cookie)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    };
  } else if (getTokenFromStorage(cookie) === "user") {
    return {
      redirect: {
        permanent: false,
        destination: "/shapes"
      }
    };
  } else {
    return {
      props: {
        email: getEmailFromStorage(cookie) || ""
      }
    };
  }
};

export default AdminIndex;
