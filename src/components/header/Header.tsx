import { PostType } from "../../App";
import "./headerStyle.css";

type HeaderProps = {
  pageStart: number;
  setPageStart: (pageStart: number) => void;
  selectedPostsIds: number[];
  listOfPosts: PostType[];
  handleRefreshPosts: () => void;
};

export default function Header({
  pageStart,
  setPageStart,
  selectedPostsIds,
  listOfPosts,
  handleRefreshPosts,
}: HeaderProps) {
  return (
    <div className="header-main-container">
      <div className="header-sub-container">
        <div className="line-container">
          <h2>My Posts Monitor</h2>
          <div className="chip">
            {selectedPostsIds.length} of {listOfPosts.length} posts selected
          </div>
        </div>
        <div className="line-container">
          <h3>Keep track of posts and their comments.</h3>
          <div className="chip">
            presenting posts number: {pageStart + 1} -{" "}
            {pageStart === 90 ? pageStart + 10 : pageStart + 15}
          </div>
        </div>
      </div>
      <div className="btns-container">
        <button
          className="btn"
          disabled={pageStart <= 0 ?? false}
          onClick={() => setPageStart(pageStart - 15)}
        >
          Get previous 15 posts
        </button>
        <br />
        <button
          className="btn"
          disabled={pageStart >= 90 ?? false}
          onClick={() => setPageStart(pageStart + 15)}
        >
          Get next {pageStart === 75 ? "10" : "15"} posts
        </button>
        <button
          className="btn"
          disabled={selectedPostsIds.length > 0 ? false : true}
          onClick={() => handleRefreshPosts()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
