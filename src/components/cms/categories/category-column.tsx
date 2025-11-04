"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Star, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DestructiveDropdownMenuButtonItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";
import { toast } from "sonner";
// import { deleteCategory } from "@/lib/actions/categories.action"
import Link from "next/link";
import { CategorySchemaType } from "@/schemas/category.schema";
import { CategoriesSelect } from "@/db/schema/category";
import { deleteCategory } from "@/lib/actions/categories.action";
import CategoryModal from "./category-modal";

export const categoriesColumns: ColumnDef<CategoriesSelect>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Related To",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.type}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return <CategoriesColumnActions category={category} />;
    },
  },
];

function CategoriesColumnActions({ category }: { category: CategoriesSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [isDeleting, startTransition] = useTransition();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteCategory(category.id);
        toast.success("Category deleted");
      } catch (e) {
        if (e instanceof Error) {
          toast.error("Unexpected Error", {
            description: e.message,
          });
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsDeleteOpen(false);
      }
    });
  }

  return (
    <>
      <ResponsiveAlertDialog
        action={handleDelete}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        actionLabel="Yes, delete"
        isLoading={isDeleting}
        loadingText="Deleting..."
      />
      <CategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        defaultValues={category}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <SquarePen />
            Edit
          </DropdownMenuItem>
          <DestructiveDropdownMenuButtonItem
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash className="text-destructive" />
            Delete
          </DestructiveDropdownMenuButtonItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
