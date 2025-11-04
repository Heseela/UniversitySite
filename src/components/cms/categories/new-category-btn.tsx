"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import CategoryModal from "./category-modal";

const NewCategoryBtn = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="default">
        <Plus /> New Category
      </Button>
      <CategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default NewCategoryBtn;
