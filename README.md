# Recipe Circle Frontend - Project Overview

The **Recipe Sharing Community** is a full-stack web application designed to bring together cooking enthusiasts. The platform allows users to share, discover, and organize recipes, targeting home cooks, culinary students, and anyone passionate about cooking.

The platform offers an environment for users to:

- Post their favorite recipes
- Contribute interactive ingredient checklists
- Share cooking time estimates

The community encourages the exchange of culinary knowledge and fosters social engagement, with various interactive and social features.

## Key Features

### **User Registration**

- Users can register on the platform to create a personal account.

### **Recipe Submission**

- Users can submit their favorite recipes with detailed ingredient lists.

### **Cooking Timer**

- A built-in cooking timer allows users to track cooking time for each recipe.

### **Social Features**

- **Commenting**: Users can comment on recipes.
- **Rating**: Users can rate recipes they try.
- **Following**: Users can follow other users.
- **Upvoting/Downvoting**: Users can upvote or downvote recipes.

### **Premium Features**

- Exclusive content is available through a subscription-based model.
- Users with a premium subscription can access premium-only recipes.

The **Recipe Circle Frontend** serves as a collaborative platform for culinary exploration and social connection in the cooking world.

# Recipe Sharing Community - API Endpoints

## Authentication & User Management

### **Authentication**

- **POST** `/auth/login`: Login with email and password to receive a JWT token.
- **POST** `/auth/refresh-token`: Refresh the JWT token.
- **POST** `/auth/change-password`: Change the user's password.
- **POST** `/auth/forgot-password`: Send a password reset link to the user's email.
- **POST** `/auth/reset-password`: Reset the user's password using a token.

### **User Creation**

- **POST** `/register/create-user`: Register a new user.

## User Profile Management

- **GET** `/user`: Get the current user's profile.
- **PATCH** `/user`: Update the current user's profile.
- **GET** `/user/:userId`: Get another user's profile.
- **GET** `/user/followers`: Get the current user's followers.
- **GET** `/user/following`: Get the current user's following.
- **PUT** `/user/:userId/follow`: Follow a user.
- **PUT** `/user/:userId/unfollow`: Unfollow a user.

### **Admin Profile**

- **GET** `/admins`: Get the admin's profile.
- **PATCH** `/admins`: Update the admin's profile.

## Admin Controls

### **Manage Users**

- **GET** `/admin/users`: Get all users (only accessible to admins).
- **PUT** `/admin/users/:id/block`: Block a user (only accessible to admins).
- **DELETE** `/admin/users/:id`: Delete a user (only accessible to admins).

### **Manage Recipes**

- **PUT** `/admin/recipes/:recipeId/publish`: Publish a recipe (only accessible to admins).
- **DELETE** `/admin/recipes/:recipeId`: Delete a recipe (only accessible to admins).

## Recipe Management

### **Recipe CRUD**

- **POST** `/recipes`: Create a new recipe. (Requires JWT authentication).
- **GET** `/recipes`: Fetch all recipes with optional filters (search, tags, etc.).
  - **Query Params**: `?search=spaghetti&tag=Italian`
- **GET** `/recipes/:recipeId`: Fetch a specific recipe by recipeId.
- **PUT** `/recipes/:recipeId`: Update an existing recipe. (Requires JWT authentication - must be the author or an admin).
- **DELETE** `/recipes/:recipeId`: Delete a recipe by recipeId. (Requires JWT authentication - must be the author or an admin).

## Social Features

### **Recipe Ratings**

- **POST** `/recipes/:recipeId/ratting`: Rate a recipe.
- **GET** `/recipes/:recipeId/ratings`: Fetch all ratings for a recipe.
- **GET** `/recipes/:recipeId/rating/average`: Fetch the average rating for a recipe.

### **Comments on Recipes**

- **POST** `/recipes/:recipeId/comments`: Post a comment on a recipe. (Requires JWT authentication).
- **GET** `/recipes/:recipeId/comments`: Fetch all comments for a recipe.
- **PUT** `/recipes/:recipeId/comments/:commentId`: Edit a comment. (Requires JWT authentication - must be the author).
- **DELETE** `/recipes/:recipeId/comments/:commentId`: Delete a comment. (Requires JWT authentication - must be the author).

### **Upvote/Downvote System**

- **PUT** `/recipes/:recipeId/vote`: Upvote a recipe. (Requires JWT authentication) : Downvote a recipe. (Requires JWT authentication).

## Recipe Feed

### ** Recipe Feed**

- **GET** `/`: Fetch a feed of public recipes. Includes infinite scroll and optional filters (tags, ratings, etc.).
  - **Query Params**: `?tag=vegan&sort=rating`

### **Premium Subscription**

- **POST** `/premium/subscribe`: Subscribe to premium membership using payment (AAMARPAY/Stripe). Requires JWT authentication.
  - **Request Body**: `{ "paymentMethod": "amarpay", "plan": "monthly" }`
- **GET** `/premium/status`: Check the current user's premium membership status.
