import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useFetchPaginatedPosts = (token :any, commid: any) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 4;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}/communities/${commid}/posts?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.error !== 0) {
        throw new Error(response.data.message);
      }

      const fetchedPosts = response.data.posts;
      if (fetchedPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts: any) => [...prevPosts, ...fetchedPosts]);
        setOffset(prevOffset => prevOffset + limit);
      }
    } catch (error) {
      console.error("Error could not fetch communities:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    if (hasMore) {
      fetchPosts();
    }
  }, [page]);

  useEffect(() => {
    const resetPagination = async () => {
      setPage(0);
      setPosts([]);
      setHasMore(true);
      setOffset(0);

      // Fetch the first page of posts
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APIURL}/communities/${commid}/posts?offset=0&limit=${limit}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.error !== 0) {
          throw new Error(response.data.message);
        }

        const fetchedPosts = response.data.posts;
        setPosts(fetchedPosts);
        if (fetchedPosts.length < limit) {
          setHasMore(false);
        }
        setOffset(limit);
      } catch (error) {
        console.error("Error could not fetch communities:", error);
      }
    };

    resetPagination();
  }, [commid, token, limit]);

  return { posts, hasMore };
};

export default useFetchPaginatedPosts;
