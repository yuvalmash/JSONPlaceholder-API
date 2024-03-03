import { PostsObj } from "../../types";
import Button from "../button/Button";
import "./headerStyle.css";

type HeaderProps = {
  pageStart: number;
  setPageStart: (pageStart: number) => void;
  selectedPostsIds: number[];
  listOfPosts: PostsObj;
  handleRefreshPosts: () => void;
};

export default function Header({
  pageStart,
  setPageStart,
  selectedPostsIds,
  listOfPosts,
  handleRefreshPosts,
}: HeaderProps) {
  const numberOfSelectedPosts = selectedPostsIds.length;
  const totalNumberOfPosts = Object.values(listOfPosts).length;
  const postsRangeStart = pageStart + 1;
  const postsRangeEnd = pageStart === 90 ? pageStart + 10 : pageStart + 15;
  const canGoToPreviousPage = pageStart > 0;
  const canGoToNextPage = pageStart < 90;
  const canRefreshPosts = selectedPostsIds.length > 0;

  return (
    <div className="header-main-container">
      <div className="header-sub-container">
        <div className="line-container">
          <h2>My Posts Monitor</h2>
          <div className="chip">
            {numberOfSelectedPosts} of {totalNumberOfPosts} posts selected
          </div>
        </div>
        <div className="line-container">
          <h3>Keep track of posts and their comments.</h3>
          <div className="chip">
            presenting posts number: {postsRangeStart} - {postsRangeEnd}
          </div>
        </div>
      </div>
      <div className="btns-container">
        <Button
          disabled={!canGoToPreviousPage}
          onClick={() => setPageStart(pageStart - 15)}
          text={"Get previous 15 posts"}
        />
        <br />
        <Button
          disabled={!canGoToNextPage}
          onClick={() => setPageStart(pageStart + 15)}
          text={`Get next ${pageStart === 75 ? "10" : "15"} posts`}
        />
        <Button
          disabled={!canRefreshPosts}
          onClick={handleRefreshPosts}
          text={"Refresh"}
        />
      </div>
    </div>
  );
}
