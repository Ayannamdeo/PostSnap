import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { BreadCrumbs, MainLayout } from "../../components"
import { getSingleBlogPost } from "../../services/blog";

const breadData = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blogs" },
  { name: "Article title", link: "/blogs/:id" },
];

export function ArticleDetailPage() {
  const { id } = useParams();
  console.log("id", id);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getSingleBlogPost({ id }),
    queryKey: ["posts", id],
    retry: false,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // console.log("usequery  articledetailpage data:", data);
  // console.log("title", data.title);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col p-5">
        <article className="flex-1">
          <BreadCrumbs breadData={breadData} />
          <img
            className="rounded-xl w-full"
            src={data.imageUrl}
            alt={data.title}
          />
          <h1 className="text-xl font-medium mt-4 text-slate-800">
            {data.title}
          </h1>
          <div className="mt-4 text-slate-600">{data.body}</div>
        </article>
      </section>
    </MainLayout>
  );
}
