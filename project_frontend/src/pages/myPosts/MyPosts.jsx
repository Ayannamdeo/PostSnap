import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState, useContext, useRef, useCallback, useEffect } from "react";

import { getMyBlogPosts } from "../../services/blog";
import { Mycontext } from "../../store/CreateContext";
import { MainLayout, SkeletonArticleCard, ArticleCard, ErrorMessage } from "../../components";

export function MyPosts() {
  const { userId } = useContext(Mycontext);

  // const [totalDocCount, setTotalDocCount] = useState(0);
  // const { data, isLoading, isError, error } = useQuery({
  //   queryFn: () => getMyBlogPosts({ userId }),
  //   queryKey: ["myPosts"],
  //   retry: false,
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) => getMyBlogPosts({ userId, pageParam }),
    queryKey: ["myPosts"],
    getNextPageParam: (lastPage, allPages) => {
      console.log("inside getNextPageParam lastpage:", lastPage);
      const totalDocCount = lastPage.totalUserPosts;
      const totalPages = Math.ceil(totalDocCount / 6); // Calculate total number of pages
      console.log("total Pages: ", totalPages);
      console.log("allPages", allPages);

      if (allPages.length >= totalPages) {
        console.log("No more pages left to fetch");
        return undefined;
      }
      return allPages.length * 6;
    },
    retry: false,
    onError: (error) => {
      toast.error(error.message);
      console.log("error inside useInfiniteQuery of Myposts", error);
    },
  });

  useEffect(() => {
    if (data) {
      console.log("data from Myposts, useInfiniteQuery: ", data);
    }
  }, [data]);

  const loadMoreRef = useRef();
  //
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };

  }, [handleObserver]);


  if (isError) {
    console.log("error:", error);
    return (<ErrorMessage error={error} />)
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-tr from-cyan-100 to-indigo-200 relative overflow-hidden min-h-screen">
        <section className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-28 py-10">

          {isLoading
            ? [1, 2, 3].map((item, idx) => <SkeletonArticleCard key={idx} />)
            : data.pages.map((page, pageIndex) => {
              console.log("page inside data.pages.map: ", page);
              console.log("page.userPosts inside data.pages.map: ", page.userPosts);
              return page.userPosts.map((post) => <ArticleCard key={post._id} post={post} showedit={true} showLike={false} />)
            })}

          {isFetchingNextPage && (
            [1, 2, 3].map((item, idx) => (
              <SkeletonArticleCard key={idx} />
            ))
          )}

          <div ref={loadMoreRef} />
        </section>
      </div>
    </MainLayout>
  );
}



