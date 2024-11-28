export async function getStaticProps(props: { url: string }) {
  const res = await fetch(props.url).then((res) => res.json);
  // console.log(res);

  return {
    props: { res },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}

const DefaultFunctions = {
  getStaticProps,
};

export default DefaultFunctions;
