import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Book } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import BookCard from "../components/cards/BookCard";
import { ConfirmationModal } from "../components/modals/DeleteConfirmation";
import CreateBookModal from "../components/modals/CreateBookModal";

// Skeleton Loader for Book Card
const BookCardSkeleton = () => (
  <div className="animate-pulse bg-white border border-slate-200 rounded-lg shadow-sm">
    <div className="w-full aspect-16/25 bg-slate-200 rounded-t-lg"></div>
    <div className="p-4">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [books, setBooks] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const { user }: any = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.BOOK.GET_BOOKS);
        setBooks(response.data);
      } catch (error) {
        toast.error("Failed to fetch your eBooks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      await axiosInstance.delete(
        `${API_PATH.BOOK.DELETE_BOOK}/${bookToDelete}`
      );
      setBooks(books.filter((book: any) => book._id !== bookToDelete));
      toast.success("eBook deleted successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to delete eBook.");
    } finally {
      setBookToDelete(null);
    }
  };

  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId: string) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}`);
  };

  console.log("Books ",books)

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg font-bold text-slate-900">All eBooks</h1>
            <p className="text-[13px] text-slate-600 mt-1">
              Create, edit, and manage all your AI-generated eBooks.
            </p>
          </div>
          <Button
            className="whitespace-nowrap"
            isLoading={isLoading}
            Icon={Plus}
            onClick={handleCreateBookClick}
          >
            Create New eBook
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : books?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-xl mt-8">
            <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full mb-4">
              <Book className="w-8 h-8 text-slate-500" />
            </div>

            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No eBooks Found
            </h3>
            <p className="text-slate-600 mb-6 max-w-md">
              You haven't created any eBooks yet. Get started by creating your
              first one.
            </p>
            <Button
              className=""
              isLoading={isLoading}
              onClick={handleCreateBookClick}
              Icon={Plus}
            >
              Create Your First eBook
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books?.map((book: any) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={() => setBookToDelete(book._id)}
              />
            ))}
          </div>
        )}

       
        <ConfirmationModal
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={handleDeleteBook}
          title="Delete eBook"
          message="Are you sure you want to delete this eBook? This action cannot be undone."
        />

        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
