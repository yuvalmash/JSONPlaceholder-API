import { useEffect, useRef, useState } from "react";
import Header from "./components/header/Header";
import TableOfPosts from "./components/tableOfPosts/TableOfPosts";
import Loader from "./components/loader/Loader";
import ErrorPage from "./components/errorPage/ErrorPage";
import "./appStyle.css";

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
  numberOfComments?: number;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [listOfPosts, setListOfPosts] = useState<PostType[]>([]);
  const [selectedPostsIds, setSelectedPostsIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePostsLoaders, setActivePostsLoaders] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [pageStart, setPageStart] = useState<number>(0);
  const abortControllerPostsRef = useRef<AbortController | null>(null);
  const abortControllerCommentsRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function getPosts() {
      abortControllerPostsRef?.current?.abort();
      abortControllerCommentsRef?.current?.abort();
      abortControllerPostsRef.current = new AbortController();
      abortControllerCommentsRef.current = new AbortController();
      setLoading(true);
      try {
        const dataPosts = await fetch(
          `${BASE_URL}/posts?_start=${pageStart}&_limit=15`,
          { signal: abortControllerPostsRef?.current?.signal }
        );
        if (!dataPosts.ok) {
          throw new Error("Network response on '/posts' was not ok");
        }
        const posts = await dataPosts.json();

        for (const post of posts) {
          const dataComments = await fetch(
            `${BASE_URL}/comments?postId=${post.id}`,
            { signal: abortControllerCommentsRef?.current?.signal }
          );
          if (!dataComments.ok) {
            throw new Error("Network response on '/comments' was not ok");
          }
          const comments = await dataComments.json();
          post["numberOfComments"] = comments.length;
        }
        setListOfPosts(posts);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("AbortError");
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, [pageStart]);

  async function handleRefreshPosts() {
    setActivePostsLoaders(true);
    try {
      const newPosts = await Promise.all(
        selectedPostsIds.map(async (postId) => {
          const data = await fetch(BASE_URL + `/posts/${postId}`);
          return await data.json();
        })
      );
      const newComments = await Promise.all(
        selectedPostsIds.map(async (postId) => {
          const data = await fetch(`${BASE_URL}/comments?postId=${postId}`);
          return await data.json();
        })
      );

      const newPostsWithComments = newPosts.map((post) => {
        const postId = post.id;
        const postComments =
          newComments.find(
            (commentArray) => commentArray[0].postId === postId
          ) || [];
        const numberOfComments = postComments.length;
        return { ...post, numberOfComments };
      });

      const updatedPosts = listOfPosts.map(
        (post) =>
          newPostsWithComments.find(
            (changePost) => changePost.id === post.id
          ) || post
      );

      setListOfPosts(updatedPosts);
    } catch (err) {
      console.log(err);
    } finally {
      setActivePostsLoaders(false);
      setSelectedPostsIds([]);
    }
  }

  return (
    <div className="app">
      <Header
        listOfPosts={listOfPosts}
        pageStart={pageStart}
        setPageStart={setPageStart}
        selectedPostsIds={selectedPostsIds}
        handleRefreshPosts={handleRefreshPosts}
      />

      {pageStart >= 0 && pageStart <= 100 ? (
        <>
          {loading ? (
            <Loader typeOfLoader="main" />
          ) : error !== null ? (
            <ErrorPage error={error} />
          ) : listOfPosts ? (
            <TableOfPosts
              listOfPosts={listOfPosts}
              setSelectedPostsIds={setSelectedPostsIds}
              selectedPostsIds={selectedPostsIds}
              activePostsLoaders={activePostsLoaders}
            />
          ) : (
            <h1>No posts...</h1>
          )}
        </>
      ) : (
        <h1>No posts...</h1>
      )}
    </div>
  );
}

export default App;
