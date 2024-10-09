// components/RecipeRating.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@nextui-org/react'; // Using NextUI for additional UI elements
import Loading from '../Loading';
 
import { toast } from 'react-toastify'; // Ensure to import toast for notifications
import { useRating } from '@/src/hooks/recipe.hook';
 
interface RatingType {
  user: string;
  rating: number;
}

interface Recipe {
  _id: string;
  title: string;
  ratings: RatingType[];
}

interface RecipeRatingProps {
  recipe: Recipe; // Pass the whole recipe object
}

const RecipeRating: React.FC<RecipeRatingProps> = ({ recipe }) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0); // Total votes state
  const { mutate: submitRating,  } = useRating(); // Use the custom hook

  // Calculate the average rating when the component mounts or when the recipe prop changes
  useEffect(() => {
    if (recipe && recipe.ratings.length > 0) {
      const totalRatings = recipe.ratings.length;
      const sumOfRatings = recipe.ratings.reduce(
        (sum: number, rating: RatingType) => sum + rating.rating,
        0
      );
      const avgRating = sumOfRatings / totalRatings;
      setAverageRating(avgRating);
      setTotalVotes(totalRatings); // Set total votes based on the number of ratings
    } else {
      setAverageRating(0); // No ratings available
      setTotalVotes(0); // Reset total votes if no ratings
    }
  }, [recipe]);

  // Handle rating submission using the new voting structure
  const handleVote = (voteValue: number) => {
    if (voteValue < 1 || voteValue > 5) {
      console.error("Invalid vote value. It should be between 1 and 5.");
      return;
    }

    submitRating(
      { recipeId: recipe._id, rating: voteValue },
      {
        onSuccess: () => {
          // Update the local average rating and total votes after successful mutation
          setTotalVotes((prevVotes) => prevVotes + 1); // Increment total votes
          // Update average rating if necessary (recalculate here)
          const newAverageRating = (averageRating * totalVotes + voteValue) / (totalVotes + 1);
          setAverageRating(newAverageRating); // Set the new average rating
          setUserRating(0); // Reset user rating after submission
          toast.success("Rating submitted successfully!");
        },
        onError: (error) => {
          console.error("Error submitting vote:", error);
          toast.error(error.message || "Failed to submit Rating");
        },
      }
    );
  };

  return (
    <div className="recipe-rating-container">
      {/* Recipe Title */}
      <h2 className="recipe-title">{recipe.title}</h2>

      {/* Average Rating Display */}
      <div className="average-rating-section">
        <Rating value={averageRating} readOnly style={{ maxWidth: 100 }} />
        <p className="average-rating-text">Average Rating: {averageRating.toFixed(1)} / 5</p>
        <p className="total-votes-text">Total: {totalVotes}</p> {/* Display total votes */}
      </div>

      {/* Submit Your Rating */}
      <div className="submit-rating-section">
        <h3>Submit Your Rating</h3>
        <Rating
          value={userRating}
          onChange={(newValue: number) => setUserRating(newValue)}
          style={{ maxWidth: 100 }}
        />
        <Button
          color="primary"
          
          className="submit-button"
          disabled={userRating === 0 } // Disable button until a rating is selected or during loading
          onClick={() => handleVote(userRating)} // Call handleVote with userRating
        >
          { 'Submit Rating'}
        </Button>
      </div>

      {/* Optional: Display user's selected rating */}
      <div className="user-rating-display">
        {userRating > 0 && <p>Your Rating: {userRating} / 5</p>}
      </div>

      {/* Styles */}
      <style jsx>{`
        .recipe-rating-container {
          border: 1px solid #eaeaea;
          border-radius: 8px;
          padding: 20px;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .recipe-title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }

        .average-rating-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .average-rating-text {
          font-size: 18px;
          color: #555;
        }

        .total-votes-text {
          font-size: 16px;
          color: #555;
        }

        .submit-rating-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .submit-rating-section h3 {
          margin-bottom: 10px;
          font-size: 20px;
          color: #333;
        }

        .submit-button {
          width: 150px;
        }

        .user-rating-display {
          text-align: center;
          font-size: 16px;
          color: #0070f3;
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          .recipe-rating-container {
            padding: 15px;
          }

          .recipe-title {
            font-size: 20px;
          }

          .average-rating-text,
          .user-rating-display,
          .total-votes-text {
            font-size: 16px;
          }

          .submit-button {
            width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeRating;
