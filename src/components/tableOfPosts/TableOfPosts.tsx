import { Dispatch, SetStateAction } from "react";
import { PostType } from "../../App";
import Post from "../post/Post";
import "./tableOfPostsStyles.css";

type TableOfPostsType = {
  listOfPosts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
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
      {listOfPosts.map((post: PostType) => {
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
