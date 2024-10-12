"use client";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import {
  useGetRecipesByUserId,
  useGetSingleRecipe,
  useUpdateRecipe,
} from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";
import { Plus, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const RecipeForm = ({ params }: { params: { recipeId: string } }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const router = useRouter();
  const methods = useForm();
  const { reset, control, handleSubmit } = methods;
  const {
    mutate: handleUpdateRecipe,
    error: apiError,
    isError,
    isPending: createRecipePending,
    isSuccess,
  } = useUpdateRecipe();
  const {
    data: getSingleRecipe,
    isPending: singleRecipePending,
    isSuccess: isSuccessRecipe,
  } = useGetSingleRecipe(params?.recipeId);
   

  // This effect will run when the recipe data is fetched
  useEffect(() => {
    if (isSuccessRecipe && getSingleRecipe) {
      // Set default values from the fetched recipe data
      reset({
        title: getSingleRecipe.title || "",
        description: getSingleRecipe.description || "",
        cookingTime: getSingleRecipe.cookingTime || 0,
        isPremium: getSingleRecipe.isPremium || false,
        isPublished: getSingleRecipe.isPublished || false,
        ingredients:
          getSingleRecipe?.ingredients?.map(
            (ingredient: { value: string }) => ({ value: ingredient?.value })
          ) || [],
      });
      setImagePreviews(getSingleRecipe.imageUrls || []); // Assuming `imageUrls` is part of the recipe data
    }
  }, [getSingleRecipe, isSuccessRecipe, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const recipeData = {
      ...data,
      cookingTime: Number(data?.cookingTime),
      ingredients: data?.ingredients?.map(
        (ingre: { value: string }) => ingre.value
      ),
    };

    formData.append("data", JSON.stringify(recipeData));

    for (let image of imageFiles) {
      formData.append("file", image);
    }

    handleUpdateRecipe({ recipeId: params.recipeId, recipeData: formData });
  };

  const handleFieldAppend = () => {
    append({ name: "ingredients" });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles((prev) => [...prev, files]);

    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(files);
    }
  };

  if (!createRecipePending && isSuccess) {
    router.push("/user/profile/my-recipes");
  }

  return (
    <>
      {createRecipePending && !isSuccess && <Loading />}
      {isError && <p>{apiError.message}</p>}

      <div className="flex flex-col items-center p-5 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-lg shadow-lg p-8 sm:p-10 lg:p-12">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-white text-center">
            Update Recipe
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title */}
              <div className="mb-6">
                <FXInput name="title" label="Recipe Title" type="text" />
              </div>

              {/* Description */}
              <div className="mb-6">
                <FXInput
                  name="description"
                  label="Recipe Description"
                  type="textarea"
                />
              </div>

              {/* Image URL */}
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
                  onChange={(e) => handleImageChange(e)}
                />
              </div>

              {/* Image Previews */}
              <div className="flex gap-4 mb-6 flex-wrap">
                {imagePreviews?.length > 0 &&
                  imagePreviews.map((url) => (
                    <div
                      key={url}
                      className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 p-2"
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={url}
                        alt="preview"
                      />
                    </div>
                  ))}
              </div>

              {/* ingredients */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                    List the ingredients
                  </h1>
                  <Button
                    isIconOnly
                    onClick={() => handleFieldAppend()}
                    className="bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus className="text-white" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <FXInput
                        label="Ingredient"
                        name={`ingredients.${index}.value`}
                      />
                      <Button
                        isIconOnly
                        className="h-12 w-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md dark:bg-red-600 dark:hover:bg-red-700"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="text-white" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Time */}
              <div className="mb-6">
                <FXInput
                  name="cookingTime"
                  label="Cooking Time (Minutes)"
                  type="number"
                />
              </div>

              {/* Is Premium */}
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600 dark:text-indigo-400"
                  name="isPremium"
                />
                <label className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Premium Recipe
                </label>
              </div>

              {/* Is Published */}
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600 dark:text-indigo-400"
                  name="isPublished"
                />
                <label className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Publish Recipe
                </label>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 dark:bg-blue-700 dark:hover:bg-blue-800"
                size="lg"
                type="submit"
              >
                Update Recipe
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;
