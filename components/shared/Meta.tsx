import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  pageTitle: string;
  description: string;
}

const Meta = ({ pageTitle, description }: Props) => {
  const router = useRouter();

  const url = "www.conflux-pos-validators.com";
  const path = router.asPath;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>

      <meta name="image" property="og:image" content={`${url}/banner.png`} />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@toBedefined" />
      <meta property="og:title" content={`${pageTitle}`} />
      <meta property="og:url" content={`${url}${path}`} />
      <link rel="canonical" href={`${url}${path}`} />
      <meta name="monetization" content="$ilp.uphold.com/GidKX3giK2m2" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@toBedefined" />
      <meta name="twitter:creator" content="@toBedefined" />
      <meta name="twitter:title" content="Conflux PoS validators" />
      <meta
        name="twitter:description"
        content="Find the best Pool / Validator to stake your CFX token on Conflux Network."
      />
      <meta
        name="twitter:image"
        content="https://www.conflux-pos-validators.com/banner.png"
      />
    </Head>
  );
};
export default Meta;
