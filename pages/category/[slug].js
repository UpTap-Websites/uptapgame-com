import GameList from "@/components/GameList";
import { getAllCategories, getGamesByCategory } from "@/lib/api";

export default function Category({ data }) {
  console.log(`Category data:`, data);
  return (
    <>
      <main class="site-main list">
        <section>
          <div class="section-head">
            <h1>{`${data.category?.[0].name} Games`}</h1>

            <p className="max-w-3xl">{data.categories?.[0].description}</p>
          </div>
          <GameList items={data.games} />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const data = await getGamesByCategory(slug);
  return {
    props: {
      data: data,
    },
  };
}

export async function getStaticPaths() {
  const data = await getAllCategories();
  const paths = data.map((item) => {
    return { params: { slug: item.slug } };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
