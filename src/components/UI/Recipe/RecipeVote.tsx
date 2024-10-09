"use client"
import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface VoteComponentProps {
  initialVote?: 1 | -1 | 0; // Initial vote status: 1 for upvote, -1 for downvote, 0 for no vote
  initialTotalVotes?: number; // Total number of votes (upvotes - downvotes)
  onVote: (voteValue: 1 | -1) => void; // Function to handle the vote action
}

export default function VoteComponent({
  initialVote = 0,
  initialTotalVotes = 0,
  onVote,
}: VoteComponentProps) {
  const [vote, setVote] = useState(initialVote); // Manage individual user vote
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes); // Manage total vote count

  // Handle upvote logic
  const handleUpvote = () => {
    if (vote === 1) {
      // If the user is toggling the upvote off, subtract 1 and reset vote to neutral
      setVote(0);
      setTotalVotes(totalVotes - 1);
      onVote(0); // Pass 0 to API to remove vote
    } else {
      // If the user is upvoting or changing from a downvote
      const voteDifference = vote === -1 ? 2 : 1; // +1 for upvote, +2 if switching from downvote
      setVote(1);
      setTotalVotes(totalVotes + voteDifference);
      onVote(1); // Pass 1 to API
    }
  };

  // Handle downvote logic
  const handleDownvote = () => {
    if (vote === -1) {
      // If the user is toggling the downvote off, add 1 and reset vote to neutral
      setVote(0);
      setTotalVotes(totalVotes + 1);
      onVote(0); // Pass 0 to API to remove vote
    } else {
      // If the user is downvoting or changing from an upvote
      const voteDifference = vote === 1 ? -2 : -1; // -1 for downvote, -2 if switching from upvote
      setVote(-1);
      setTotalVotes(totalVotes + voteDifference);
      onVote(-1); // Pass -1 to API
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Display total votes */}
      <div className="text-lg font-bold">
        {totalVotes} Vote{totalVotes !== 1 ? "s" : ""}
      </div>

      {/* Upvote button */}
      <Tooltip content={vote === 1 ? "Remove Upvote" : "Upvote"}>
        <Button
          auto
          color={vote === 1 ? "primary" : "default"}
          onClick={handleUpvote}
          className="hover:text-green-500 transition-colors"
        >
          <FaThumbsUp size={20} />
        </Button>
      </Tooltip>

      {/* Downvote button */}
      <Tooltip content={vote === -1 ? "Remove Downvote" : "Downvote"}>
        <Button
          auto
          color={vote === -1 ? "error" : "default"}
          onClick={handleDownvote}
          className="hover:text-red-500 transition-colors"
        >
          <FaThumbsDown size={20} />
        </Button>
      </Tooltip>
    </div>
  );
}
