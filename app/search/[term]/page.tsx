import ResultsList from "@/components/ResultsList";
import { getFetchUrl } from "@/lib/getFetchUrl";
import { PageResult, SearchParams } from "@/typings";
import { redirect } from "next/navigation";

export const revalidate = 300;

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

async function SearchPage({ searchParams, params: { term } }: Props) {
  if (!term) {
    redirect("/");
  }

  //   TODO: Build API call
  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  const results = (await response.json()) as PageResult[];

  console.log(results);

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default SearchPage;