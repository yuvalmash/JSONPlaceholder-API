import { Dispatch, SetStateAction } from "react";
import { PostType, PostsObj } from "../../types";
import Post from "../post/Post";
import "./tableOfPostsStyles.css";

type TableOfPostsType = {
  listOfPosts: PostsObj;
  setSelectedPostsIds: Dispatch<SetStateAction<number[]>>;
  selectedPostsIds: number[];
  activePostsLoaders: boolean;
};

export default function TableOfPosts({
  listOfPosts,
  setSelectedPostsIds,
  selectedPostsIds,
  activePostsLoaders,
}: TableOfPostsType) {
  return (
    <div className="table-container">
      {Object.values(listOfPosts).map((post: PostType) => {
        const activePostLoader =
          selectedPostsIds.includes(post.id) && activePostsLoaders;
        return (
          <Post
            key={post.id}
            post={post}
            setSelectedPostsIds={setSelectedPostsIds}
            activePostLoader={activePostLoader}
          />
        );
      })}
    </div>
  );
}
