"use client";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoriesSelect, CategoryType } from "@/db/schema/category";
import {
  createCategory,
  updateCategory,
} from "@/lib/actions/categories.action";
import { showServerError } from "@/lib/utils";

type CategoryFormType = {
  name: string;
  type: CategoryType;
};

const formDefaultValues = {
  name: "",
  type: CategoryType.BLOG,
};

const CategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  defaultValues,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  defaultValues?: CategoriesSelect;
}) => {
  const isEditing = !!defaultValues;

  const [values, setValues] = useState<CategoryFormType>(
    defaultValues || formDefaultValues
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    const { name, type } = values;

    if (!name.trim() || !type) return;

    startTransition(async () => {
      try {
        isEditing   
          ? await updateCategory(defaultValues.id, values)
          : await createCategory(values);
        toast.success("Category created successfully");
        setIsModalOpen(false);
        setValues(formDefaultValues);
      } catch (err) {
        showServerError(err);
      }
    });
  };

  return (
    <Modal
      title={isEditing ? "Update Category" : "Create Category"}
      description={
        !isEditing ? "Add a new category to organize your content." : ""
      }
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText="Save"
      submitVariant="default"
      isLoading={isPending}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <Input
            className="w-full p-2 border rounded !bg-white !text-black"
            placeholder="Category Name.."
            value={values.name}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <Select
          value={values.type}
          onValueChange={(value) =>
            setValues((prev) => ({ ...prev, type: value as CategoryType }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CategoryType).map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Modal>
  );
};

export default CategoryModal;
