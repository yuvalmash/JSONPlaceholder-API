import Header from "./components/header/Header";
import TableOfPosts from "./components/tableOfPosts/TableOfPosts";
import Loader from "./components/loader/Loader";
import ErrorPage from "./components/errorPage/ErrorPage";
import { getPostsWithComments } from "./components/api/fetchData";
import { useEffect, useRef, useState } from "react";
import { PostsObj } from "./types";
import "./appStyle.css";

const NO_POSTS_MESSAGE = <h1>No posts...</h1>;

function App() {
  const [listOfPosts, setListOfPosts] = useState<PostsObj>({});
  const [selectedPostsIds, setSelectedPostsIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePostsLoaders, setActivePostsLoaders] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [pageStart, setPageStart] = useState<number>(0);
  const abortControllerPostsRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function getPosts111() {
      abortControllerPostsRef?.current?.abort();
      abortControllerPostsRef.current = new AbortController();
      setLoading(true);
      try {
        const posts = await getPostsWithComments({
          pageStart,
          abortControllerPostsRef,
        });
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
    getPosts111();
  }, [pageStart]);

  async function handleRefreshPosts() {
    setActivePostsLoaders(true);
    try {
      const postsToUpdate = await getPostsWithComments({
        postsIds: selectedPostsIds,
      });
      for (const postId in postsToUpdate) {
        if (listOfPosts.hasOwnProperty(postId)) {
          listOfPosts[postId] = postsToUpdate[postId];
        }
      }
      setListOfPosts(listOfPosts);
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
          NO_POSTS_MESSAGE
        )}
      </>
    </div>
  );
}

export default App;
