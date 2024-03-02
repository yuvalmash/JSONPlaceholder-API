import "./postStyle.css";
import Loader from "../loader/Loader";
import { PostType } from "../../types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type PostProps = {
  post: PostType;
  setSelectedPostsIds: Dispatch<SetStateAction<number[]>>;
  activePostLoader: boolean;
};

export default function Post({
  post,
  setSelectedPostsIds,
  activePostLoader,
}: PostProps) {
  function handlePostChange(
    e: React.ChangeEvent<HTMLInputElement>,
    postId: number
  ) {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedPostsIds((prevSelected: number[]) => [
        ...prevSelected,
        postId,
      ]);
    } else {
      setSelectedPostsIds((prevSelected) =>
        prevSelected.filter((id) => id !== postId)
      );
    }
  }
  return (
    <div className="post">
      {activePostLoader ? (
        <Loader />
      ) : (
        <div className="inner-container">
          <div className="title-and-comments-container">
            <div className="title">{post?.title}</div>
            <div className="comments">{post?.numberOfComments} comments</div>
          </div>
          <div
            className="checkbox-wrapper"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handlePostChange(e, post.id)
            }
          >
            <label className="checkbox">
              <input
                className="checkbox-trigger visuallyhidden"
                type="checkbox"
              />
              <span className="checkbox-symbol">
                <svg
                  aria-hidden="true"
                  className="icon-checkbox"
                  width="28px"
                  height="28px"
                  viewBox="0 0 28 28"
                  version="1"
                >
                  <path d="M4 14l8 7L24 7"></path>
                </svg>
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
