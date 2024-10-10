"use client";

 
import { useAddComment, useDeleteComment, useUpdateComment } from '@/src/hooks/recipe.hook';
import { IRecipe, IUser } from '@/src/types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Comment {
  _id: string;
  user: { email: string; name: string };
  content: string;
}

interface CommentSectionProps {
  recipe: IRecipe; 
  currentUser: IUser;
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipe, currentUser }) => {
    console.log(recipe)
  const [newComment, setNewComment] = useState<string>(''); 
  const [comments, setComments] = useState<Comment[]>(recipe.comments || []); 
  const [updatedContentMap, setUpdatedContentMap] = useState<{ [key: string]: string }>({});
  const [visibleOptions, setVisibleOptions] = useState<string | null>(null); // Manage which comment's options are visible

  const { mutate: addComment } = useAddComment(); 
  const { mutate: deleteComment } = useDeleteComment(); 
  const { mutate: updateComment } = useUpdateComment(); 

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    addComment({ recipeId: recipe._id, comment: newComment }, {
      onSuccess: (response) => {
        setComments((prev) => [
          ...prev, 
          { _id: response?.commentId, user: { email: currentUser?.email, name: currentUser?.name }, content: newComment }
        ]);
        setNewComment('');
      },
      onError: () => {
        toast.error("Failed to add comment.");
      }
    });
  };

  const handleDeleteComment = (commentId: string) => {
    const recipeId = recipe?._id;
    deleteComment({ recipeId, commentId }, {
      onSuccess: () => {
        setComments((prev) => prev.filter((comment) => comment._id !== commentId));
        toast.success("Comment deleted successfully.");
        setVisibleOptions(null); // Close options after delete
      },
      onError: () => {
        toast.error("Failed to delete comment.");
      }
    });
  };

  const handleUpdateCommentSubmit = (commentId: string) => {
    const recipeId = recipe?._id;
    const updatedContent = updatedContentMap[commentId];

    if (!updatedContent || !updatedContent.trim()) {
      toast.error("Updated comment cannot be empty.");
      return;
    }

    updateComment({ recipeId, commentId, newComment: updatedContent }, {
      onSuccess: () => {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId ? { ...comment, content: updatedContent } : comment
          )
        );
        setUpdatedContentMap((prev) => ({ ...prev, [commentId]: '' }));
        toast.success("Comment updated successfully.");
        setVisibleOptions(null); // Close options after update
      },
      onError: () => {
        toast.error("Failed to update comment.");
      }
    });
  };

  const toggleOptions = (commentId: string) => {
    // Toggle visibility of options for a specific comment
    setVisibleOptions((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div className="mt-8 p-4 border-t border-gray-200 mx-auto max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">Comments</h2>
      {/* Comment Input for New Comments */}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full border rounded-md p-2 mb-4"
        placeholder="Write your comment..."
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Submit Comment
      </button>

      {/* Display Comments */}
      <div className="mt-6">
        {comments.map((comment) => (
          <div key={comment._id} className="mb-4 border-b border-gray-200 pb-2 relative">
            <p className="font-semibold">{comment?.user?.name}</p>
            <p>{comment.content}</p>

            {/* Show Edit/Delete options only for the current user's own comments */}
            {comment?.user?.email === currentUser?.email && (
              <div className="absolute right-0 top-0">
                <button
                  onClick={() => toggleOptions(comment._id)} // Toggle options on click
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  ••• {/* Three dots */}
                </button>
                {visibleOptions === comment._id && (
                  <div className="absolute bg-white shadow-lg border rounded-md mt-1 z-10 p-4 -top-32 w-72">
                    <textarea
                      value={updatedContentMap[comment._id] || ''}
                      onChange={(e) => setUpdatedContentMap((prev) => ({ ...prev, [comment._id]: e.target.value })) }
                      className="w-full border rounded-md p-2 mb-2"
                      placeholder="Edit your comment..."
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleUpdateCommentSubmit(comment?._id)}
                        className="bg-green-500 text-white py-1 px-3 rounded-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment?._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setVisibleOptions(null)} // Close options
                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
