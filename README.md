# JSONPlaceholder Web App 🌐

This repository contains a simple React web application that interacts with the JSONPlaceholder API to display posts and their comments.

## Features ✨

- **Post Listing**: Displays a list of posts fetched from JSONPlaceholder API.
- **Pagination**: Allows users to navigate through different pages of posts.
- **Post Selection**: Enables users to select posts for further actions.
- **Comment Count**: Shows the number of comments on each post.
- **Refresh Functionality**: Allows users to refresh selected posts and update the comment count.

## Technologies Used 🛠️

- React
- TypeScript
- CSS

## Getting Started 🚀

To get a local copy of the project up and running, follow these steps:

1. **Clone the Repository**: git clone https://github.com/yuvalmash/JSONPlaceholder-API.git
2. **Navigate to the Project Directory**
3. **Install Dependencies**: npm i
4. **Run the Development Server**: npm start

The application should run on [http://localhost:3000](http://localhost:3000).

## File Structure 📂

- **`src/components`**: Contains React components used in the application.
- `header`: Header component for the application.
- `tableOfPosts`: Component responsible for rendering the list of posts.
- `post`: Component representing individual posts.
- `loader`: Loader component for indicating loading states.
- `errorPage`: Component for displaying error messages.
- **`src/App.tsx`**: Main application component containing the logic for fetching posts and managing state.
- **`src/appStyle.css`**: CSS file for styling the main application layout.
- **`src/index.tsx`**: Entry point of the application.
- **`public/index.html`**: HTML template for the application.

## Contributing 🤝

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Assumptions made during the mission 🤔

- The site's design requirements were very basic, so I saw no need for external libraries like MUI or Styled-components.
- The app's functionality can always be further improved, but I thought it best to keep it simple.
- It was necessary to stick to the given design, but it is okay to change a little according to personal preference.

## Functionality added 🏗️

- Initial loader (when posts are first loading).
- Posts loader (when selected posts are refreshing).
- Next and previous posts buttons.
- Deploy to Netlify

## Style added 💫

- loader style
- buttons styles (display, count etc)

## Things that can still be improved 🛠

- Added a cache function that saves the posts and does not ask for them every time again if it is not necessary (useMemo).
- Maybe implement a real infinity scroller.
- More requests and thoughts are welcome :)

## Credits 🙏

This project was created by Yuval Mashraki. It utilizes the JSONPlaceholder API for fetching data.
