// @ts-check
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getCategories } from "../lib/api";

export default function Custom500({ categories }) {
  return (
    <>
      <Layout list={categories} isOpen={false}>
        <Head>
          <title>{`500 | ${SITE_NAME}`}</title>
        </Head>
        <div className="container mx-auto flex h-full grow justify-center">
          <div className="m-4 mt-20 text-center">
            <h1 className="text-3xl">500 - Server-side error occurred</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await getCategories();
  return {
    props: {
      categories,
    },
  };
};
