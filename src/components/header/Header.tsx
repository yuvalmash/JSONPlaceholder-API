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
  return (
    <div className="header-main-container">
      <div className="header-sub-container">
        <div className="line-container">
          <h2>My Posts Monitor</h2>
          <div className="chip">
            {selectedPostsIds.length} of {Object.values(listOfPosts).length}{" "}
            posts selected
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
        <Button
          disabled={pageStart <= 0 ?? false}
          onClick={() => setPageStart(pageStart - 15)}
          text={"Get previous 15 posts"}
        />
        <br />
        <Button
          disabled={pageStart >= 90 ?? false}
          onClick={() => setPageStart(pageStart + 15)}
          text={`Get next ${pageStart === 75 ? "10" : "15"} posts`}
        />
        <Button
          disabled={!(selectedPostsIds.length > 0)}
          onClick={() => handleRefreshPosts()}
          text={"Refresh"}
        />
      </div>
    </div>
  );
}
