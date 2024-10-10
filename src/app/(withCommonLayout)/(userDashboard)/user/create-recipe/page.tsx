"use client";
import RcInput from "@/src/components/form/RcInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useCreateRecipe } from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";
import { Plus, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const RecipeForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const methods = useForm();
  const { control, handleSubmit, reset } = methods;
  const {
    mutate: handleCreateRecipe,
    error: apiError,
    isError,
    isPending: createRecipePending,
    isSuccess,
  } = useCreateRecipe();

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
    const formData = new FormData();
    const recipeData = {
      ...data,
      author: user?.id,
      cookingTime: Number(data.cookingTime), // Ensure cooking time is a number
      ingredients: data.ingredients.map((ingre: { name: string }) => ({
        name: ingre.name,
      })),
      tags: data.tags.map((tag: { value: string }) => tag.value),
    };

    formData.append("data", JSON.stringify(recipeData));
    imageFiles.forEach((image) => formData.append("file", image));

    handleCreateRecipe(formData);
  }, [handleCreateRecipe, imageFiles, user?.id]);

  const handleFieldAppend = useCallback(() => {
    appendIngredient({ name: "" });
  }, [appendIngredient]);

  const handleTagAppend = useCallback(() => {
    appendTag({ value: "" });
  }, [appendTag]);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles: File[] = [];
      const validPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/") && file.size < 5000000) {
          // Limit to 5MB
          validFiles.push(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              validPreviews.push(reader.result as string);
              setImagePreviews((prev) => [...prev, ...validPreviews]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
      setImageFiles((prev) => [...prev, ...validFiles]);
    }
  }, []);

  if (!createRecipePending && isSuccess) {
    reset(); // Reset form fields
    setImageFiles([]); // Clear image files
    setImagePreviews([]); // Clear image previews
    router.push("/user/profile/my-recipes");
  }

  return (
    <>
      {createRecipePending && !isSuccess && <Loading />}
      {isError && <p>{apiError.message}</p>}

      <div className="flex flex-col items-center p-5 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-lg shadow-lg p-8 sm:p-10 lg:p-12">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-white text-center">
            Create a New Recipe
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title */}
              <div className="mb-6">
                <RcInput name="title" label="Recipe Title" required />
              </div>

              {/* Description */}
              <div className="mb-6">
                <RcInput
                  name="description"
                  label="Recipe Description"
                  type="textarea"
                  required
                />
              </div>

              {/* Cooking Time */}
              <div className="mb-6">
                <RcInput
                  name="cookingTime"
                  label="Cooking Time (Minutes)"
                  type="number"
                  required
                />
              </div>

              {/* Is Premium */}
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600 dark:text-indigo-400"
                  {...methods.register("isPremium")}
                />
                <label className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Premium Recipe
                </label>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label
                  className="flex h-16 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition duration-150"
                  htmlFor="image"
                >
                  Upload Image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>

              {/* Image Previews */}
              <div className="flex gap-4 mb-6 flex-wrap">
                {imagePreviews.map((url, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 p-2"
                  >
                    <img
                      className="object-cover w-full h-full"
                      src={url}
                      alt={`preview-${index}`}
                    />
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                    List the Ingredients
                  </h1>
                  <Button
                    isIconOnly
                    onClick={handleFieldAppend}
                    className="bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus className="text-white" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {ingredientFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <RcInput
                        label="Ingredient"
                        name={`ingredients.${index}.name`}
                        required
                      />
                      <Button
                        isIconOnly
                        className="h-12 w-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md dark:bg-red-600 dark:hover:bg-red-700"
                        onClick={() => removeIngredient(index)}
                      >
                        <TrashIcon className="text-white" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                    Add Tags
                  </h1>
                  <Button
                    isIconOnly
                    onClick={handleTagAppend}
                    className="bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus className="text-white" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <RcInput
                        label="Tag"
                        name={`tags.${index}.value`}
                        required
                      />
                      <Button
                        isIconOnly
                        className="h-12 w-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md dark:bg-red-600 dark:hover:bg-red-700"
                        onClick={() => removeTag(index)}
                      >
                        <TrashIcon className="text-white" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                isDisabled={createRecipePending}
                className="w-full bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg"
              >
                {createRecipePending ? "Creating..." : "Create Recipe"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;
