import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { getAllBlogPosts, getDocumentCount, likeUnlikePost } from "../../../services/blog";
import { Mycontext } from "../../../store/CreateContext";
import { ArticleCard, SkeletonArticleCard, ErrorMessage } from "../../../components"

export function Articles() {

    // const { data, isLoading, isError } = useQuery({
    //     queryFn: () => getAllBlogPosts(0),
    //     queryKey: ["posts"],
    //     retry: false,
    //     onError: (error) => {
    //         toast.error(error.message);
    //         console.log(error);
    //     }
    // });
    const { userId } = useContext(Mycontext);
    const [totalDocCount, setTotalDocCount] = useState(0);

    const fetchDocCount = async () => {
        try {
            const count = await getDocumentCount();
            setTotalDocCount(count); // Set the total document count
        } catch (error) {
            console.error("Error fetching document count:", error.message);
        }
    };

    useEffect(() => {
        fetchDocCount();
    }, []);

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery({
        queryFn: ({ pageParam = 0 }) => getAllBlogPosts({ pageParam }),
        queryKey: ["posts"],
        getNextPageParam: (lastPage, allPages) => {
            // console.log("lastPage:", lastPage);
            // console.log("lastPage.length:", lastPage.length);
            // console.log("allPages:", allPages);
            // console.log("allPages.length:", allPages.length);
            // return lastPage.length === 6 ? allPages.length * 6 : undefined;
            // if (lastPage.length < 6) {
            //     console.log("no more pages left");
            //     return undefined;
            // }
            const totalPages = Math.ceil(totalDocCount / 6); // Calculate total number of pages
            if (allPages.length >= totalPages) {
                console.log("No more pages left to fetch");
                return undefined;
            }
            return allPages.length * 6;
        },
        retry: false,
        onError: (error) => {
            toast.error(error.message);
            console.log("error insie useInfiniteQuery", error);
        },
    });


    const loadMoreRef = useRef();

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


    const queryClient = useQueryClient();

    const likeUnlikeMutation = useMutation({
        mutationFn: ({ userId, postId }) => likeUnlikePost({ userId, postId }),
        onSuccess: (post, variables) => {
            console.log("data from likeUnilkeMutation: ", post);
            console.log("like count: ", post.likes.length);
            toast.success("likeunlike success");

            queryClient.setQueryData(["posts"], (oldData) => {
                const updatedPages = oldData.pages.map((page) => {
                    return page.map((article) => {
                        if (article._id === variables.postId) {
                            return {
                                ...article,
                                likes: post.likes, // Update the likes with the returned data
                            };
                        }
                        return article;
                    });
                });
                return { ...oldData, pages: updatedPages };
            });
            console.log("after setQueryClient");
        },
        onError: (error) => {
            console.log(`likeUnlikeMutation error: ${error.message}`);
            toast.error(`likeUnlikeMutation error: ${error.message}`);
        },
    });

    const handleLikeUnlike = (userId, postId) => {
        console.log("handliLikeUnlike onClickddddddddddddddddddddddd");
        console.log("userid inside handleLIKEunlike:", userId);
        console.log("postId inside handleLIKEunlike:", postId);

        likeUnlikeMutation.mutate({ userId, postId });
    }


    console.log("data from useQuery inside articles", data);

    if (isError) {
        console.log("error:", error);
        return (<ErrorMessage error={error} />)
    }

    return (
        <section className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-28 py-10">
            {isLoading ?
                ([1, 2, 3].map((item, idx) => (
                    <SkeletonArticleCard key={idx} />
                )))
                : data.pages.map((page, pageIndex) =>
                    page.map(post => (
                        <ArticleCard key={post._id} post={post} showedit={false} handleLikeUnlike={handleLikeUnlike} userId={userId} />
                    )))
            }
            {isFetchingNextPage && (
                [1, 2, 3].map((item, idx) => (
                    <SkeletonArticleCard key={idx} />
                ))
            )}
            <div ref={loadMoreRef} />

            { /*{isLoading ?
                ([1, 2, 3].map((item, idx) => (
                    <SkeletonArticleCard key={idx} />
                )))
                : data.map(post => (
                    <ArticleCard key={post._id} post={post} showedit={false} />
                ))}*/ }
            {/* {!isLoading && !isError && data.map(post => (
                <ArticleCard key={post._id} post={post} />
            ))} */}
        </section>
    );
}
